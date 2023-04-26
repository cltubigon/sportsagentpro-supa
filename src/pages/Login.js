import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
} from '@chakra-ui/react'
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({getCreds, authError, auth})=> {
  const navigate = useNavigate()
  const [authErr, setAuthErr] = useState(null)
  const { register, handleSubmit, formState } = useForm()
  const { errors } = formState

  useEffect(() => {
    if (authError) {
      if (authError === "auth/user-not-found") {
        setAuthErr('User not found');
      } else {
        setAuthErr('Incorrect username or password');
      }
    }
  }, [authError]);

  const onSubmit = (data) => {
    setAuthErr(null)
    getCreds(data)
  }
  
  useEffect(() => {
    if (auth.uid) {
      navigate('/')
    }
  }, [auth.uid])
  
  return (
    <>
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
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input type='password'
          id='password'
          placeholder='Password'
          {...register('password', {
            required: 'This is required'
          })}
        />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' type='submit' >
        Submit
      </Button>
      <Text>{authErr && authErr}</Text>
    </form>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCreds: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)