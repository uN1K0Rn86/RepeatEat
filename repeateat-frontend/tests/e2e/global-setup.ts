import { execSync } from 'node:child_process'

export default function globalSetup() {
  execSync('npm --prefix ../repeateat-backend run db:migrate:dev', {
    stdio: 'inherit',
    env: { ...process.env },
  })
  execSync('npm run seed:e2e', {
    stdio: 'inherit',
    env: { ...process.env },
  })
}
