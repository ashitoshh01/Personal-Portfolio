import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is missing");
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['ashitoshlavhate2@gmail.com'],
            subject: `New Contact Form Submission: ${subject}`,
            html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
            reply_to: email,
        });

        if (error) {
            console.error("Resend Error:", error);
            return res.status(400).json({ error: error.message || error });
        }

        return res.status(200).json({ data });
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
