
"use client"

import { useState, useEffect } from "react"
import { db } from "../../lib/firebase"
import { collection, query, orderBy, onSnapshot, DocumentData } from "firebase/firestore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Download, Database, Mail, FileUser, Package, Loader2, ShieldCheck } from "lucide-react"
import { saveAs } from "file-saver"
import { motion } from "framer-motion"

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<DocumentData[]>([])
  const [orders, setOrders] = useState<DocumentData[]>([])
  const [resumes, setResumes] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const qContacts = query(collection(db, "contacts"), orderBy("submittedAt", "desc"))
    const qOrders = query(collection(db, "orders"), orderBy("submittedAt", "desc"))
    const qResumes = query(collection(db, "resumes"), orderBy("submittedAt", "desc"))

    const unsubContacts = onSnapshot(qContacts, (snapshot) => {
      setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    const unsubOrders = onSnapshot(qOrders, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    const unsubResumes = onSnapshot(qResumes, (snapshot) => {
      setResumes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setLoading(false)
    })

    return () => {
      unsubContacts()
      unsubOrders()
      unsubResumes()
    }
  }, [])

  const convertToCSV = (data: any[], headers: string[]) => {
    const csvRows = []
    csvRows.push(headers.join(","))

    for (const row of data) {
      const values = headers.map(header => {
        const key = header.toLowerCase().replace(/\s/g, "")
        let val = row[key] || ""
        if (val instanceof Date || (val?.seconds)) {
            val = new Date(val.seconds * 1000).toLocaleString()
        }
        // Handle field mapping for more complex names
        if (header === "Submitted At") val = row.submittedAt?.seconds ? new Date(row.submittedAt.seconds * 1000).toLocaleString() : ""
        if (header === "Service Type") val = row.serviceType || ""
        if (header === "Business Name") val = row.businessName || ""
        if (header === "GST Number") val = row.gstNumber || ""
        if (header === "Resume URL") val = row.resumeUrl || ""
        
        const escaped = ('' + val).replace(/"/g, '""')
        return `"${escaped}"`
      })
      csvRows.push(values.join(","))
    }
    return csvRows.join("\n")
  }

  const handleExport = (type: 'contacts' | 'orders' | 'resumes') => {
    let data: any[] = []
    let headers: string[] = []
    let filename = ""

    if (type === 'contacts') {
      data = contacts
      headers = ["Name", "Email", "Subject", "Message", "Submitted At"]
      filename = "Contact_Submissions.csv"
    } else if (type === 'orders') {
      data = orders
      headers = ["Name", "Email", "Mobile", "Business Name", "GST Number", "Service Type", "Plan", "Address", "Pincode", "Submitted At"]
      filename = "Service_Orders.csv"
    } else {
      data = resumes
      headers = ["Name", "Email", "Mobile", "Position", "Resume URL", "Submitted At"]
      filename = "Job_Applications.csv"
    }

    const csvData = convertToCSV(data, headers)
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, filename)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-32 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              <ShieldCheck className="h-10 w-10 text-primary" /> Submissions Database
            </h1>
            <p className="text-muted-foreground mt-2">Manage and export all form data for M A Global Network.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => window.print()} variant="outline" className="rounded-full">Print Reports</Button>
          </div>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-secondary rounded-2xl mb-8">
            <TabsTrigger value="orders" className="py-3 rounded-xl gap-2"><Package className="h-4 w-4" /> Service Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="contacts" className="py-3 rounded-xl gap-2"><Mail className="h-4 w-4" /> Contact Requests ({contacts.length})</TabsTrigger>
            <TabsTrigger value="resumes" className="py-3 rounded-xl gap-2"><FileUser className="h-4 w-4" /> Job Applications ({resumes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card className="rounded-3xl border-none shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Service Orders</CardTitle>
                  <CardDescription>Comprehensive list of infrastructure requests.</CardDescription>
                </div>
                <Button onClick={() => handleExport('orders')} className="rounded-full gap-2">
                  <Download className="h-4 w-4" /> Export Excel
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Plan/Users</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-bold">{order.name}<br/><span className="text-xs font-normal text-muted-foreground">{order.email}</span></TableCell>
                        <TableCell className="uppercase font-semibold text-primary">{order.serviceType}</TableCell>
                        <TableCell>{order.vpsPlan || order.plan || "Custom"}</TableCell>
                        <TableCell>{order.mobile}</TableCell>
                        <TableCell className="text-xs">{order.submittedAt?.seconds ? new Date(order.submittedAt.seconds * 1000).toLocaleDateString() : "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="rounded-3xl border-none shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Contact Submissions</CardTitle>
                  <CardDescription>General inquiries and sales leads.</CardDescription>
                </div>
                <Button onClick={() => handleExport('contacts')} className="rounded-full gap-2">
                  <Download className="h-4 w-4" /> Export Excel
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Message Preview</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-bold">{contact.name}<br/><span className="text-xs font-normal text-muted-foreground">{contact.email}</span></TableCell>
                        <TableCell className="font-semibold">{contact.subject}</TableCell>
                        <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                        <TableCell className="text-xs">{contact.submittedAt?.seconds ? new Date(contact.submittedAt.seconds * 1000).toLocaleDateString() : "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resumes">
            <Card className="rounded-3xl border-none shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Job Applications</CardTitle>
                  <CardDescription>Candidate resumes and position targets.</CardDescription>
                </div>
                <Button onClick={() => handleExport('resumes')} className="rounded-full gap-2">
                  <Download className="h-4 w-4" /> Export Excel
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Resume</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resumes.map((resume) => (
                      <TableRow key={resume.id}>
                        <TableCell className="font-bold">{resume.name}<br/><span className="text-xs font-normal text-muted-foreground">{resume.email}</span></TableCell>
                        <TableCell className="font-semibold text-primary">{resume.position}</TableCell>
                        <TableCell>
                          <a href={resume.resumeUrl} target="_blank" className="text-blue-500 hover:underline flex items-center gap-1">
                            <Download className="h-3 w-3" /> View PDF
                          </a>
                        </TableCell>
                        <TableCell>{resume.mobile}</TableCell>
                        <TableCell className="text-xs">{resume.submittedAt?.seconds ? new Date(resume.submittedAt.seconds * 1000).toLocaleDateString() : "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
