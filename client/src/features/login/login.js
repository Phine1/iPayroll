import React, { useState } from 'react';
import'./login.css'

const Login = () => {
  const initialValue = {
    username: '',
    password: '',
  };
  const [inputValues, setInputValues] = useState(initialValue);
  const [inputErrors, setInputErrors] = useState({});

  const handleChange = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setInputErrors(validateInput(inputValues));
      // setSubmit(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const validateInput = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username is required';
    }
    //lastname
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password length must be more than 4 characters';
    } else if (values.password.length > 10) {
      errors.password = 'Password length cannot exceed 10 characters';
    }

    return errors;
  };
  return (
    <div className="login-page container">
      {/* <p>{JSON.stringify(inputValues)}</p> */}
     <div className='row'> 
     <img src="" alt="company-logo"></img>
      <h1>Welcome to <strong>i</strong>Payroll</h1>
      
      </div>
      <br></br>
      <div className='row'>
      <form onSubmit={handleSubmit}>
        <p>{inputErrors.username}</p>
        <label htmlFor="username">User Name</label>
        <input
          name="username"
          id="username"
          type="text"
          placeholder="Enter User Name"
          value={inputValues.username}
          onChange={handleChange}
        />
        <br></br>
        <p>{inputErrors.password}</p>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Enter Password"
          value={inputValues.password}
          onChange={handleChange}
        />
        <br></br>
        <br></br>
        <button>LOGIN</button>
      </form>
      </div>
    </div>
  );
};

export default Login;