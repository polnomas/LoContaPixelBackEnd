import "dotenv/config"

const user = encodeURIComponent(process.env.MONGODB_USER)
const pass = encodeURIComponent(process.env.MONGODB_PASS)
const host = process.env.MONGODB_HOST

export const MONGODB_URI = `mongodb+srv://${user}:${pass}@${host}`
