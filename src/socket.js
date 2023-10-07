import io from 'Socket.IO-client'

const URL = process.env.NODE_ENV === 'production' ? 'https://sketchbook-server.vercel.app' : 'http://localhost:5000'

export const socket = io(URL)