# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## API Integration

The frontend connects to the Floura backend API using a shared API client and feature-specific services.

**Public API URL:**

EXPO_PUBLIC_API_URL="https://floura-api-asfmcdd6fdfkd4df.westeurope-01.azurewebsites.net/api"


- All API requests go through `src/api/apiClient.ts`  
- Feature services (like `storyService`) use the client  
- Components call services, not `fetch()` directly  

A simple integration test verifies the app can successfully fetch data from the API:

> For full API documentation (endpoints, request examples, etc.), see the **backend README**.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## ESLint & Prettier

This project uses ESLint and Prettier to ensure code quality and consistent formatting.

### Running locally

- Lint your code:
```bash
npm run lint
```

## Useful Scripts

| Script                  | Description |
|-------------------------|-------------|
| `npm expo start`        | Starts Expo app |
| `npm run lint`          | Runs ESLint to check code |
| `npm run lint:fix`      | Auto-fixes lint issues |
| `npm run format`        | Formats code using Prettier |
| `npm run reset-project` | Resets app to fresh project state |


