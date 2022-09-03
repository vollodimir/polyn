import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../redux/auth/selectors';
import { fetchRegister } from '../redux/auth/slise';
import { RegisterParams } from '../redux/auth/types';
import { useAppDispatch } from '../redux/store';

export const Register = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: RegisterParams) => {
    const userData = await dispatch(fetchRegister(values));

    if (!userData.payload) {
      alert('Registration problem!');
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
        <h2 className="form-signin-heading">Please register</h2>

        <input
          {...register('firstName', { required: 'First Name' })}
          type="text"
          className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
          name="firstName"
          placeholder="First Name"
        />
        <input
          {...register('lastName', { required: 'Last Name' })}
          type="text"
          className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
          name="lastName"
          placeholder="Last Name"
        />
        <input
          {...register('email', { required: 'Input email adress' })}
          type="email"
          className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
          name="email"
          placeholder="Email Address"
        />
        <input
          {...register('password', { required: 'Input password' })}
          type="password"
          className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
          name="password"
          placeholder="Password"
        />
        <div className="invalid-feedback">Please choose a username.</div>
        <div className="valid-feedback">Looks good!</div>
        <p className="checkbox" style={{ color: 'red', fontSize: '12px' }}>
          {errors.firstName?.message}
          {errors.lastName?.message}
          {errors.email?.message}
          {errors.password?.message}
        </p>

        <button disabled={!isValid} type="submit" className="btn btn-lg btn-primary btn-block">
          Register
        </button>
      </form>
    </div>
  );
};
