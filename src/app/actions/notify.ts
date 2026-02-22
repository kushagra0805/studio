'use server';

import nodemailer from 'nodemailer';

const ADMIN_EMAIL = 'info@cloud-x.in';

/**
 * Handles email notifications for form submissions.
 * Note: Requires EMAIL_USER and EMAIL_PASS environment variables.
 * For Gmail, use an "App Password".
 */
export async function notifyAdmin(submission: { type: 'contact' | 'order' | 'resume', data: any }) {
  const { type, data } = submission;
  
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn(`[NOTIFY] Email credentials (EMAIL_USER/EMAIL_PASS) are not set. Skipping email delivery.`);
    console.log(`[NOTIFY] Submission Data for ${ADMIN_EMAIL}:`, submission);
    return { success: true, info: 'Credentials not configured' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  let subject = '';
  let html = '';

  if (type === 'contact') {
    subject = `[CONTACT] New Inquiry from ${data.name}`;
    html = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb;">New Contact Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
    `;
  } else if (type === 'order') {
    subject = `[ORDER] New ${data.serviceType} Order from ${data.name}`;
    html = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb;">Infrastructure Order Received</h2>
        <p><strong>Customer:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Mobile:</strong> ${data.mobile}</p>
        <p><strong>Service:</strong> ${data.serviceType.toUpperCase()}</p>
        <p><strong>Plan/Details:</strong> ${data.vpsPlan || 'Standard/Custom'}</p>
        <p><strong>Location:</strong> ${data.address}, ${data.pincode}</p>
        <p><strong>GST:</strong> ${data.gstNumber || 'N/A'}</p>
        ${data.gstCertificate ? `<p><strong>Attachment:</strong> <a href="${data.gstCertificate}">View GST Certificate</a></p>` : ''}
      </div>
    `;
  } else if (type === 'resume') {
    subject = `[CAREER] New Application: ${data.position} from ${data.name}`;
    html = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb;">New Resume Submission</h2>
        <p><strong>Applicant:</strong> ${data.name}</p>
        <p><strong>Position:</strong> ${data.position}</p>
        <p><strong>Contact:</strong> ${data.email} | ${data.mobile}</p>
        <p><strong>Resume Link:</strong> <a href="${data.resumeUrl}">Download Resume PDF</a></p>
      </div>
    `;
  }

  try {
    await transporter.sendMail({
      from: `"M A Global Notification" <${emailUser}>`,
      to: ADMIN_EMAIL,
      subject: subject,
      html: html,
    });
    console.log(`[NOTIFY] Email successfully sent to ${ADMIN_EMAIL}`);
    return { success: true };
  } catch (error) {
    console.error('[NOTIFY] Nodemailer Error:', error);
    return { success: false, error: 'Failed to dispatch email' };
  }
}
