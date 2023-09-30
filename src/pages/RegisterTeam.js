/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import { connect } from 'react-redux'
import { createTeam } from '../store/actions/teamActions'
import { useEffect } from 'react'


const RegisterTeam = ({createTeam})=> {
  const { register, handleSubmit, formState, reset } = useForm()
  const { errors, isSubmitSuccessful } = formState

  const onSubmit = (data) => {
    createTeam(data)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ team: '', location: '', totalMembers: '' });
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormControl isInvalid={errors.team}>
        <FormLabel htmlFor='team'>Team name</FormLabel>
        <Input
          id='team'
          placeholder='team'
          {...register('team', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
          <FormErrorMessage>
            {errors.team && errors.team.message}
          </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.location}>
      <FormLabel htmlFor='location'>Location</FormLabel>
        <Input type='text'
          id='location'
          placeholder='location'
          {...register('location', {
            required: 'This is required',
          })}
        />
        <FormErrorMessage>
          {errors.location && errors.location.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.totalMembers}>
      <FormLabel htmlFor='totalMembers'>Total of members</FormLabel>
        <Input type='number'
          id='totalMembers'
          placeholder='Total of members'
          {...register('totalMembers', {
            required: 'This is required',
          })}
        />
        <FormErrorMessage>
          {errors.totalMembers && errors.totalMembers.message}
        </FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme='teal' type='submit'>
        Submit
      </Button>
    </form>
  )
}

const mapDispatchToProps = (dispatch)=> {
  return {
    createTeam: (data) => dispatch(createTeam(data))
  }
}

export default connect(null, mapDispatchToProps)(RegisterTeam)