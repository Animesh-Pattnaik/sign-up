import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { username: "", email: "", password: "", c_password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must have atleast 8 characters";
    } else if (!/\d/.test(values.password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "Password must contain at least one uppercase letter";;
    } else if (!/[^A-Za-z0-9]/.test(values.password)) {
      errors.password = "Password must contain at least one special character";
    }
    if (!values.c_password) {
      errors.c_password = "Password is required";
    } else if (values.c_password === values.password) {
    } else{
      errors.c_password = "Password must match!";
    }

    return errors;
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>
        <h1>Create Your Account</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              name="c_password"
              placeholder="Password"
              value={formValues.c_password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.c_password}</p>
          <div className="login__check-box">
            <input type="checkbox" class="login__check-input" id="user-check"/>
            <label for="user-check" class="login__check-label">Remember me</label>
          </div>
          <button className="ui inverted button">Create Your Account</button>
          <div class="login__register">
            <p>Already have an account ? <a href="#">Sign In</a></p>
          </div>
        </div>
      </form>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success" id="Message">Account Created Successfully</div>
      ) : (
        <pre></pre>
      )}
    </div>
  );
}

export default App;
