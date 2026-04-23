import { NextResponse } from 'next/server';
import { initDB, getCredentials } from '@/lib/data';

const EMAIL_USER = process.env.EMAIL_USER || 'mike082112@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, code } = body;

    if (!to || !code) {
      return NextResponse.json({ error: 'Missing email or code' }, { status: 400 });
    }

    if (EMAIL_PASS) {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: EMAIL_USER,
        to: to,
        subject: 'Your Admin Login Verification Code',
        text: `Your verification code is: ${code}\n\nThis code will expire in 10 minutes.`,
      });

      return NextResponse.json({ success: true });
    } else {
      console.log(`[DEV] Verification code ${code} would be sent to ${to}`);
      return NextResponse.json({ success: true, dev: true });
    }
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}