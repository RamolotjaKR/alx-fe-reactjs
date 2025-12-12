import './App.css'
import RegistrationForm from './components/RegistrationForm'
import FormikForm from './components/FormikForm'

function App() {
  return (
    <div className="app">
      <div className="header">
        <h1>React Form Handling Tutorial</h1>
        <p>Learn form management with Controlled Components and Formik</p>
      </div>
      
      <div className="forms-container">
        <RegistrationForm />
        <FormikForm />
      </div>
    </div>
  )
}

export default App
