import { useForm, Controller } from "react-hook-form"
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import { createAthlete } from "../store/actions/althleteAction"

const AddAthlete = ({ createAthlete }) => {
  const { register, handleSubmit, formState, reset, control } = useForm()
  const { errors, isSubmitSuccessful } = formState

  const onSubmit = (data) => {
    createAthlete(data)
    // console.log(data)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ team: "", team: "", firstName: "", lastName: "", sports: "" })
    }
  }, [formState, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormControl isInvalid={errors.firstName}>
        <FormLabel htmlFor="firstName">First name</FormLabel>
        <Input
          id="firstName"
          placeholder="First Name"
          {...register("firstName", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <FormErrorMessage>
          {errors.firstName && errors.firstName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.lastName}>
        <FormLabel htmlFor="lastName">Last name</FormLabel>
        <Input
          id="text"
          placeholder="Last name"
          {...register("lastName", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <FormErrorMessage>
          {errors.lastName && errors.lastName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>Gender</FormLabel>
        <Controller
          name="gender"
          control={control}
          defaultValue="MALE"
          rules={{ required: "This is required" }}
          render={({ field: { onChange, value } }) => (
            <RadioGroup spacing={4} value={value} onChange={onChange}>
              <Stack direction="row">
                <Radio value="male"> Male </Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Stack>
            </RadioGroup>
          )}
        />
        <FormErrorMessage>{errors.gender && errors.gender.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.sports}>
        <FormLabel htmlFor="sports">Sports</FormLabel>
        <Input
          id="text"
          placeholder="Sports"
          {...register("sports", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <FormErrorMessage>
          {errors.sports && errors.sports.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.team}>
        <FormLabel htmlFor="team">Team</FormLabel>
        <Input
          type="text"
          id="team"
          placeholder="team"
          {...register("team", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.team && errors.team.message}
        </FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="teal" type="submit">
        Submit
      </Button>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createAthlete: (data) => dispatch(createAthlete(data)),
  }
}

export default connect(null, mapDispatchToProps)(AddAthlete)
