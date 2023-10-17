import {
    Flex,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
  } from "@chakra-ui/react"
  import { BiDonateHeart } from "react-icons/bi"
  import { FiUsers } from "react-icons/fi"
  import FilterProfile from "../FilterProfile"
  import FilterPreferences from "../FilterPrefences"
  import { SearchIcon } from "@chakra-ui/icons"
  import Sort from "../Sort"

const BrandType = () => {
    const container = {
      justifyContent: "space-between",
      grow: 1,
      flexBasis: "100%",
      borderBottom: "1px solid",
      borderBottomColor: "gray.300",
      pb: 6,
    }
    const icon = {
      boxSize: "20px",
      color: "gray.500",
    }
  return (
    <>
    <Flex sx={container}>
        <Stack>
          <Text fontSize={"20px"} fontWeight={"semibold"}>
            Discover Network
          </Text>
        </Stack>
        <Flex gap={6}>
          <Flex gap={2}>
            <Icon as={FiUsers} sx={icon} />
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              Interested in me
            </Text>
          </Flex>
          <Flex gap={2}>
            <Icon as={BiDonateHeart} sx={icon} />
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              My saved lists
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex justifyContent={"space-between"} pt={4}>
        <Flex>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input placeholder="Search..." minW={"320px"} />
          </InputGroup>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text>Clear filters</Text>
          <FilterProfile />
          <FilterPreferences />
          <Sort />
        </Flex>
      </Flex>
    </>
  )
}

export default BrandType
