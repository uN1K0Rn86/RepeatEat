import { execSync } from 'node:child_process'

export default function globalSetup() {
  const isCI = process.env.CI === 'true'

  execSync('npm --prefix ../repeateat-backend run db:migrate', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: isCI
        ? 'postgresql://postgres:testpass@localhost:5435/repeateat_test'
        : process.env.DATABASE_URL,
    },
  })
  execSync('npm run seed:e2e', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: isCI
        ? 'postgresql://postgres:testpass@localhost:5435/repeateat_test'
        : process.env.DATABASE_URL,
    },
  })
}
