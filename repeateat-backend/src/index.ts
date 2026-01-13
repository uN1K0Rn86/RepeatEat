import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

import app from './app'

const PORT = process.env.PORT || 3000

const db = drizzle(process.env.DATABASE_URL!)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
