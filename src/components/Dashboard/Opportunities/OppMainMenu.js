import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react"
import { BiDonateHeart } from "react-icons/bi"
import { SearchIcon } from "@chakra-ui/icons"
import OppSort from "./OppSort"
import OppFilter from "./OppFilter"
import { ImNewspaper } from "react-icons/im"

const OppMainMenu = () => {
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
        <Flex flexDirection={"column"}>
          <Text fontSize={"md"} fontWeight={"semibold"}>
            Opportunities
          </Text>
          <Text fontSize={"10px"}>Explore and apply</Text>
        </Flex>
        <Flex gap={6} alignItems={"center"}>
          <Flex gap={2}>
            <Icon as={ImNewspaper} sx={icon} />
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              My applications
            </Text>
          </Flex>
          <Flex gap={2}>
            <Icon as={BiDonateHeart} sx={icon} />
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              My saved list
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
          <OppFilter />
          <OppSort />
        </Flex>
      </Flex>
    </>
  )
}

export default OppMainMenu
