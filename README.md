# RepeatEat

RepeatEat is a recipe-sharing app with user authentication, households, invites, and recipe management. The user can create and view recipes, create households and invite others to their household. Once in a household, the user can generate meal plans for the household based on recent activity or randomly.

The app is in production at [repeat-eat.com](https://repeat-eat.com)

## Using the app

Here is a suggested flow for testing how the app works:

- Suggestion: use dark mode. Light mode is unpolished.
- Register as a new user.
- Create a new household.
- Add recipes to the household. If there are no publicly available recipes, add some.
- Once you have at least three recipes in your household, you can generate a new meal plan. A meal plan will consist of a specified number of recipes and be valid for a specified time. As of writing this readme, the primary functionality of the meal plan is to prioritize recipes either based on activity (recently made recipes are less likely to appear in the meal plan) or favoritism (most cooked recipes are more likely to appear).
- You can create another username if you want to test inviting more people to the household. As of writing this readme, sending an invite to an email that is not registered only saves the invite in the database (does not send an invitation email atm).
- You can mark a recipe as cooked on a particular date. This will affect meal plan generation and in the future, stastistics for tracking cooking will be available.

## Work logs

[Work logs](worklogs.md)

## Future Features

- User can create shopping lists based on meal plans
- Google login and registration
- Email confirmation for registration
- Inviting unregistered users via email
- More detailed recipe statistics for users (eg. how many times cooked per year)

## Quick start — development

1. Create .env files
   - These values work with docker compose and nginx. You can tweak them to suit your preferred dev environment. Ports may have to be changed to match your system.
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

- E2E tests (playwright):

  ```
  npm run test:e2e -w repeateat-frontend
  ```

- Backend lint:
  ```
  npm run lint -w repeateat-backend
  ```
- Frontend lint:
  ```
  npm run lint -w repeateat-frontend
  ```

## Project Architecture

[Architecture diagram](docs/architecture.png)

## Use of Generative AI

Github Copilot and Google Gemini have been used to correct syntax and find bugs in code. Additionally, AI was used for generating new ideas and discussing architecture choices, for example when deciding how to form database tables. AI was used to help in generating some code as well, for example with CI/CD, tailwind CSS, and some hooks (eg. useDebounce). No code was copy-pasted or generated directly into a file, I read through and made sure to understand everything.

## License

- Project licensed under POLYFORM NONCOMMERCIAL LICENSE 1.0.0 - see [LICENSE](LICENSE)
