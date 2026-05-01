import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, name, phoneNumber, payload, message } = req.body;

      // Create a transporter using Yahoo email service and environment variables
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.YAHOO_EMAIL, // Your Yahoo email (from .env.local)
          pass: process.env.YAHOO_APP_PASSWORD, // Your Yahoo app password (from .env.local)
        },
      });

      // Set up the email data
      const mailOptions = {
        from: email, // Sender's email address
        to: process.env.YAHOO_EMAIL, // Receiver's email address (change if needed)
        subject: 'New Quote Request',
        text: `You have received a new quote request from:

        Name: ${name}
        Email: ${email}
        Phone Number: ${phoneNumber}
        Payload: ${payload}
        Message: ${message}`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Respond with a success message
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      // Log the error and send a response with the error message
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email', details: error.message });
    }
  } else {
    // Respond with a 405 if method is not POST
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}