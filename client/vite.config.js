import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In development, any request to /api is forwarded to the Express server,
// so the frontend and backend work together without CORS setup.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:5000' } },
})
