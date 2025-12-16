# JWT Authentication Integration

This document describes the JWT authentication flow between the backend API and mobile app.

## Architecture

### Backend (Express + Prisma)

- **JWT Generation**: Uses `jsonwebtoken` to create tokens with 7-day expiration
- **Password Hashing**: Uses `bcryptjs` for secure password storage
- **Auth Middleware**: `requireAuth` middleware validates JWT tokens on protected routes
- **OAuth Support**: Google Sign-In integration via `google-auth-library`

### Frontend (React Native + Expo)

- **Secure Storage**: Uses `expo-secure-store` to persist JWT tokens
- **API Client**: Axios instance with automatic JWT injection via interceptors
- **Auth Context**: React Context for global authentication state
- **Auto-logout**: Handles 401 responses by clearing invalid tokens

## Setup

### Backend Setup

1. Install dependencies:

```bash
cd apps/backend-api
pnpm install
```

2. Configure environment variables:

```bash
cp .env.example .env
# Edit .env and set:
# - DATABASE_URL
# - JWT_SECRET (use a strong random string)
# - GOOGLE_CLIENT_ID (if using Google OAuth)
```

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Start the server:

```bash
pnpm dev
```

### Mobile App Setup

1. Install dependencies:

```bash
cd apps/mobile-app
pnpm install
```

2. Configure environment variables:

```bash
cp .env.example .env
# Edit .env and set:
# - EXPO_PUBLIC_API_URL (backend URL)
```

3. Start the app:

```bash
pnpm start
```

## API Endpoints

### Authentication (Public)

#### Sign Up

```http
POST /api/v1/b2c/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure-password"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login

```http
POST /api/v1/b2c/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure-password"
}

Response: (same as sign up)
```

#### Google Sign-In

```http
POST /api/v1/b2c/auth/google
Content-Type: application/json

{
  "idToken": "google-id-token"
}

Response: (same as sign up)
```

### Protected Routes (Require JWT)

All protected routes require the `Authorization` header:

```http
Authorization: Bearer <jwt-token>
```

#### Get Profile

```http
GET /api/v1/b2c/profile
Authorization: Bearer <token>

Response:
{
  "id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "bodyShape": "rectangle",
  "height": 175
}
```

#### Update Body Scan

```http
PUT /api/v1/b2c/profile/body-scan
Authorization: Bearer <token>
Content-Type: application/json

{
  "height": 175,
  "bodyShape": "rectangle"
}
```

## Mobile App Usage

### Using Auth Context

```tsx
import { useAuth } from "../store/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn("email@example.com", "password");
      // User is now authenticated
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    // User is now logged out
  };

  return (
    <View>
      {isAuthenticated ? (
        <Text>Welcome, {user?.name}!</Text>
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
}
```

### Making Authenticated API Calls

The API client automatically includes the JWT token:

```tsx
import { api } from "../services/api";

// This will automatically include the JWT token
const response = await api.get("/api/v1/b2c/profile");
```

### Using Profile Service

```tsx
import { profileService } from "../services/profile.service";

// Get user profile
const profile = await profileService.getProfile();

// Update body scan
await profileService.updateBodyScan({
  height: 175,
  bodyShape: "rectangle",
});
```

## Security Best Practices

1. **JWT Secret**: Use a strong, random secret in production (min 32 characters)
2. **HTTPS**: Always use HTTPS in production
3. **Token Expiration**: Tokens expire after 7 days, implement refresh tokens for production
4. **Secure Storage**: JWT tokens are stored in `expo-secure-store` (encrypted on device)
5. **CORS**: Configured to allow mobile app requests
6. **Password Hashing**: Uses bcrypt with salt rounds = 10

## Troubleshooting

### "Unauthorized" errors

- Check that the token is being sent in the `Authorization` header
- Verify the token hasn't expired
- Ensure `JWT_SECRET` matches between backend and any token generation

### "Network Error" in mobile app

- Check that `EXPO_PUBLIC_API_URL` is correct
- For Android emulator, use `http://10.0.2.2:3000`
- For iOS simulator, use `http://localhost:3000`
- For physical device, use your computer's local IP

### Token not persisting

- Ensure `expo-secure-store` is properly installed
- Check device permissions for secure storage
- Test on a real device (secure store may not work in all simulators)

## Next Steps

1. **Implement refresh tokens** for better security
2. **Add Apple Sign-In** using `expo-apple-authentication`
3. **Add Google Sign-In** using `@react-native-google-signin/google-signin`
4. **Add phone authentication** using Firebase or similar
5. **Implement password reset** functionality
6. **Add email verification** on signup
