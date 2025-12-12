# Integration Test – Frontend → Public API

## Purpose

Verify that the React Native app can successfully communicate with the public REST API in a real environment.  
This test ensures that network communication, HTTPS, CORS, routing, and backend configuration work as expected.

---

## Test Environment

- Device: iOS Simulator / Android Emulator
- App Build: Development build (Expo / React Native CLI)
- API Environment: Azure App Service (public URL)
- Endpoint tested: `GET /Stories`

---

## Test Steps

1. Launched the mobile app in the simulator.
2. Allowed the app to render the `StoriesOverviewScreen` (default screen).
3. Observed the UI while the `storyService.getStories()` function executed.
4. Verified console output from the fetch call.
5. Confirmed no CORS, SSL, or network-related errors were thrown.
6. Confirmed correct JSON response returned and parsed by the API client.

---

## Expected Result

- API responds with HTTP status `200 OK`.
- Response body is valid JSON and matches the expected `Story[]` schema.
- No failures related to:
  - CORS
  - HTTPS/SSL
  - Network connectivity
  - Invalid JSON
  - Incorrect endpoints
- The app should render the list of stories in the UI.

---

## Actual Result

- The request to `GET /Stories` completed successfully.
- API returned valid JSON matching the expected data format.
- No errors were logged in Metro, device console, or UI.
- The `StoriesList` component displayed the fetched stories correctly.
- The app confirmed backend connectivity through visible story titles.

✔ **Integration test passed**

---

## Notes

This verifies that the mobile app can reach the publicly hosted API and that backend configuration allows external access (CORS + HTTPS).  
Further tests (authentication, POST requests, etc.) may be added as new APIs are implemented.
