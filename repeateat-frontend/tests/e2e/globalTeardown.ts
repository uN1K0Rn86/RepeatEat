import { execSync } from 'node:child_process'

export default function globalTeardown() {
  const isCI = process.env.CI === 'true'
  const cleanupScript = isCI ? 'db:cleanup:ci' : 'db:cleanup:dev'

  execSync(`npm --prefix ../repeateat-backend run ${cleanupScript}`, {
    stdio: 'inherit',
    env: { ...process.env },
  })
}
