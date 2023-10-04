/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text, Input, Box } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { SET_POST_TITLE } from "../../../store/actions/buildPostActions"
import { useState } from "react"
import { debounce } from "throttle-debounce"

const DetailsTitleInputField = () => {
  console.log('title rendered')
  const dispatch = useDispatch()
  // const { register, watch } = useForm()
  // const [localValue, setLocalValue] = useState('')
  const postTitle = useSelector((state) => state.build.postTitle)

  const debounceTitle = debounce(500, (value) => {
    // setLocalValue(value)
    dispatch(SET_POST_TITLE(value))
  })
  // console.log({ postTitle })
  
  const handleOnChange = (e) => {
    const value = e.target.value
    debounceTitle(value)
  }
  // CSS styles --------------
  const borderColorWidthStyle = {
    borderColor: "gray.500",
    borderWidth: "1px",
    borderStyle: "solid",
    my: 2,
  }
  const inputLabelDescriptions = {
    fontSize: "xs",
  }
  const inputLabels = {
    fontWeight: "semibold",
  }
  return (
    <>
      <Box mb={4}>
        <Flex>
          <Text color={"red"}>*</Text>
          <Text sx={inputLabels}>Offer name</Text>
        </Flex>
        <Text sx={inputLabelDescriptions}>
          Choose something clear and concise, but make it memorable!
        </Text>
        <Input
          sx={borderColorWidthStyle}
          id="postTitle"
          // value={postTitle || ''}
          defaultValue={postTitle || ''}
          onChange={handleOnChange}
          // {...register("postTitle")}
          placeholder="Enter offer name"
        />
      </Box>
    </>
  )
}

export default DetailsTitleInputField
