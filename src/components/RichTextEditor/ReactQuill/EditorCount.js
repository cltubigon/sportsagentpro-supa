/* eslint-disable react-hooks/exhaustive-deps */
import { Text } from "@chakra-ui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_DETAILS_TAB_STATUS } from "../../../store/actions/buildPostActions"
import { useEffect } from "react"

const EditorCount = ({ count, limitCharacters }) => {
  console.log("Counter rendered")
  const dispatch = useDispatch()
  const postTitle = useSelector((state) => state.build.postTitle)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count > limitCharacters) {
        dispatch(SET_DETAILS_TAB_STATUS(false))
      } else if (count > 50 && postTitle !== "") {
        dispatch(SET_DETAILS_TAB_STATUS(true))
      } else {
        dispatch(SET_DETAILS_TAB_STATUS(false))
      }
    }, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [count, postTitle])
  return (
    <>
      <Text
        position={"absolute"}
        bottom={"-80px"}
        right={"0px"}
        color={count > limitCharacters && "red"}
        bgColor={count > limitCharacters && 'red.100'}
        w={'60px'}
        py={'3px'}
        textAlign={'center'}
        borderRadius={'md'}
      >
        {limitCharacters - count}
      </Text>
    </>
  )
}

export default EditorCount
