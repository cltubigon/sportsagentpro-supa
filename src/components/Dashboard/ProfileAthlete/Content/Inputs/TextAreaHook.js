import { Textarea } from "@chakra-ui/react"
import React from "react"
import useUpdateSingleColumn from "../../../../../hooks/update/useUpdateSingleColumn"

const TextAreaHook = (props) => {
  const { query, initialValue } = props
  const { mutate } = useUpdateSingleColumn(query)
  const handleOnChange = (e) => {
    mutate(e.target.value)
  }
  return (
    <Textarea
      border={"1px solid #ccc"}
      minH={"148px"}
      defaultValue={initialValue}
      onChange={handleOnChange}
    />
  )
}

export default TextAreaHook
