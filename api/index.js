import { createApp } from '../backend/src/app.js';

// Vercel Serverless Function entry point
const app = createApp({
  inquiryTo: process.env.INQUIRY_TO || 'rasecjrvillanoza@gmail.com',
});

export default app;
