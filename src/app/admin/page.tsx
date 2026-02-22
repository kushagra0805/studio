
"use client"

import { useState, useEffect } from "react"
import { db } from "../../lib/firebase"
import { collection, query, orderBy, onSnapshot, DocumentData } from "firebase/firestore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Download, Mail, FileUser, Package, Loader2, ShieldCheck, ExternalLink } from "lucide-react"
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

  const convertToCSV = (data: any[], headers: Record<string, string>) => {
    const headerKeys = Object.keys(headers)
    const headerLabels = Object.values(headers)
    
    const csvRows = []
    csvRows.push(headerLabels.join(","))

    for (const row of data) {
      const values = headerKeys.map(key => {
        let val = row[key]
        
        // Handle nested fields or special formatting
        if (key === 'submittedAt' && val?.seconds) {
          val = new Date(val.seconds * 1000).toLocaleString()
        }
        
        const escaped = ('' + (val || "")).replace(/"/g, '""')
        return `"${escaped}"`
      })
      csvRows.push(values.join(","))
    }
    return csvRows.join("\n")
  }

  const handleExport = (type: 'contacts' | 'orders' | 'resumes') => {
    let csvContent = ""
    let filename = ""

    if (type === 'contacts') {
      csvContent = convertToCSV(contacts, {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        submittedAt: "Submitted At"
      })
      filename = "M_A_Global_Contacts.csv"
    } else if (type === 'orders') {
      csvContent = convertToCSV(orders, {
        name: "Customer Name",
        email: "Email",
        mobile: "Mobile",
        serviceType: "Service Type",
        vpsPlan: "VPS Plan",
        userCount: "Cloud-x User Count",
        address: "Address",
        pincode: "Pincode",
        gstNumber: "GST Number",
        gstCertificate: "GST Certificate URL",
        submittedAt: "Order Date"
      })
      filename = "M_A_Global_Orders.csv"
    } else {
      csvContent = convertToCSV(resumes, {
        name: "Applicant Name",
        email: "Email",
        mobile: "Mobile",
        position: "Target Position",
        resumeUrl: "Resume Link",
        submittedAt: "Applied Date"
      })
      filename = "M_A_Global_Resumes.csv"
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, filename)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
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
              <ShieldCheck className="h-10 w-10 text-primary" /> Multi-Source Database
            </h1>
            <p className="text-slate-500 font-medium mt-2">Manage isolated data streams for M A Global Network.</p>
          </div>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-secondary/50 rounded-2xl mb-12">
            <TabsTrigger value="orders" className="py-4 rounded-xl gap-2 text-lg font-bold"><Package className="h-5 w-5" /> Service Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="contacts" className="py-4 rounded-xl gap-2 text-lg font-bold"><Mail className="h-5 w-5" /> Contact Leads ({contacts.length})</TabsTrigger>
            <TabsTrigger value="resumes" className="py-4 rounded-xl gap-2 text-lg font-bold"><FileUser className="h-5 w-5" /> Applicants ({resumes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
              <CardHeader className="bg-slate-50 dark:bg-slate-900 p-8 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-black">Infrastructure Orders</CardTitle>
                  <CardDescription>Direct sales data and service configurations.</CardDescription>
                </div>
                <Button onClick={() => handleExport('orders')} className="rounded-full gap-2 h-12 px-6 font-bold shadow-xl shadow-primary/20">
                  <Download className="h-4 w-4" /> Export Orders Excel
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-100 dark:bg-slate-800">
                    <TableRow>
                      <TableHead className="font-bold p-6">Customer</TableHead>
                      <TableHead className="font-bold">Service</TableHead>
                      <TableHead className="font-bold">Plan/Users</TableHead>
                      <TableHead className="font-bold">GST Status</TableHead>
                      <TableHead className="font-bold">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-slate-50/50">
                        <TableCell className="p-6">
                          <div className="font-bold text-lg">{order.name}</div>
                          <div className="text-sm text-slate-500">{order.email} | {order.mobile}</div>
                        </TableCell>
                        <TableCell><span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-black text-xs uppercase">{order.serviceType}</span></TableCell>
                        <TableCell className="font-medium">{order.vpsPlan || (order.userCount ? `${order.userCount} Users` : "Standard")}</TableCell>
                        <TableCell>{order.gstNumber ? <span className="text-green-600 font-bold text-xs">GST PROVIDED</span> : <span className="text-slate-400 text-xs">N/A</span>}</TableCell>
                        <TableCell className="text-slate-500 font-mono text-xs">{order.submittedAt?.seconds ? new Date(order.submittedAt.seconds * 1000).toLocaleDateString() : "Pending"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
              <CardHeader className="bg-slate-50 dark:bg-slate-900 p-8 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-black">Inquiry Submissions</CardTitle>
                  <CardDescription>General support and consulting requests.</CardDescription>
                </div>
                <Button onClick={() => handleExport('contacts')} className="rounded-full gap-2 h-12 px-6 font-bold shadow-xl shadow-primary/20">
                  <Download className="h-4 w-4" /> Export Contacts Excel
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-100 dark:bg-slate-800">
                    <TableRow>
                      <TableHead className="font-bold p-6">Name</TableHead>
                      <TableHead className="font-bold">Subject</TableHead>
                      <TableHead className="font-bold">Message Snippet</TableHead>
                      <TableHead className="font-bold">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id} className="hover:bg-slate-50/50">
                        <TableCell className="p-6">
                          <div className="font-bold text-lg">{contact.name}</div>
                          <div className="text-sm text-slate-500">{contact.email}</div>
                        </TableCell>
                        <TableCell className="font-bold text-primary">{contact.subject}</TableCell>
                        <TableCell className="max-w-xs truncate text-slate-600 italic">"{contact.message}"</TableCell>
                        <TableCell className="text-slate-500 font-mono text-xs">{contact.submittedAt?.seconds ? new Date(contact.submittedAt.seconds * 1000).toLocaleDateString() : "Pending"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resumes">
            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
              <CardHeader className="bg-slate-50 dark:bg-slate-900 p-8 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-black">Candidate Resumes</CardTitle>
                  <CardDescription>Job applications and talent acquisition data.</CardDescription>
                </div>
                <Button onClick={() => handleExport('resumes')} className="rounded-full gap-2 h-12 px-6 font-bold shadow-xl shadow-primary/20">
                  <Download className="h-4 w-4" /> Export Resumes Excel
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-100 dark:bg-slate-800">
                    <TableRow>
                      <TableHead className="font-bold p-6">Applicant</TableHead>
                      <TableHead className="font-bold">Position</TableHead>
                      <TableHead className="font-bold">Resume File</TableHead>
                      <TableHead className="font-bold">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resumes.map((resume) => (
                      <TableRow key={resume.id} className="hover:bg-slate-50/50">
                        <TableCell className="p-6">
                          <div className="font-bold text-lg">{resume.name}</div>
                          <div className="text-sm text-slate-500">{resume.email} | {resume.mobile}</div>
                        </TableCell>
                        <TableCell className="font-black uppercase text-xs tracking-widest">{resume.position}</TableCell>
                        <TableCell>
                          <a 
                            href={resume.resumeUrl} 
                            target="_blank" 
                            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline bg-blue-50 px-3 py-1 rounded-lg transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" /> OPEN PDF
                          </a>
                        </TableCell>
                        <TableCell className="text-slate-500 font-mono text-xs">{resume.submittedAt?.seconds ? new Date(resume.submittedAt.seconds * 1000).toLocaleDateString() : "Pending"}</TableCell>
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
