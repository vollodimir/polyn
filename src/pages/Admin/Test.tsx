import React from 'react';
import { useForm } from 'react-hook-form';

export const Test = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const onSubmit = (data: any) => {
    console.log(data.imgURL[1].name);
  };

  return (
    <>
      Ошибка:
      {errors.Email?.message}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          placeholder="First name"
          {...register('imgURL', { required: true })}
          multiple
        />
        <input
          type="text"
          placeholder="Last name"
          {...register('Last name', { required: true, maxLength: 100 })}
        />
        <input
          type="text"
          placeholder="Email"
          {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
        />{' '}
        <input
          type="tel"
          placeholder="Mobile number"
          {...register('Mobile number', { required: true, minLength: 6, maxLength: 12 })}
        />
        <select {...register('Title', { required: true })} multiple>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>
        <input {...register('Developer', { required: true })} type="radio" value="Yes" />
        <input {...register('Developer', { required: true })} type="radio" value="No" />
        <input type="time" placeholder="4444" {...register('4444', {})} />
        <input type="submit" />
      </form>
    </>
  );
};
