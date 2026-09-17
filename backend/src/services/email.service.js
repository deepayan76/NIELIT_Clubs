import { Resend } from 'resend';
import { getRegistrationReceivedTemplate } from '../templates/registrationReceived.js';
import { getApplicationApprovedTemplate } from '../templates/applicationApproved.js';
import { getApplicationRejectedTemplate } from '../templates/applicationRejected.js';
import { getPasswordResetTemplate } from '../templates/passwordReset.js';

/**
 * Email Service
 * Handles transactional email delivery via Resend.
 */

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return null;
  }
  return new Resend(apiKey.trim());
}

/**
 * Sends initial Registration Received email to the student.
 */
export async function sendRegistrationReceivedEmail({
  name,
  email,
  rollNumber,
  semester,
  club
}) {
  const resend = getResendClient();
  const fromAddress = process.env.EMAIL_FROM || 'NIELIT Tech Clubs <onboarding@resend.dev>';

  if (!resend) {
    console.warn('⚠️  RESEND_API_KEY is not defined in .env. Automated email skipped.');
    return {
      success: false,
      error: 'RESEND_API_KEY not configured'
    };
  }

  try {
    const htmlContent = getRegistrationReceivedTemplate({
      name,
      club,
      rollNumber,
      semester
    });

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: 'NIELIT Tech Clubs — Registration Received',
      html: htmlContent
    });

    if (error) {
      console.error('✕ Resend email delivery failed:', error.message || error);
      return {
        success: false,
        error: error.message || error
      };
    }

    console.log(`✓ Registration Received email sent successfully to ${email} (ID: ${data?.id})`);
    return {
      success: true,
      id: data?.id
    };
  } catch (err) {
    console.error('✕ Unexpected error in sendRegistrationReceivedEmail:', err.message || err);
    return {
      success: false,
      error: err.message || err
    };
  }
}

/**
 * Sends Application Approved email with temporary credentials.
 */
export async function sendApplicationApprovedEmail({
  name,
  email,
  rollNumber,
  semester,
  club,
  temporaryPassword
}) {
  const resend = getResendClient();
  const fromAddress = process.env.EMAIL_FROM || 'NIELIT Tech Clubs <onboarding@resend.dev>';
  const loginUrl = (process.env.FRONTEND_URL?.split(',')[0] || 'http://localhost:5173') + '/login';

  if (!resend) {
    console.warn('⚠️  RESEND_API_KEY is not defined in .env. Automated approval email skipped.');
    return {
      success: false,
      error: 'RESEND_API_KEY not configured'
    };
  }

  try {
    const htmlContent = getApplicationApprovedTemplate({
      name,
      club,
      rollNumber,
      semester,
      email,
      temporaryPassword,
      loginUrl
    });

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: 'NIELIT Tech Clubs — Application Approved',
      html: htmlContent
    });

    if (error) {
      console.error('✕ Resend approval email delivery failed:', error.message || error);
      return {
        success: false,
        error: error.message || error
      };
    }

    console.log(`✓ Application Approved email sent successfully to ${email} (ID: ${data?.id})`);
    return {
      success: true,
      id: data?.id
    };
  } catch (err) {
    console.error('✕ Unexpected error in sendApplicationApprovedEmail:', err.message || err);
    return {
      success: false,
      error: err.message || err
    };
  }
}

/**
 * Sends Application Rejected email with optional reason.
 */
export async function sendApplicationRejectedEmail({
  name,
  email,
  rollNumber,
  semester,
  club,
  rejectionReason
}) {
  const resend = getResendClient();
  const fromAddress = process.env.EMAIL_FROM || 'NIELIT Tech Clubs <onboarding@resend.dev>';

  if (!resend) {
    console.warn('⚠️  RESEND_API_KEY is not defined in .env. Automated rejection email skipped.');
    return {
      success: false,
      error: 'RESEND_API_KEY not configured'
    };
  }

  try {
    const htmlContent = getApplicationRejectedTemplate({
      name,
      club,
      rollNumber,
      semester,
      rejectionReason
    });

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: 'NIELIT Tech Clubs — Application Update',
      html: htmlContent
    });

    if (error) {
      console.error('✕ Resend rejection email delivery failed:', error.message || error);
      return {
        success: false,
        error: error.message || error
      };
    }

    console.log(`✓ Application Rejected email sent successfully to ${email} (ID: ${data?.id})`);
    return {
      success: true,
      id: data?.id
    };
  } catch (err) {
    console.error('✕ Unexpected error in sendApplicationRejectedEmail:', err.message || err);
    return {
      success: false,
      error: err.message || err
    };
  }
}

/**
 * Sends single-use password reset email with cryptographic reset URL.
 */
export async function sendPasswordResetEmail({
  name,
  email,
  token
}) {
  const resend = getResendClient();
  const fromAddress = process.env.EMAIL_FROM || 'NIELIT Tech Clubs <onboarding@resend.dev>';
  const frontendBase = (process.env.FRONTEND_URL?.split(',')[0] || 'http://localhost:5173').replace(/\/$/, '');
  const resetUrl = `${frontendBase}/reset-password?token=${encodeURIComponent(token)}`;

  if (!resend) {
    console.warn('⚠️  RESEND_API_KEY is not defined in .env. Automated password reset email skipped.');
    return {
      success: false,
      error: 'RESEND_API_KEY not configured'
    };
  }

  try {
    const htmlContent = getPasswordResetTemplate({
      name,
      resetUrl,
      expiresInMinutes: 20
    });

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: 'NIELIT Tech Clubs — Password Reset Request',
      html: htmlContent
    });

    if (error) {
      console.error('✕ Resend password reset email delivery failed:', error.message || error);
      return {
        success: false,
        error: error.message || error
      };
    }

    console.log(`✓ Password Reset email sent successfully to ${email} (ID: ${data?.id})`);
    return {
      success: true,
      id: data?.id
    };
  } catch (err) {
    console.error('✕ Unexpected error in sendPasswordResetEmail:', err.message || err);
    return {
      success: false,
      error: err.message || err
    };
  }
}

