import { like } from 'drizzle-orm'

import { user } from './schema'

import db from '.'

export async function cleanup() {
  console.log('--- Cleaning up data inserted by tests ---')

  try {
    await db.delete(user).where(like(user.email, 'playwright%'))
  } catch (err) {
    console.log(err)
  }

  console.log('--- Cleanup successful ---')
}

if (require.main === module) {
  cleanup()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Cleanup failed:', err)
      process.exit(1)
    })
}
