# Environment Setup Guide

## Required Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Email Setup Instructions

### Gmail Setup (Recommended)
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings > Security
3. Generate an App Password
4. Use the App Password in EMAIL_PASS (not your regular password)

### Alternative Email Services
You can modify the email configuration in `server/index.js` to use other services like:
- Outlook/Hotmail
- Yahoo Mail
- Custom SMTP server

## Security Notes
- Never commit your `.env` file to version control
- Keep your email credentials secure
- Use environment variables for all sensitive information
- Consider using a service like SendGrid for production use
