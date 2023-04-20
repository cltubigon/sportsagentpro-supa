import { Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'

const ProfileGallery = () => {
    const flexLogoStyle = {
        alignItems: "center",
        color: "gray.200",
        justifyContent: "center",
        w: "50px",
        h: "50px",
        fontSize: "2xl",
        bg: "gray.500",
        borderRadius: "100px"
      }
      const teamNameStyle = {
        alignItems: "center",
        ml: "15px",
        fontSize: "md",
        lineHeight: "1.4em",
      }
      const teamContainerStyle = {
        p: "30px",
        border: "1px solid #cdcdcd",
        borderRadius: "8px",
        minHeight: "62px",
        alignItems: "flex-center",
      }
      const flexContainer = {
        px: "var(--chakra-space-4)",
        py: "1em",
      }
  return (
    <Flex gap={2} boxSizing='border-box' alignItems={"center"} justifyContent={"space-between"} px={"var(--chakra-space-4)"} >
        <Flex><Image w={"100%"} src='https://bit.ly/dan-abramov' alt='Dan Abramov' /></Flex>
        <Flex><Image w={"100%"} src='https://bit.ly/dan-abramov' alt='Dan Abramov' /></Flex>
        <Flex><Image w={"100%"} src='https://bit.ly/dan-abramov' alt='Dan Abramov' /></Flex>
        <Flex><Image w={"100%"} src='https://bit.ly/dan-abramov' alt='Dan Abramov' /></Flex>
        <Flex><Image w={"100%"} src='https://bit.ly/dan-abramov' alt='Dan Abramov' /></Flex>
    </Flex>
  )
}

export default ProfileGallery
