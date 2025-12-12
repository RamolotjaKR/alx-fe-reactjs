import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './FormikForm.css';

const FormikForm = () => {
  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters')
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      console.log('Submitting form data:', values);
      
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Set success status
      setStatus({ success: true, message: `Registration successful! Welcome, ${values.username}!` });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        resetForm();
        setStatus(null);
      }, 2000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ success: false, message: 'An error occurred during submission' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="formik-container">
      <h2>Registration Form (Formik + Yup)</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status, errors, touched }) => (
          <Form className="formik-form">
            {/* Username Field */}
            <div className="formik-group">
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                className={errors.username && touched.username ? 'error-input' : ''}
              />
              <ErrorMessage 
                name="username" 
                component="span" 
                className="error-message" 
              />
            </div>

            {/* Email Field */}
            <div className="formik-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                className={errors.email && touched.email ? 'error-input' : ''}
              />
              <ErrorMessage 
                name="email" 
                component="span" 
                className="error-message" 
              />
            </div>

            {/* Password Field */}
            <div className="formik-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                className={errors.password && touched.password ? 'error-input' : ''}
              />
              <ErrorMessage 
                name="password" 
                component="span" 
                className="error-message" 
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            {/* Status Messages */}
            {status && (
              <div className={status.success ? 'success-message' : 'error-message-box'}>
                {status.message}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
