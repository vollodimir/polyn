import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { fetchLogin, selectIsAuth, UserParams } from '../redux/auth/slise';
import { useAppDispatch } from '../redux/store';

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'ts2@ukr.net',
      password: '12345678',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: UserParams) => {
    const userData = await dispatch(fetchLogin(values));

    if (!userData.payload) {
      alert('Autorisation problem!');
    }
    if ('token' in userData.payload) {
      window.localStorage.setItem('token', userData.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="form-signin">
        <h2 className="form-signin-heading">Please login</h2>
        <input
          {...register('email', { required: 'Input email adress' })}
          type="email"
          className="form-control"
          name="email"
          placeholder="Email Address"
        />

        <input
          {...register('password', { required: 'Input password' })}
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
        />
        <p className="checkbox" style={{ color: 'red', fontSize: '12px' }}>
          {errors.email?.message} {errors.password?.message}
        </p>
        {/* <label className="checkbox">
          <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember
          me
        </label> */}
        <button disabled={!isValid} type="submit" className="btn btn-lg btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
  );
};
