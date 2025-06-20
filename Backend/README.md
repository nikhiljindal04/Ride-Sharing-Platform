# User Registration API Documentation

## Register User

Registers a new user in the system.

### Endpoint

```
POST /users/register
```

### Request Body

```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string" // optional
  },
  "email": "string",
  "password": "string"
}
```

### Validation Rules

- `firstName`: Required, minimum 3 characters
- `lastName`: Optional, but if provided must be minimum 3 characters
- `email`: Required, must be valid email format
- `password`: Required, minimum 6 characters

### Example Request

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

- **Status Code**: 201 Created

```json
{
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "_id": "generated_user_id"
  },
  "token": "jwt_token"
}
```

### Error Responses

#### Validation Error

- **Status Code**: 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullName.firstName",
      "location": "body"
    }
  ]
}
```

#### Server Error

- **Status Code**: 500 Internal Server Error

```json
{
  "error": "Error creating user"
}
```

### Notes

- The password is automatically hashed before saving
- A JWT token is generated and returned upon successful registration
- The token expires in 1 hour
- Password field is excluded from the response

## Login User

Authenticates a user and returns a token.

### Endpoint

```
POST /users/login
```

### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### Validation Rules

- `email`: Required, must be valid email format
- `password`: Required, minimum 6 characters

### Example Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

- **Status Code**: 200 OK

```json
{
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "_id": "generated_user_id"
  },
  "token": "jwt_token_string"
}
```

### Error Responses

#### Invalid Credentials

- **Status Code**: 401 Unauthorized

```json
{
  "error": "Invalid email or password"
}
```

#### Validation Error

- **Status Code**: 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Invalid email format",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Notes

- The password is compared with the hashed password in the database
- A new JWT token is generated upon successful login
- The token expires in 1 hour
- Password field is excluded from the response

## Get User Profile

Returns the authenticated user's profile information.

### Endpoint

```
GET /users/profile
```

### Headers

- `Authorization: Bearer <jwt_token>` (or token cookie)

### Success Response

- **Status Code**: 200 OK

```json
{
  "_id": "generated_user_id",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com"
  // ...other user fields
}
```

### Error Responses

#### Unauthorized

- **Status Code**: 401 Unauthorized

```json
{
  "error": "Unauthorized"
}
```

#### User Not Found

- **Status Code**: 401 Unauthorized

```json
{
  "error": "User not found"
}
```

### Notes

- Requires a valid JWT token (in cookie or Authorization header).
- Token must not be blacklisted (i.e., not logged out).

---

## Logout User

Logs out the authenticated user by blacklisting the current token.

### Endpoint

```
POST /users/logout
```

### Headers

- `Authorization: Bearer <jwt_token>` (or token cookie)

### Success Response

- **Status Code**: 200 OK

```json
{
  "message": "Logged out successfully"
}
```

### Error Responses

#### Unauthorized

- **Status Code**: 401 Unauthorized

```json
{
  "error": "Unauthorized"
}
```

#### Server Error

- **Status Code**: 500 Internal Server Error

```json
{
  "message": "Error logging out"
}
```

### Notes

- Requires a valid JWT token (in cookie or Authorization header).
- The token is added to a blacklist and will be rejected for future requests.
- The token cookie is cleared on logout.
