
'use server';

import nodemailer from 'nodemailer';

const ADMIN_EMAIL = 'info@gmail.com';

// Note: You will need to set these environment variables in your .env file
// for the actual sending to work. For now, it's set up to use Gmail as a common choice.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function notifyAdmin(submission: { type: 'contact' | 'order' | 'resume', data: any }) {
  const { type, data } = submission;

  let subject = '';
  let html = '';

  if (type === 'contact') {
    subject = `New Contact Form Submission from ${data.name}`;
    html = `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `;
  } else if (type === 'order') {
    subject = `New Service Order: ${data.serviceType} from ${data.name}`;
    html = `
      <h2>New Order Received</h2>
      <p><strong>Customer Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Mobile:</strong> ${data.mobile}</p>
      <p><strong>Service Type:</strong> ${data.serviceType}</p>
      <p><strong>Plan:</strong> ${data.vpsPlan || data.webHostingPlan || data.dedicatedServerPlan || data.colocationPlan || 'Custom'}</p>
      <p><strong>Billing Address:</strong> ${data.address}, ${data.pincode}</p>
      <p><strong>GST Number:</strong> ${data.gstNumber || 'N/A'}</p>
    `;
  } else if (type === 'resume') {
    subject = `New Job Application: ${data.position} from ${data.name}`;
    html = `
      <h2>New Resume Submission</h2>
      <p><strong>Applicant Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Mobile:</strong> ${data.mobile}</p>
      <p><strong>Target Position:</strong> ${data.position}</p>
      <p><strong>Resume URL:</strong> <a href="${data.resumeUrl}">Download Resume</a></p>
    `;
  }

  try {
    // Only attempt to send if credentials exist, otherwise log the attempt
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"M A Global Network" <${process.env.EMAIL_USER}>`,
        to: ADMIN_EMAIL,
        subject: subject,
        html: html,
      });
      console.log(`Notification email sent to ${ADMIN_EMAIL} for ${type}`);
    } else {
      console.warn('Email credentials not found. Submission logged to console instead:');
      console.log('Subject:', subject);
      console.log('Content:', html);
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to send notification email:', error);
    return { success: false, error: 'Email delivery failed' };
  }
}
