# Car Rental API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

Most endpoints require authentication using a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Login

```
POST /auth/login
```

Request body:

```json
{
  "email": "admin@morent.com",
  "password": "admin123"
}
```

Response:

```json
{
  "user": {
    "id": "1",
    "email": "admin@morent.com",
    "name": "Admin User",
    "role": "admin",
    ...
  },
  "token": "base64_encoded_token"
}
```

#### Register

```
POST /auth/register
```

Request body:

```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User",
  "phone": "+1234567890"
}
```

#### Get Current User

```
GET /auth/me
```

Headers: `Authorization: Bearer <token>`

### Cars

#### List All Cars

```
GET /cars
```

#### Get Single Car

```
GET /cars/:id
```

#### Create Car (Admin Only)

```
POST /cars
```

Request body:

```json
{
  "name": "Tesla Model S",
  "brand": "Tesla",
  "type": "Sedan",
  "capacity": 4,
  "transmission": "Automatic",
  "fuel": "Electric",
  "price": 120,
  "image": "/cars/tesla.svg"
}
```

#### Update Car (Admin Only)

```
PUT /cars/:id
```

#### Delete Car (Admin Only)

```
DELETE /cars/:id
```

#### Search Cars

```
GET /cars/search?q=tesla&type=Sedan&minPrice=50&maxPrice=200&capacity=4&transmission=Automatic&page=1&limit=10
```

Query parameters:

- `q`: Search text (searches name, brand, type)
- `type`: Car type (can be comma-separated for multiple)
- `capacity`: Number of passengers
- `minPrice`: Minimum price per day
- `maxPrice`: Maximum price per day
- `transmission`: Manual or Automatic
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Rentals

#### List Rentals

```
GET /rentals?userId=2&status=active
```

Query parameters:

- `userId`: Filter by user
- `status`: Filter by status (pending, confirmed, active, completed, cancelled)

#### Create Rental

```
POST /rentals
```

Headers: `Authorization: Bearer <token>`
Request body:

```json
{
  "carId": "1",
  "pickupLocation": "Main Street Station",
  "dropoffLocation": "Airport Terminal",
  "pickupDate": "2024-01-20",
  "dropoffDate": "2024-01-25",
  "pickupTime": "10:00",
  "dropoffTime": "10:00"
}
```

#### Get Single Rental

```
GET /rentals/:id
```

#### Update Rental Status

```
PUT /rentals/:id
```

Request body:

```json
{
  "status": "confirmed",
  "paymentStatus": "paid"
}
```

#### Cancel Rental

```
DELETE /rentals/:id
```

### Favorites

#### Get User Favorites

```
GET /favorites
```

Headers: `Authorization: Bearer <token>`

#### Add to Favorites

```
POST /favorites
```

Headers: `Authorization: Bearer <token>`
Request body:

```json
{
  "carId": "1"
}
```

#### Remove from Favorites

```
DELETE /favorites
```

Headers: `Authorization: Bearer <token>`
Request body:

```json
{
  "carId": "1"
}
```

### Reviews

#### Get Reviews

```
GET /reviews?carId=1
```

Query parameters:

- `carId`: Filter reviews by car

#### Create Review

```
POST /reviews
```

Headers: `Authorization: Bearer <token>`
Request body:

```json
{
  "carId": "1",
  "rating": 5,
  "comment": "Excellent car and service!"
}
```

### Users (Admin Only)

#### List Users

```
GET /users?role=user&q=john
```

Headers: `Authorization: Bearer <token>` (Admin only)
Query parameters:

- `role`: Filter by role (user, admin)
- `q`: Search by name or email

#### Get User Profile

```
GET /users/:id
```

Headers: `Authorization: Bearer <token>`

#### Update User Profile

```
PUT /users/:id
```

Headers: `Authorization: Bearer <token>`
Request body:

```json
{
  "name": "Updated Name",
  "phone": "+9876543210",
  "avatar": "/new-avatar.svg"
}
```

#### Delete User (Admin Only)

```
DELETE /users/:id
```

Headers: `Authorization: Bearer <token>` (Admin only)

## Test Credentials

### Admin User

- Email: `admin@morent.com`
- Password: `admin123`

### Regular Users

- Email: `alex.stanton@example.com`
- Password: `password123`

- Email: `skylar.dias@example.com`
- Password: `password123`

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error
