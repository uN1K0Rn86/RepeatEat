import { execSync } from 'node:child_process'

export default function globalTeardown() {
  execSync('npm --prefix ../repeateat-backend run db:cleanup:dev', {
    stdio: 'inherit',
    env: { ...process.env },
  })
}
