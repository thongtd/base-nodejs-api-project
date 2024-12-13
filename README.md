# 📘 **Node.js API Project**

## 🚀 **Introduction**

This Node.js API project provides features such as:

- User registration, login, password change, and profile updates.
- **JWT Authentication** for security.
- Integrated **Swagger UI** for API documentation.
- **TypeORM** for MySQL database management.
- Request validation using **class-validator**.
- Support for refresh tokens.

---

## 🛠 **Technologies Used**

- **Node.js** & **Express**
- **TypeScript**
- **TypeORM** (MySQL)
- **JWT** (jsonwebtoken)
- **Swagger** (swagger-jsdoc, swagger-ui-express)
- **class-validator** & **class-transformer**
- **dotenv** for environment variable management

---

## 📂 **Project Structure**

```
nodejs_api_project/
│-- src/
│   │-- config/
│   │   └─ database.config.ts
│   │-- controllers/
│   │   └─ customer.controller.ts
│   │-- entities/
│   │   └─ customers.entity.ts
│   │-- middleware/
│   │   └─ validate-request.middleware.ts
│   │-- models/
│   │   └─ customers/
│   │       └─ register.model.ts
│   │-- routes/
│   │   └─ customer.route.ts
│   │-- services/
│   │   └─ jwt/
│   │       └─ jwt.service.ts
│   └─ index.ts
│-- .env
│-- package.json
└-- README.md
```

---

## ⚙️ **Environment Configuration**

Create a `.env` file in the root directory with the following content:

```env
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h
REFRESH_TOKEN_EXPIRATION=7d

# Password Regex
PASSWORD_REGEX=^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$
```

---

## 🚀 **Install and Run the Project**

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the project in development mode**

   ```bash
   npm run dev
   ```

3. **Build and run the project in production mode**

   ```bash
   npm run build
   npm start
   ```

---

## 📝 **Swagger Documentation**

Access Swagger UI for API documentation at:

```
http://localhost:3000/api-docs
```

---

## 🔒 **Authentication**

- **JWT Bearer Token** is used to secure the API.
- Add the token to the header with the key `Authorization` in the format:

  ```
  Authorization: Bearer <token>
  ```

---

## 📑 **Main APIs**

### 1. **Register User**

- **URL**: `/api/customers/register`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "P@ssw0rd!1",
    "rePassword": "P@ssw0rd!1",
    "fullName": "John Doe"
  }
  ```

### 2. **Login**

- **URL**: `/api/customers/login`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "userNameOrEmail": "user@example.com",
    "password": "P@ssw0rd!1"
  }
  ```

### 3. **Refresh Token**

- **URL**: `/api/customers/refresh-token`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "refreshToken": "<your_refresh_token>"
  }
  ```

### 4. **Change Password**

- **URL**: `/api/customers/change-password`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "oldPassword": "OldP@ssw0rd!1",
    "newPassword": "NewP@ssw0rd!1",
    "reNewPassword": "NewP@ssw0rd!1"
  }
  ```

---

## ✅ **Middleware**

### **Request Validation Middleware**

Automatically validate request bodies based on models using `class-validator`.

**Example Usage**:

```typescript
import { validateRequest } from '../middleware/validate-request.middleware';
import { RegisterModel } from '../models/customers/register.model';
import { register } from '../controllers/customer.controller';

router.post('/register', validateRequest(RegisterModel), register);
```

---

## 🔗 **References**

- **Express**: https://expressjs.com/
- **TypeORM**: https://typeorm.io/
- **Swagger**: https://swagger.io/
- **JWT**: https://jwt.io/

---

## 💡 **Notes**

- Ensure MySQL is installed and the database connection is correctly configured in the `.env` file.
- All error and response messages are encapsulated in the `BaseResponse` model.

---

## 📧 **Contact**

For questions or support, please contact: `thong@finatech.io`.
