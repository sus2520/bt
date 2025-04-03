const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Use Render's dynamic port
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Configure Nodemailer transporter with environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'adptai2024@gmail.com', // Default for local testing
        pass: process.env.EMAIL_PASS || 'Allahg0d'             // Default for local testing (replace with App Password)
    }
});

// POST endpoint to handle ticket submission and email sending
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    // Validate request body
    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Missing required fields: to, subject, text' });
    }

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER || 'adptai2024@gmail.com',
        to: to,                       // Recipient (demo@gmail.com)
        subject: subject,             // Subject line
        text: text                    // Plain text body
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', to);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});