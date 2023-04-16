import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

export default function HookForm() {
  const navigate = useNavigate()
  const { register, control, handleSubmit, formState, watch } = useForm()
  const { errors } = formState

  const onSubmit = (data) => {
    const options = {
      method: 'POST',
      url: 'http://localhost:8000/api/auth/login',
      headers: {'Content-Type': 'application/json'},
      data: {email: data.email, password: data.password},
      withCredentials: true
    };
    
    axios.request(options).then(function (response) {
      console.log(response)
      const { token } = response.data;
      Cookies.set('access_token', token, { httpOnly: true });
      navigate('/');
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormControl isInvalid={errors.email}>
      <FormLabel htmlFor='email'>Email</FormLabel>
        <Input type='email'
          id='email'
          placeholder='email'
          {...register('email', {
            required: 'This is required',
            pattern: {
              value: /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/i,
              message: 'Please enter a valid email'
            }
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor='password'>password</FormLabel>
        <Input
          type='password'
          id='password'
          placeholder='password'
          {...register('password', {
            required: 'This is required'
          })}
        />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' type='submit' name='submit'>Submit</Button>
    </form>
  )
}