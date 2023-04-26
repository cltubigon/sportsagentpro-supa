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
import { signUp } from '../store/actions/authActions'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupForm = ({getCreds, auth, authError})=> {
  console.count('rendered signup')
  console.count('authError: ', authError)
  const navigate = useNavigate()
  const [authErr, setAuthErr] = useState(null)
  const { register, handleSubmit, formState } = useForm()
  const { errors } = formState

  useEffect(() => {
    if (authError) {
      if (authError.includes('auth/email-already-in-use')) {
        setAuthErr('email already in use')
      }
    }
  }, [authError]);

  const onSubmit = (data) => {
    getCreds(data)
  }
  
  useEffect(() => {
    if (auth.uid) {
      navigate('/')
    }
  }, [auth.uid])
  
  console.count('authErr: ', authErr)
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
      
      <FormControl isInvalid={errors.firstName}>
      <FormLabel htmlFor='firstName'>First Name</FormLabel>
        <Input type='text'
          id='firstName'
          placeholder='First name'
          {...register('firstName', {
            required: 'This is required'
          })}
        />
        <FormErrorMessage>
          {errors.firstName && errors.firstName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.lastName}>
      <FormLabel htmlFor='lastName'>Last Name</FormLabel>
        <Input type='text'
          id='lastName'
          placeholder='Last Name'
          {...register('lastName', {
            required: 'This is required'
          })}
        />
        <FormErrorMessage>
          {errors.lastName && errors.lastName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.userType}>
      <FormLabel htmlFor='userType'>User Type</FormLabel>
        <Input type='text'
          value='athlete'
          id='userType'
          placeholder='User type'
          {...register('userType', {
            required: 'This is required'
          })}
        />
        <FormErrorMessage>
          {errors.userType && errors.userType.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.team}>
      <FormLabel htmlFor='team'>Team Id</FormLabel>
        <Input type='text'
          value='r2N2bsPSEOeNe9uZb6hL'
          id='team'
          placeholder='Name of team'
          {...register('team', {
            required: 'This is required'
          })}
        />
        <FormErrorMessage>
          {errors.team && errors.team.message}
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
  console.log(state)
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCreds: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)