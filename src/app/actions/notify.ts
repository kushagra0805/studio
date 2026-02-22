'use server';

import nodemailer from 'nodemailer';

const ADMIN_EMAIL = 'info@cloud-x.in';

/**
 * Handles professional email notifications for all form types.
 * Requires EMAIL_USER and EMAIL_PASS environment variables.
 */
export async function notifyAdmin(submission: { type: 'contact' | 'order' | 'resume', data: any }) {
  const { type, data } = submission;
  
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn(`[NOTIFY] Missing credentials. Simulated email for ${type} logged.`);
    console.log(`[DATA]`, data);
    return { success: true, status: 'simulated' };
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

  const headerStyle = "color: #2563eb; font-family: sans-serif; font-size: 24px; font-weight: bold; margin-bottom: 20px;";
  const tableStyle = "width: 100%; border-collapse: collapse; font-family: sans-serif;";
  const labelStyle = "padding: 10px; border: 1px solid #eee; background: #f9fafb; font-weight: bold; width: 30%;";
  const valueStyle = "padding: 10px; border: 1px solid #eee;";

  if (type === 'contact') {
    subject = `[CONTACT] New Inquiry: ${data.subject}`;
    html = `
      <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="${headerStyle}">New Support Inquiry</h2>
        <table style="${tableStyle}">
          <tr><td style="${labelStyle}">Name</td><td style="${valueStyle}">${data.name}</td></tr>
          <tr><td style="${labelStyle}">Email</td><td style="${valueStyle}">${data.email}</td></tr>
          <tr><td style="${labelStyle}">Subject</td><td style="${valueStyle}">${data.subject}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
          <p style="font-weight: bold; margin-bottom: 5px;">Message:</p>
          <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
        </div>
      </div>
    `;
  } else if (type === 'order') {
    subject = `[ORDER] New ${data.serviceType.toUpperCase()} Deployment Request`;
    html = `
      <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="${headerStyle}">Infrastructure Order Received</h2>
        <table style="${tableStyle}">
          <tr><td style="${labelStyle}">Customer</td><td style="${valueStyle}">${data.name}</td></tr>
          <tr><td style="${labelStyle}">Mobile</td><td style="${valueStyle}">${data.mobile}</td></tr>
          <tr><td style="${labelStyle}">Service</td><td style="${valueStyle}">${data.serviceType.toUpperCase()}</td></tr>
          <tr><td style="${labelStyle}">Plan/Users</td><td style="${valueStyle}">${data.vpsPlan || (data.userCount ? `${data.userCount} Users` : 'Standard')}</td></tr>
          <tr><td style="${labelStyle}">Address</td><td style="${valueStyle}">${data.address}, ${data.pincode}</td></tr>
          <tr><td style="${labelStyle}">GST</td><td style="${valueStyle}">${data.gstNumber || 'N/A'}</td></tr>
        </table>
        ${data.gstCertificate ? `<div style="margin-top: 20px;"><a href="${data.gstCertificate}" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">View GST Certificate PDF</a></div>` : ''}
      </div>
    `;
  } else if (type === 'resume') {
    subject = `[CAREER] Application: ${data.position} - ${data.name}`;
    html = `
      <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="${headerStyle}">New Candidate Application</h2>
        <table style="${tableStyle}">
          <tr><td style="${labelStyle}">Applicant</td><td style="${valueStyle}">${data.name}</td></tr>
          <tr><td style="${labelStyle}">Email</td><td style="${valueStyle}">${data.email}</td></tr>
          <tr><td style="${labelStyle}">Mobile</td><td style="${valueStyle}">${data.mobile}</td></tr>
          <tr><td style="${labelStyle}">Position</td><td style="${valueStyle}">${data.position}</td></tr>
        </table>
        <div style="margin-top: 20px;">
          <a href="${data.resumeUrl}" style="display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Download Resume PDF</a>
        </div>
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
    return { success: true };
  } catch (error) {
    console.error('[NOTIFY] Dispatch error:', error);
    return { success: false, error: 'Transmission failed' };
  }
}
