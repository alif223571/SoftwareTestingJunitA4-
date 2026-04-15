# Selenium Testing Assignment - Node.js Authentication Application

A complete Node.js authentication application with comprehensive test automation using Selenium WebDriver, Mocha, Chai, and Page Object Model (POM).

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Technologies Used](#technologies-used)

## 🚀 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Google Chrome** browser - [Download](https://www.google.com/chrome/)
- **npm** (comes with Node.js)

## 📦 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "c:\Users\admin\Desktop\ST A#4"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running:**
   - Windows: MongoDB should be running as a service
   - Verify MongoDB is running on `mongodb://localhost:27017`

4. **Configure environment variables:**
   - The `.env` file is already configured with default settings
   - Update `MONGODB_URI` if your MongoDB runs on a different port

## 🏗️ Project Structure

```
ST A#4/
├── src/
│   ├── models/
│   │   └── User.js                 # Mongoose user schema
│   ├── routes/
│   │   ├── auth.js                 # Authentication API routes
│   │   └── index.js                # Page rendering routes
│   ├── controllers/
│   │   └── authController.js       # Auth business logic
│   └── utils/
│       └── validation.js           # Input validation functions
├── views/
│   ├── login.ejs                   # Login page template
│   ├── signup.ejs                  # Signup page template
│   └── dashboard.ejs               # Dashboard page template
├── tests/
│   ├── unit/
│   │   └── validation.test.js      # Unit tests for validation
│   ├── integration/
│   │   ├── auth.test.js            # Integration tests for auth
│   │   └── advanced.test.js        # Advanced test cases
│   ├── pages/
│   │   ├── LoginPage.js            # Login Page Object
│   │   └── SignupPage.js           # Signup Page Object
│   └── utils/
│       └── testHelpers.js          # Test utilities
├── public/
│   └── css/
│       └── style.css               # Application styles
├── server.js                       # Express server entry point
├── package.json                    # Project dependencies
├── .env                            # Environment variables
└── README.md                       # This file
```

## 🌐 Running the Application

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Access the application:**
   - Login page: http://localhost:3000
   - Signup page: http://localhost:3000/signup
   - Dashboard: http://localhost:3000/dashboard

3. **Verify the application:**
   - Open your browser and navigate to http://localhost:3000
   - Test the signup functionality
   - Test the login functionality
   - Verify navigation between pages

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Unit Tests Only
```bash
npm run test:unit
```

### Run Integration Tests Only
```bash
npm run test:integration
```

### Run Advanced Tests Only
```bash
npm run test:advanced
```

## 📊 Test Coverage

### Unit Tests (validation.test.js)
- ✅ Email validation (7 tests)
  - Valid email formats
  - Missing @ symbol
  - Missing domain
  - Empty/null values
  - Subdomains and special characters

- ✅ Password validation (7 tests)
  - Valid passwords (>= 6 characters)
  - Short passwords (< 6 characters)
  - Empty/null values
  - Boundary testing (exactly 6 chars)

- ✅ Username validation (8 tests)
  - Valid usernames (>= 3 characters)
  - Short usernames (< 3 characters)
  - Empty/null values
  - Whitespace handling

- ✅ Complete user data validation (5 tests)
  - Valid user data
  - Single field validation errors
  - Multiple field validation errors

**Total Unit Tests: 27**

### Integration Tests (auth.test.js)
- ✅ Login scenarios (5 tests)
  - Valid login with correct credentials
  - Wrong password for existing user
  - Non-existing user login
  - Empty form submission
  - Invalid email format

- ✅ Signup scenarios (7 tests)
  - Valid registration
  - Missing fields validation
  - Short password rejection
  - Invalid email rejection
  - Short username rejection
  - Navigation: login → signup
  - Navigation: signup → login

**Total Integration Tests: 12**

### Advanced Tests (advanced.test.js)
- ✅ Boundary testing (4 tests)
  - Password exactly 6 characters
  - Password 5 characters (below boundary)
  - Username exactly 3 characters
  - Username 2 characters (below boundary)

- ✅ Special characters input (3 tests)
  - Username with special characters
  - Email with special characters
  - Password with special characters

- ✅ Random/invalid inputs (5 tests)
  - Extremely long username (150 chars)
  - Extremely long password (150 chars)
  - SQL injection in username
  - SQL injection in email
  - HTML tags in username (XSS attempt)

- ✅ Rapid multiple submissions (2 tests)
  - Multiple rapid signup submissions
  - Multiple rapid login attempts

- ✅ Edge cases (6 tests)
  - Whitespace-only username
  - Whitespace-only email
  - Mixed case email addresses
  - Leading/trailing spaces
  - Numeric-only username
  - Email with multiple dots

**Total Advanced Tests: 20**

### **Grand Total: 59 Tests**

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web application framework
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **body-parser** - Request body parsing
- **dotenv** - Environment variable management

### Frontend
- **EJS** - Embedded JavaScript templating
- **CSS3** - Modern styling with gradients and animations

### Testing
- **Mocha** - Test framework
- **Chai** - Assertion library
- **Selenium WebDriver** - Browser automation
- **ChromeDriver** - Chrome browser driver

### Design Patterns
- **Page Object Model (POM)** - Maintainable test automation
- **MVC Architecture** - Model-View-Controller pattern

## 🔐 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Authenticate user |

### Page Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Login page |
| GET | `/signup` | Signup page |
| GET | `/dashboard` | Dashboard page |

## 📝 Test Data

The test suite automatically generates random test data using timestamps to avoid conflicts:
- Username: `testuser{timestamp}`
- Email: `test{timestamp}@example.com`
- Password: `password{timestamp}`

## ⚙️ Configuration

### Environment Variables (.env)

```env
PORT=3000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/auth-test-app  # MongoDB connection string
JWT_SECRET=your-secret-key-here-change-in-production # JWT signing key
NODE_ENV=development                         # Environment mode
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB service is running
- Check MongoDB URI in `.env` file
- Verify MongoDB is listening on port 27017

### ChromeDriver Issues
- Ensure Google Chrome is installed
- Update ChromeDriver: `npm install chromedriver@latest`
- Run tests with `--no-sandbox` flag (already configured)

### Tests Timeout
- Increase timeout in test files if needed
- Ensure application server is running before tests
- Check network connectivity to localhost:3000

## 📚 Additional Notes

- All tests run in headless Chrome mode for faster execution
- Page Object Model ensures tests are maintainable and reusable
- Both client-side and server-side validation implemented
- Passwords are securely hashed using bcrypt
- JWT tokens used for authentication

## 👨‍💻 Author

Selenium Testing Assignment - Complete Implementation

## 📄 License

ISC
