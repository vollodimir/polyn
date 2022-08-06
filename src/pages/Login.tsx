import React from 'react';

export const Login = () => {
  return (
    <div className="wrapper">
      <form className="form-signin">
        <h2 className="form-signin-heading">Please login</h2>
        <input type="text" className="form-control" name="username" placeholder="Email Address" />
        <input type="password" className="form-control" name="password" placeholder="Password" />
        <label className="checkbox">
          <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember
          me
        </label>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
