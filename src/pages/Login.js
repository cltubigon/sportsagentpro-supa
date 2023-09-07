import { useForm } from "react-hook-form"
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  Box,
  Heading,
  Flex,
  Stack,
  useToast,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { setAuthError, setProfile, signIn } from "../store/actions/authActions"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/layouts/Footer"
import { loginStyle } from "../styles/loginStyle"

const LoginForm = () => {
  console.log("login rendered")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  const authError = useSelector((state) => state.auth.authError)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const userType = useSelector((state) => state.firebase.profile.userType)
  const [loading, setLoading] = useState(false)

  const [show, setShow] = useState(false)
  const { register, handleSubmit, formState } = useForm()
  const { errors } = formState

  const onSubmit = (data) => {
    setLoading(() => true)
    dispatch(signIn(data))
  }

  const handleShowPassword = () => setShow((prev) => !prev)

  useEffect(() => {
    if (authError) {
      toast({
        title: "Login error",
        description:
          authError === "auth/user-not-found"
            ? "User not found"
            : "Incorrect username or password",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    }

    return () => {
      setLoading(false)
      dispatch(setAuthError())
    }
  }, [authError])

  useEffect(() => {
    console.log('I am about to set the Profile')
    console.log('userType: ', userType)
    if (userType) {
      dispatch(setProfile())
      switch (userType) {
        case "brand":
          navigate("/network")
          break
        case "athlete":
          navigate("/athlete-home")
          break
        default:
          break
      }
    }
  }, [userType, isLoggedIn])

  const {
    formControlStyle,
    formLabelStyle,
    containerStyle,
    logoContainer,
    userSigninText,
    loginButton,
    signupContainer,
    signupBtn,
  } = loginStyle
  return (
    <>
      <Box sx={logoContainer}>
        <Heading>
          <Link to={"/"}>Sports Agent Pro</Link>
        </Heading>
      </Box>

      <Stack sx={containerStyle} gap={4}>
        <Text sx={userSigninText}>User sign in</Text>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormControl sx={formControlStyle} isInvalid={errors.email}>
            <FormLabel sx={formLabelStyle} htmlFor="email">
              Email
            </FormLabel>
            <Input
              type="email"
              id="email"
              placeholder="email"
              {...register("email", {
                required: "Enter your email address",
                pattern: {
                  value: /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/i,
                  message: "Please enter a valid email",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl sx={formControlStyle} isInvalid={errors.password}>
            <FormLabel sx={formLabelStyle} htmlFor="password">
              Password
            </FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button mt={4} colorScheme="twitter" type="submit" sx={loginButton}>
            {!loading ? (
              "Login"
            ) : (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="md"
              />
            )}
          </Button>

          <Flex sx={signupContainer}>
            <Text>Dont have an account?</Text>
            <Link to={"/signup"}>
              <Button sx={signupBtn}>Signup</Button>
            </Link>
          </Flex>
        </form>
      </Stack>
      <Footer />
    </>
  )
}

export default LoginForm
