import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import db from '../../lib/db';

export const config = {
  api: { bodyParser: false }, // disable Next.js body parser for file upload
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      multiples: false,
      uploadDir,
      keepExtensions: true,
      maxFileSize: 20 * 1024 * 1024, // 20MB
      filter: (part) => {
        // only allow images
        return part.mimetype && part.mimetype.startsWith('image/');
      },
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err);
        return res.status(400).json({ error: 'Invalid form data or file too large' });
      }

      // extract fields safely
      const nameVal = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const addressVal = Array.isArray(fields.address) ? fields.address[0] : fields.address;
      const cityVal = Array.isArray(fields.city) ? fields.city[0] : fields.city;
      const stateVal = Array.isArray(fields.state) ? fields.state[0] : fields.state;
      const contactVal = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
      const emailVal = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

      // ✅ validation for empty fields
      if (!nameVal || !addressVal || !cityVal || !stateVal || !contactVal || !emailVal) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // ✅ validation for email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      // ✅ validation for contact (digits only)
      if (!/^\d+$/.test(contactVal)) {
        return res.status(400).json({ error: 'Contact number must be numeric' });
      }

      let imagePath = '';
      const file = files.image ? (Array.isArray(files.image) ? files.image[0] : files.image) : null;

      if (file && file.filepath) {
        const fileName = Date.now() + '_' + (file.originalFilename || 'upload.jpg');
        const newPath = path.join(uploadDir, fileName);

        fs.renameSync(file.filepath, newPath); // move uploaded file
        imagePath = `/schoolImages/${fileName}`;
      } else {
        return res.status(400).json({ error: 'Image is required' });
      }

      try {
        const [result] = await db.execute(
          'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [nameVal, addressVal, cityVal, stateVal, contactVal, imagePath, emailVal]
        );

        return res.status(201).json({ message: 'School added successfully', id: result.insertId });
      } catch (dbErr) {
        console.error('DB insert error:', dbErr);
        return res.status(500).json({ error: 'Database error' });
      }
    });
  } catch (e) {
    console.error('Server error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
