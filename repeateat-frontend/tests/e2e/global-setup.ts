import { execSync } from 'node:child_process'

export default function globalSetup() {
  execSync('npm --prefix ../repeateat-backend run db:migrate:test', {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'test' },
  })
  execSync('npm run seed:e2e', {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'test' },
  })
}
