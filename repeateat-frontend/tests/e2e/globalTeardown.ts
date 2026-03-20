import { execSync } from 'node:child_process'

export default function globalTeardown() {
  const isCI = process.env.CI === 'true'

  execSync('npm --prefix ../repeateat-backend run db:cleanup', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: isCI
        ? 'postgresql://postgres:testpass@localhost:5435/repeateat_test'
        : process.env.DATABASE_URL,
    },
  })
}
