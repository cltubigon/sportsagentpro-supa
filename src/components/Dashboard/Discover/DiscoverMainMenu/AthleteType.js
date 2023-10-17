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
import { SearchIcon } from "@chakra-ui/icons"
import FilterBrandCategories from "../FilterBrandCategories"

const AthleteType = () => {
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
        <Flex gap={6} flexGrow={1} alignItems={'center'} justifyContent={'flex-end'} >
          <Flex>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input placeholder="Search..." minW={"320px"} />
            </InputGroup>
          </Flex>
          <Text>Clear filters</Text>
          <Flex gap={2}>
            <Icon as={BiDonateHeart} sx={icon} />
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              My saved lists
            </Text>
          </Flex>
          <FilterBrandCategories />
        </Flex>
      </Flex>
    </>
  )
}

export default AthleteType
