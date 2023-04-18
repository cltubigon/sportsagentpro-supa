import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'

export default function HookForm() {
  const { register, handleSubmit, formState } = useForm()
  const { errors } = formState

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='name'>First name</FormLabel>
        <Input
          id='name'
          placeholder='name'
          {...register('name', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
      </FormControl>
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
      <Button mt={4} colorScheme='teal' type='submit'>
        Submit
      </Button>
    </form>
  )
}