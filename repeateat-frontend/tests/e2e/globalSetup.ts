import { execSync } from 'node:child_process'

export default function globalSetup() {
  const isCI = process.env.CI === 'true'
  const migrateScript = isCI ? 'db:migrate:ci' : 'db:migrate:dev'

  execSync(`npm --prefix ../repeateat-backend run ${migrateScript}`, {
    stdio: 'inherit',
    env: { ...process.env },
  })
  execSync('npm run seed:e2e', {
    stdio: 'inherit',
    env: { ...process.env },
  })
}
