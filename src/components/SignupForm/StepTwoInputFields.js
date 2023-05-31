import { useForm, Controller } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Icon,
  Text,
  Stack,
  InputGroup,
  InputRightElement,
  useToast,
  Spinner,
  Flex,
} from '@chakra-ui/react'
import {
    FaChevronLeft,
  } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "react-phone-input-2/lib/style.css";
import './phonefield.css'
import { setAuthError, signUp } from '../../store/actions/authActions'
import PhoneInput from 'react-phone-input-2'

const StepTwoInputFields = ({userType, oneTwoToggle, setOneTwoToggle})=> {
  console.log('signup rerendered')
  const navigate = useNavigate()
  const toast = useToast()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState, control, watch } = useForm()
  const { errors } = formState
  
  const authError = useSelector((state)=> state.auth.authError)
  const firebase = useSelector((state)=> state.firebase)
  const profile = useSelector((state) => state.auth.profile)
  
  const [creatingAccount, setCreatingAccount] = useState(false)
  const [displayError, setDisplayError] = useState(null)
  const [show, setShow] = useState(false)

  const showPassword = () => setShow(!show)

  useEffect(() => {
    if (authError) {
      // setCreatingAccount(()=> !creatingAccount)
      if (authError.includes('auth/email-already-in-use')) {
        setDisplayError('email already in use')
      }
    }
  }, [authError]);
  
  useEffect(()=> {
    if (authError) {
      setCreatingAccount(()=> !creatingAccount)
      toast({
        title: 'Signup error',
        description: displayError,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
    return ()=> {
      dispatch(setAuthError())
      setDisplayError(null)
    }
  }, [displayError])
  

  const onSubmit = (data) => {
    setCreatingAccount(()=> !creatingAccount)
    dispatch(signUp({...data, userType}))
  }
  
  useEffect(() => {
    if (firebase.auth.uid && profile) {
      setCreatingAccount(()=> !creatingAccount)
      const userType = firebase.profile.userType
      switch (userType) {
        case "brand":
          navigate("/network")
          break
        case "athlete":
          navigate("/athlete-home")
          break
        case "athlete_representative":
          navigate("/athlete_representative")
          break
        case "fan":
          navigate("/fan")
          break
        case "coach_staff":
          navigate("/coach_staff")
          break
        default:
          break
      }
    }
  }, [profile])

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*[@$!%*?&])/.test(value)) {
      return "Password must contain at least one special character";
    }
    if (!/\d+/.test(value)) {
      return "Password must contain at least one number";
    }
    return true;
  }

  const formControlStyle = {
    mb: 5,
  }
  const formLabelStyle = {
    fontSize: 'sm',
    fontWeight: 'normal',
  }

  return (
    <>
        {oneTwoToggle &&
          <Stack gap={4}>
            <Icon cursor={'pointer'} as={FaChevronLeft} onClick={()=> setOneTwoToggle((prev)=>!prev)} />
            <Text fontSize={'3xl'} fontWeight={'semibold'} textAlign={'center'} >{creatingAccount ? 'Creating account...' : 'Create your account'}</Text>
            {creatingAccount && <Flex justifyContent={'center'}>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Flex>}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
            
            <FormControl sx={formControlStyle} isInvalid={errors.firstName} isRequired>
            <FormLabel sx={formLabelStyle} htmlFor='firstName'>First Name</FormLabel>
                <Input type='text'
                id='firstName'
                placeholder='First Name'
                {...register('firstName', {
                    required: 'First name is required'
                })}
                />
                <FormErrorMessage>
                {errors.firstName && errors.firstName.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl sx={formControlStyle} isInvalid={errors.lastName} isRequired>
            <FormLabel sx={formLabelStyle} htmlFor='lastName'>Last Name</FormLabel>
                <Input type='text'
                id='lastName'
                placeholder='Last Name'
                {...register('lastName', {
                    required: 'Last name is required',
                })}
                />
                <FormErrorMessage>
                {errors.lastName && errors.lastName.message}
                </FormErrorMessage>
            </FormControl>
            
            <FormControl sx={formControlStyle} isInvalid={errors.email} isRequired>
            <FormLabel sx={formLabelStyle} htmlFor='email'>Email</FormLabel>
                <Input type='email'
                id='email'
                placeholder='email'
                {...register('email', {
                    required: 'Email is required',
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

            <FormControl sx={formControlStyle} isInvalid={errors.email} isRequired>
              <FormLabel sx={formLabelStyle} htmlFor='phone'>Phone</FormLabel>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PhoneInput 
                    {...field}
                    inputClass="form-control"
                    country="us"
                    enableSearch={true}
                    disableSearchIcon={true}
                    autoFormat={true}
                    countryCodeEditable={false}
                  />
                )}
              />
              </FormControl>

            <FormControl sx={formControlStyle} isInvalid={errors.password} isRequired>
                <FormLabel sx={formLabelStyle} htmlFor='password'>Password</FormLabel>
                <InputGroup>
                    <Input
                    type={show ? 'text' : 'password'}
                    id='password'
                    placeholder='Password'
                    {...register('password', {
                        required: 'This is required',
                        validate: validatePassword,
                    })}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={showPassword}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl sx={formControlStyle} isInvalid={errors.confirmPassword} isRequired>
                <FormLabel sx={formLabelStyle} htmlFor='confirmPassword'>Confirm password</FormLabel>
                <Input
                type={show ? 'text' : 'password'}
                id='confirmPassword'
                placeholder='ConfirmPassword'
                {...register('confirmPassword', {
                    required: 'This is required',
                    validate: (fieldValue) => {
                        return fieldValue === watch("password") || "Passwords do not match"
                    },
                })}
                />
                <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
            </FormControl>

            <Button my={4} colorScheme='twitter' type='submit' w={'full'} >
                Continue
            </Button>
            </form>
        </Stack>}
    </>
  )
}

export default StepTwoInputFields