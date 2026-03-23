# RepeatEat

RepeatEat is a recipe-sharing app with user authentication, households, invites, and recipe management. The user can create and view recipes, create households and invite others to their household.

The app is in production at [repeat-eat.com](https://repeat-eat.com)

## Future Features

- User can create meal plans and shopping lists based on recent cooking activity
- Google login and registration
- More detailed recipe statistics for users (eg. how many times cooked per year)

## Quick start — development

1. Create .env files
   - These values work with docker compose and nginx. You can tweak them to suit your preferred dev environment
   - Frontend:
     ```
     VITE_API_URL=http://localhost:8080
     ```
   - Backend
     ```
     DATABASE_URL=postgresql://postgres:secretpassword@localhost:5434/repeateat_db
     TEST_DATABASE_URL=postgresql://postgres:testpass@localhost:5435/repeateat_test
     BETTER_AUTH_SECRET=generate_your_own
     BETTER_AUTH_URL=http://localhost:8080
     ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run frontend, backend, db, and test db with docker compose:
   ```bash
   docker compose -f docker-compose.dev.yml up --build
   ```

## Testing and linting

- Backend tests (vitest):
  ```
  npm run test -w repeateat-backend
  ```
- Backend lint:
  ```
  npm run lint -w repeateat-backend
  ```
  -Frontend lint:
  ```
  npm run lint -w repeateat-frontend
  ```

## Project Architecture

![Architecture diagram](docs/architecture.png)

## License

- Project licensed under POLYFORM NONCOMMERCIAL LICENSE 1.0.0 - see [LICENSE](LICENSE)
