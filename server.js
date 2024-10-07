import express from 'express';
import router from './routes/RUser.js';

const app = express();
const port = 3002;

app.use(express.json()); // Middleware to parse JSON bodies

// Mount the router on /api
app.use('/', router);

// Add a basic route handler for the root of /api
app.get('/api', (req, res) => {
  res.status(200).json({ message: "API is working" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`------------------- Server running at http://localhost:${port} ! -------------------`);
});

// Export the app for testing purposes
export default app;