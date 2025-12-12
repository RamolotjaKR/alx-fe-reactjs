# Form Handling in React Tutorial

This project demonstrates two approaches to handling forms in React:
1. **Controlled Components** - Manual state management using React's `useState`
2. **Formik + Yup** - Advanced form handling with built-in validation

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173/` to view the application.

## 📁 Project Structure

```
src/
├── components/
│   ├── RegistrationForm.jsx    # Controlled components approach
│   ├── RegistrationForm.css
│   ├── FormikForm.jsx          # Formik + Yup approach
│   └── FormikForm.css
├── App.jsx                      # Main application component
└── App.css                      # Application styles
```

## 🎯 Features

### RegistrationForm (Controlled Components)
- Manual state management with `useState`
- Custom validation logic
- Real-time error clearing
- Form submission handling
- Success/error messages

**Key Concepts:**
- Controlled inputs with `value` and `onChange`
- Manual validation functions
- Error state management
- Form reset after submission

### FormikForm (Formik + Yup)
- Formik for form state management
- Yup for schema validation
- Built-in error handling
- Simplified form logic

**Key Features:**
- Declarative validation with Yup schema
- Automatic error message display
- Built-in submission state
- Form reset capabilities
- Touch state management

## 🔍 Form Fields

Both forms include:
- **Username**: Required, 3-20 characters (Formik only)
- **Email**: Required, valid email format
- **Password**: Required, minimum 6 characters

## 📝 Validation Rules

### Controlled Components
- Empty field validation
- Email format validation (regex)
- Password length validation (min 6 characters)

### Formik + Yup
- All fields required
- Username: 3-20 characters
- Email: Valid email format
- Password: 6-40 characters

## 🎨 Styling

- Responsive design
- Form containers with distinct colors:
  - Green theme for Controlled Components
  - Blue theme for Formik Form
- Error states with red borders
- Success messages with green background
- Hover and active states for buttons

## 🔄 Form Submission

Both forms simulate an API call with a 1-second delay:
- Console logs form data
- Shows success message
- Resets form after 2 seconds

## 🛠️ Technologies Used

- **React** - UI library
- **Vite** - Build tool
- **Formik** - Form management library
- **Yup** - Schema validation library

## 📚 Learning Outcomes

### Controlled Components
✅ Understanding React state management
✅ Manual form validation
✅ Event handling in React
✅ Conditional rendering for errors

### Formik
✅ Simplified form state management
✅ Schema-based validation
✅ Built-in error handling
✅ Submission state management
✅ Form reset and status handling

## 🔗 Useful Resources

- [React Forms Documentation](https://react.dev/reference/react-dom/components/input)
- [Formik Documentation](https://formik.org/docs/overview)
- [Yup Documentation](https://github.com/jquense/yup)
