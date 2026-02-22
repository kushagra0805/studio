"use client"

import { useState, useEffect } from "react"
import { db } from "../../lib/firebase"
import { collection, query, orderBy, onSnapshot, DocumentData } from "firebase/firestore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Download, Mail, FileUser, Package, Loader2, ShieldCheck, ExternalLink, Database } from "lucide-react"
import { saveAs } from "file-saver"
import { motion } from "framer-motion"

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<DocumentData[]>([])
  const [orders, setOrders] = useState<DocumentData[]>([])
  const [resumes, setResumes] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubContacts = onSnapshot(query(collection(db, "contacts"), orderBy("submittedAt", "desc")), (snap) => {
      setContacts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    const unsubOrders = onSnapshot(query(collection(db, "orders"), orderBy("submittedAt", "desc")), (snap) => {
      setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    const unsubResumes = onSnapshot(query(collection(db, "resumes"), orderBy("submittedAt", "desc")), (snap) => {
      setResumes(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setLoading(false)
    })

    return () => { unsubContacts(); unsubOrders(); unsubResumes(); }
  }, [])

  const handleExport = (type: 'contacts' | 'orders' | 'resumes') => {
    let data: any[] = []
    let heads: Record<string, string> = {}
    let filename = ""

    if (type === 'contacts') {
      data = contacts
      heads = { name: "Name", email: "Email", subject: "Subject", message: "Message", submittedAt: "Date" }
      filename = "M_A_Global_Leads.csv"
    } else if (type === 'orders') {
      data = orders
      heads = { 
        name: "Customer", email: "Email", mobile: "Mobile", 
        serviceType: "Service", vpsPlan: "VPS Plan", userCount: "Cloud-X Users", 
        address: "Address", pincode: "Pincode", gstNumber: "GSTIN", submittedAt: "Date" 
      }
      filename = "M_A_Global_Orders.csv"
    } else {
      data = resumes
      heads = { name: "Candidate", email: "Email", mobile: "Mobile", position: "Role", resumeUrl: "Resume Link", submittedAt: "Date" }
      filename = "M_A_Global_Applicants.csv"
    }

    const csvRows = [Object.values(heads).join(",")]
    for (const row of data) {
      const values = Object.keys(heads).map(key => {
        let val = row[key]
        if (key === 'submittedAt' && val?.seconds) val = new Date(val.seconds * 1000).toISOString()
        return `"${('' + (val || "")).replace(/"/g, '""')}"`
      })
      csvRows.push(values.join(","))
    }

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, filename)
  }

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  )

  return (
    <div className="container mx-auto py-32 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              <Database className="h-10 w-10 text-primary" /> Multi-Source Submission File
            </h1>
            <p className="text-slate-500 font-medium mt-2">Central repository for all client interactions and service requests.</p>
          </div>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-secondary/50 rounded-2xl mb-12">
            <TabsTrigger value="orders" className="py-4 rounded-xl gap-2 text-lg font-bold"><Package className="h-5 w-5" /> Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="contacts" className="py-4 rounded-xl gap-2 text-lg font-bold"><Mail className="h-5 w-5" /> Leads ({contacts.length})</TabsTrigger>
            <TabsTrigger value="resumes" className="py-4 rounded-xl gap-2 text-lg font-bold"><FileUser className="h-5 w-5" /> Careers ({resumes.length})</TabsTrigger>
          </TabsList>

          {/* Orders Tab Content */}
          <TabsContent value="orders">
            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
              <CardHeader className="bg-slate-50 dark:bg-slate-900 p-8 flex flex-row items-center justify-between">
                <div><CardTitle className="text-2xl font-black">Service Orders</CardTitle><CardDescription>Full details of infrastructure requests.</CardDescription></div>
                <Button onClick={() => handleExport('orders')} className="rounded-full gap-2 h-12 px-6 font-bold shadow-xl shadow-primary/20">
                  <Download className="h-4 w-4" /> Export All Heads
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-100 dark:bg-slate-800">
                    <TableRow>
                      <TableHead className="font-bold p-6">Customer & Contact</TableHead>
                      <TableHead className="font-bold">Infrastructure Type</TableHead>
                      <TableHead className="font-bold">Configuration</TableHead>
                      <TableHead className="font-bold">GST Heads</TableHead>
                      <TableHead className="font-bold">Order Date</TableHead>
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
                        <TableCell><div className="text-xs font-bold text-slate-600">ID: {order.gstNumber || "None"}</div></TableCell>
                        <TableCell className="text-slate-500 font-mono text-xs">{order.submittedAt?.seconds ? new Date(order.submittedAt.seconds * 1000).toLocaleDateString() : "Pending"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab Content */}
          <TabsContent value="contacts">
            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
              <CardHeader className="bg-slate-50 dark:bg-slate-900 p-8 flex flex-row items-center justify-between">
                <div><CardTitle className="text-2xl font-black">Contact Leads</CardTitle><CardDescription>Inquiries and consulting requests.</CardDescription></div>
                <Button onClick={() => handleExport('contacts')} className="rounded-full gap-2 h-12 px-6 font-bold shadow-xl shadow-primary/20">
                  <Download className="h-4 w-4" /> Export Inquiry Heads
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-100 dark:bg-slate-800">
                    <TableRow>
                      <TableHead className="font-bold p-6">Name & Email</TableHead>
                      <TableHead className="font-bold">Subject Head</TableHead>
                      <TableHead className="font-bold">Message Content</TableHead>
                      <TableHead className="font-bold">Received At</TableHead>
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

          {/* Resumes Tab Content */}
          <TabsContent value="resumes">
            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
              <CardHeader className="bg-slate-50 dark:bg-slate-900 p-8 flex flex-row items-center justify-between">
                <div><CardTitle className="text-2xl font-black">Career Applicants</CardTitle><CardDescription>Potential talent acquisition data.</CardDescription></div>
                <Button onClick={() => handleExport('resumes')} className="rounded-full gap-2 h-12 px-6 font-bold shadow-xl shadow-primary/20">
                  <Download className="h-4 w-4" /> Export Candidate Heads
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-100 dark:bg-slate-800">
                    <TableRow>
                      <TableHead className="font-bold p-6">Applicant Name</TableHead>
                      <TableHead className="font-bold">Target Head (Position)</TableHead>
                      <TableHead className="font-bold">File Link</TableHead>
                      <TableHead className="font-bold">Applied Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resumes.map((resume) => (
                      <TableRow key={resume.id} className="hover:bg-slate-50/50">
                        <TableCell className="p-6">
                          <div className="font-bold text-lg">{resume.name}</div>
                          <div className="text-sm text-slate-500">{resume.email} | {resume.mobile}</div>
                        </TableCell>
                        <TableCell className="font-black uppercase text-xs tracking-widest text-primary">{resume.position}</TableCell>
                        <TableCell>
                          <a href={resume.resumeUrl} target="_blank" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline bg-blue-50 px-3 py-1 rounded-lg">
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
