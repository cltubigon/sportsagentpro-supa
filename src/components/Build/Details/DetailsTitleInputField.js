import {
  Flex,
  Text,
  Input,
  Box,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { setPostTitle } from "../../../store/actions/buildPostActions"

const DetailsTitleInputField = () => {
  const dispatch = useDispatch()
  const { register, watch } = useForm()
  const postTitle = useSelector((state) => state.build.postTitle)

  useEffect(() => {
    const watched = watch("postTitle")
    if (watched !== undefined) dispatch(setPostTitle(watched))
  }, [watch("postTitle")])

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
          value={postTitle || ""}
          {...register("postTitle")}
          placeholder="Enter offer name"
        />
      </Box>
    </>
  )
}

export default DetailsTitleInputField
