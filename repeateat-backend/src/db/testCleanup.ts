import { like } from 'drizzle-orm'

import { user } from './schema'

import db from '.'

export async function cleanup() {
  console.log('--- Cleaning up data inserted by tests ---')

  try {
    await db.delete(user).where(like(user.email, 'playwright%'))

    console.log('--- Cleanup successful ---')
  } catch (err) {
    console.log(err)
  }
}

if (require.main === module) {
  cleanup()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Cleanup failed:', err)
      process.exit(1)
    })
}
