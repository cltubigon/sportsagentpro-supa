import { Button, Flex, Icon, Input } from "@chakra-ui/react"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { VscCopy } from "react-icons/vsc"
import { useSelector } from "react-redux"
const ShareProfile = () => {
  const [hasCopied, sethasCopied] = useState(false)
  const userID = useSelector(state => state.auth.user.userID)

  const onCopy = () => {
    navigator.clipboard.writeText(`${window.location.href}/${userID}`)
    sethasCopied(true)
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      sethasCopied(false)
    }, 1500)
    return () => {
      clearTimeout(timeout)
    }
  }, [hasCopied])
  return (
    <Flex>
      <Input fontSize={"sm"} value={`${window.location.href}/${userID}`} mr={2} readOnly={true} color={'gray.500'} />
      <Button onClick={onCopy}>
        {hasCopied ? (
          "Copied!"
        ) : (
          <Icon
            as={VscCopy}
            boxSize={5}
            border={"1px solid gray"}
            borderRadius={"md"}
            p={1}
            w={"30px"}
            h={"30px"}
          />
        )}
      </Button>
    </Flex>
  )
}

export default ShareProfile
