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
