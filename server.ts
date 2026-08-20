import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import fs from 'fs';

async function startServer() {
  const app = express();
  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for live agent chat
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      const chat = ai.chats.create({
        model: 'gemini-3.7-flash',
        config: {
          systemInstruction: 'You are the friendly, professional AI recruitment and career assistant for "Lus vir werk Go2Guys" (Go2Guys Job Box). You help South African job seekers with construction, trades, driving, admin, and professional career opportunities, CV tips, and application guidance. Be concise, encouraging, helpful, and polite.',
        }
      });

      // Replay previous conversation context
      for (let i = 0; i < messages.length - 1; i++) {
        const msg = messages[i];
        if (msg.role === 'user') {
          await chat.sendMessage({ message: msg.text });
        } else if (msg.role === 'model') {
          // Send model history if desired or let chat track it
        }
      }

      const lastMessage = messages[messages.length - 1].text;
      const response = await chat.sendMessage({ message: lastMessage });

      res.json({ text: response.text || 'I am here to help with your Go2Guys job application!' });
    } catch (error: any) {
      console.error('Gemini chat error:', error);
      res.status(500).json({ error: error.message || 'Failed to communicate with agent' });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';
  const root = process.cwd();

  if (isProduction) {
    app.use(express.static(path.resolve(root, 'dist')));
    app.get('*', (_, res) => {
      res.sendFile(path.resolve(root, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
