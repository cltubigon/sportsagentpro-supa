import { Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { BsCardText, BsEye, BsFolder2Open, BsMegaphone, BsPencil, BsPersonBadge } from 'react-icons/bs'

const ProfileContentRight = () => {
    const boxedItems = {
        border: "1px solid #E7EAEC",
        px: "var(--chakra-space-3)",
        py: "var(--chakra-space-2)",
        borderRadius: "md",
        flexDirection: "row",
        justifyContent: "space-between",
    }
    const boxItemsIcons = {
        boxSize: "36px",
        borderRadius: "100px",
        bgColor: "gray.200",
        justifyContent: "center",
        alignItems: "center",
        // p: "3px",
    }
  return (
    <>
        <Stack mt={"0px !important"} gap={5} w={{base:'100%', md:"45%" }} maxWidth={{base:'100%', md:"418px" }} >
            <Stack border={"1px solid #D0D4D9"} px={'var(--chakra-space-4)'} py={'var(--chakra-space-6)'} borderRadius={"md"} >
                <Text fontSize={"larger"} fontWeight={"semibold"} >For personal use</Text>

                <Text fontSize={"lg"} fontWeight={"semibold"} color={"gray.500"} pb={"10px"} >Frequently purchased</Text>

                <Flex sx={boxedItems}>
                    <Flex gap={2} alignItems={"center"} grow={1}>
                        <Flex sx={boxItemsIcons} ><Icon as={BsMegaphone}/></Flex>
                        <Stack flexGrow={1}>
                            <Flex justifyContent={"space-between"}>
                                <Text>Shoutout</Text>
                                <Text fontWeight={"semibold"} fontSize={"md"}>$49+</Text>
                            </Flex>
                            <Text mt={"0 !important"} fontSize={"sm"} color={"gray.600"} >Deandre will record a video for you</Text>
                        </Stack>
                    </Flex>
                </Flex>

                <Text fontSize={"lg"} fontWeight={"semibold"} color={"gray.500"} py={"10px"} >More options for family, friends, or yourself</Text>

                <Stack gap={2}>
                    <Flex sx={boxedItems}>
                        <Flex gap={2} alignItems={"center"} grow={1}>
                            <Flex sx={boxItemsIcons}><Icon as={BsCardText} /></Flex>
                            <Stack flexGrow={1}>
                                <Flex justifyContent={"space-between"}>
                                    <Text>Post</Text>
                                    <Text fontWeight={"semibold"} fontSize={"md"}>$48+</Text>
                                </Flex>
                                <Text mt={"0 !important"} fontSize={"sm"} color={"gray.600"} >Deandre will post on social media for you</Text>
                            </Stack>
                        </Flex>
                    </Flex>

                    <Flex sx={boxedItems}>
                        <Flex gap={2} alignItems={"center"} grow={1}>
                            <Flex sx={boxItemsIcons}><Icon as={BsEye}/></Flex>
                            <Stack flexGrow={1}>
                                <Flex justifyContent={"space-between"}>
                                    <Text>Appearance</Text>
                                    <Text fontWeight={"semibold"} fontSize={"md"}>$102+</Text>
                                </Flex>
                                <Text mt={"0 !important"} fontSize={"sm"} color={"gray.600"} >Deandre will attend your practice or event</Text>
                            </Stack>
                        </Flex>
                    </Flex>

                    <Flex sx={boxedItems}>
                        <Flex gap={2} alignItems={"center"} grow={1}>
                            <Flex sx={boxItemsIcons} ><Icon as={BsPersonBadge}/></Flex>
                            <Stack flexGrow={1}>
                                <Flex justifyContent={"space-between"}>
                                    <Text>Authograph</Text>
                                    <Text fontWeight={"semibold"} fontSize={"md"}>$100+</Text>
                                </Flex>
                                <Text mt={"0 !important"} fontSize={"sm"} color={"gray.600"} >Deandre will sign something for you</Text>
                            </Stack>
                        </Flex>
                    </Flex>

                    <Flex sx={boxedItems}>
                        <Flex gap={2} alignItems={"center"} grow={1}>
                            <Flex sx={boxItemsIcons} ><Icon as={BsPencil}/></Flex>
                            <Stack flexGrow={1}>
                                <Flex justifyContent={"space-between"}>
                                    <Text>Pitch Anything</Text>
                                    <Text fontWeight={"semibold"} fontSize={"md"}>$50+</Text>
                                </Flex>
                                <Text mt={"0 !important"} fontSize={"sm"} color={"gray.600"} >Deandre will respond to your custom request</Text>
                            </Stack>
                        </Flex>
                    </Flex>
                </Stack>
            </Stack>

            <Stack border={"1px solid #D0D4D9"} px={'var(--chakra-space-4)'} py={'var(--chakra-space-6)'} borderRadius={"md"} >
                <Text fontSize={"larger"} fontWeight={"semibold"} >For brand or business use</Text>
                <Text fontSize={"sm"} color={"gray.500"} pb={"10px"} >Use our step-by-step deal builder to send offers or post opportunities for a marketing campaign</Text>
                    
                    <Flex sx={boxedItems}>
                        <Flex gap={2} alignItems={"center"} grow={1}>
                            <Flex sx={boxItemsIcons} ><Icon as={BsFolder2Open}/></Flex>
                            <Stack flexGrow={1}>
                                <Flex justifyContent={"space-between"}>
                                    <Text>Create offer or opportunity</Text>
                                </Flex>
                            </Stack>
                        </Flex>
                    </Flex>
            
            </Stack>
        </Stack>
    </>
  )
}

export default ProfileContentRight
