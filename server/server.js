const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin (you'll need to add your service account key)
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   // or use a service account key file:
//   // credential: admin.credential.cert(require('./path/to/serviceAccountKey.json')),
// });

// Store FCM tokens (in production, use a database)
const fcmTokens = new Set();

// Routes
app.post('/register', (req, res) => {
  const { token } = req.body;
  if (token) {
    fcmTokens.add(token);
    console.log('Token registered:', token);
    res.json({ success: true, message: 'Token registered successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Token is required' });
  }
});

app.post('/send-notification', async (req, res) => {
  const { title, body, data } = req.body;
  
  if (!title || !body) {
    return res.status(400).json({ 
      success: false, 
      message: 'Title and body are required' 
    });
  }

  try {
    // For demo purposes, we'll just log the notification
    // In production, you would use Firebase Admin SDK
    console.log('Sending notification:', {
      title,
      body,
      data,
      tokens: Array.from(fcmTokens)
    });

    // Example Firebase Admin SDK usage (uncomment when you have service account):
    // const message = {
    //   notification: {
    //     title,
    //     body,
    //   },
    //   data: data || {},
    //   tokens: Array.from(fcmTokens),
    // };
    // 
    // const response = await admin.messaging().sendMulticast(message);
    // console.log('Successfully sent messages:', response.successCount);

    res.json({ 
      success: true, 
      message: 'Notification sent successfully',
      tokensCount: fcmTokens.size
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error sending notification' 
    });
  }
});

app.get('/tokens', (req, res) => {
  res.json({ 
    tokens: Array.from(fcmTokens),
    count: fcmTokens.size 
  });
});

app.listen(PORT, () => {
  console.log(`Notification server running on port ${PORT}`);
  console.log(`Register tokens: POST http://localhost:${PORT}/register`);
  console.log(`Send notification: POST http://localhost:${PORT}/send-notification`);
}); 