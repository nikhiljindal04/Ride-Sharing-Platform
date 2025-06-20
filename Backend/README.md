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

## Register Captain

Registers a new captain (driver) in the system.

### Endpoint

```
POST /captains/register
```

### Request Body

```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string" // optional
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": number,
    "vehicleType": "car" | "bike" | "auto"
  }
}
```

### Validation Rules

- `fullName.firstName`: Required, minimum 3 characters
- `fullName.lastName`: Optional, minimum 3 characters if provided
- `email`: Required, must be a valid email format
- `password`: Required, minimum 6 characters
- `vehicle.color`: Required, minimum 3 characters
- `vehicle.plate`: Required, minimum 5 characters, must be unique
- `vehicle.capacity`: Required, must be a number, minimum 1
- `vehicle.vehicleType`: Required, must be one of `"car"`, `"bike"`, or `"auto"`

### Example Request

```json
{
  "fullName": {
    "firstName": "Alice",
    "lastName": "Smith"
  },
  "email": "alice@example.com",
  "password": "securepass",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Success Response

- **Status Code**: 201 Created

```json
{
  "captain": {
    "_id": "generated_captain_id",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
    // ...other captain fields
  },
  "token": "jwt_token_string"
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

#### Captain Already Exists

- **Status Code**: 400 Bad Request

```json
{
  "error": "Captain already exists"
}
```

#### Server Error

- **Status Code**: 500 Internal Server Error

```json
{
  "error": "Error creating captain"
}
```

### Notes

- The password is automatically hashed before saving.
- A JWT token is generated and returned upon successful registration.
- The token expires in 24 hours.
- Password field is excluded from the response.
- Vehicle plate number must be unique across the system.

## Captain Login

Authenticates a captain and returns a token.

### Endpoint

```
POST /captains/login
```

### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### Validation Rules

- `email`: Required, must be a valid email address
- `password`: Required, minimum 6 characters

### Example Request

```json
{
  "email": "alice@example.com",
  "password": "securepass"
}
```

### Success Response

- **Status Code**: 200 OK

```json
{
  "captain": {
    "_id": "generated_captain_id",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
    // ...other captain fields
  },
  "token": "jwt_token_string"
}
```

### Error Responses

#### Invalid Credentials

- **Status Code**: 400 Bad Request

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
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Notes

- The password is compared with the hashed password in the database.
- A new JWT token is generated upon successful login.
- The token expires in 24 hours.
- Password field is excluded from the response.

---

## Get Captain Profile

Returns the authenticated captain's profile information.

### Endpoint

```
GET /captains/profile
```

### Headers

- `Authorization: Bearer <jwt_token>` (or token cookie)

### Success Response

- **Status Code**: 200 OK

```json
{
  "captain": {
    "_id": "generated_captain_id",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
    // ...other captain fields
  }
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

#### Captain Not Found

- **Status Code**: 404 Not Found

```json
{
  "error": "Captain not found"
}
```

### Notes

- Requires a valid JWT token (in cookie or Authorization header).
- Token must not be blacklisted (i.e., not logged out).

---

## Captain Logout

Logs out the authenticated captain by blacklisting the current token.

### Endpoint

```
POST /captains/logout
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

#### No Token Provided

- **Status Code**: 400 Bad Request

```json
{
  "error": "No token provided"
}
```

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
  "message": "1 Error logging out"
}
```

### Notes

- Requires a valid JWT token (in cookie or Authorization header).
- The token is added to a blacklist and will be rejected for future requests.
- The token cookie is cleared on logout.
