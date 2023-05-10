import { Text, Flex, Box, CloseButton, Icon } from "@chakra-ui/react"

const PostTypeNav = () => {
  const navContainerStyle = {
    justifyContent: 'space-between',
    flexGrow: 1,
    py: 5,
    px: 20,
    borderBottom: '2px solid #EBEFF2',
  }
  return (
    <>
      <Flex sx={navContainerStyle}>
        <Box>
          <Text fontSize={"xl"} fontWeight={"semibold"}>
            Deal type
          </Text>
          <Text fontSize={"sm"} color={"gray.500"}>
            Select what type of deal you will be building out
          </Text>
        </Box>

        <Flex alignItems={"center"}>
          <Icon as={CloseButton} />
        </Flex>
      </Flex>
    </>
  )
}

export default PostTypeNav