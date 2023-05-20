import { SearchIcon } from "@chakra-ui/icons"
import {
  Grid,
  GridItem,
  Button,
  Flex,
  Icon,
  InputGroup,
  Text,
  InputLeftElement,
  Input,
  Box,
  Textarea,
} from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { TfiClose, TfiMenuAlt } from "react-icons/tfi"
import { RxDashboard } from "react-icons/rx"
import { setActiveStep } from "../../store/actions/PostActions"
import { useForm } from "react-hook-form"
import { Form } from "react-router-dom"

const DetailsV1 = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState } = useForm()
  const { errors } = formState

  const onSubmit = (data) => {
    console.log("data: ", data)
  }

  const inputStyles = {
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
      <Grid
        templateAreas={`"header"
                            "main"
                            "footer"`}
        gridTemplateRows={"2fr 9fr auto"}
        gridTemplateColumns={"1fr"}
        h="100vh"
      >
        {/* -------------------------------------- Menu section -------------------------------------- */}
        <GridItem area={"header"} pb={4}>
          <Flex
            px={20}
            flexGrow={1}
            alignItems={"center"}
            borderBottom={"2px solid #EBEFF2"}
          >
            <Flex flexGrow={1} flexDirection={"column"} py={4}>
              <Text fontSize={"xl"} fontWeight={"semibold"}>
                Details
              </Text>
              <Text color={"gray.500"} fontSize={"sm"}>
                Add information about your deal that will be shared with
                recipients
              </Text>
            </Flex>
            <Flex>
              <Icon as={TfiClose} boxSize={4} />
            </Flex>
          </Flex>
        </GridItem>

        {/* -------------------------------------- Content section -------------------------------------- */}
        <GridItem
          pl={"80px"}
          pr={"65px"}
          area={"main"}
          overflowY={"auto"}
          position={"relative"}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box>
              <Flex>
                <Text color={"red"}>*</Text>
                <Text sx={inputLabels}>Offer name</Text>
              </Flex>
              <Text sx={inputLabelDescriptions}>
                Choose something clear and concise, but make it memorable!
              </Text>
              <Input
                sx={inputStyles}
                id="offer"
                placeholder="Enter offer name"
                {...register("offer")}
              />
            </Box>

            <Box>
              <Flex>
                <Text color={"red"}>*</Text>
                <Text sx={inputLabels}>Brief</Text>
              </Flex>
              <Text sx={inputLabelDescriptions}>
                Provide a brief background of your business, the purpose of your
                campaign, and clear step-by-step instructions for how to
                complete each activity in the deal.
              </Text>
              <Textarea
                sx={inputStyles}
                id="brief"
                placeholder="Create your deal brief here using the instructions above"
                {...register("brief")}
              />
            </Box>
          </form>
        </GridItem>

        {/* -------------------------------------- Footer Section -------------------------------------- */}
        <GridItem px={20} pt={4} pb={6} area={"footer"}>
          <Flex justifyContent={"space-between"} bottom={"0"}>
            <Button
              leftIcon={<BsChevronLeft />}
              onClick={() => dispatch(setActiveStep("activities"))}
            >
              Previous Step
            </Button>
            <Button
              rightIcon={<BsChevronRight />}
              colorScheme="twitter"
              onClick={() => dispatch(setActiveStep("review"))}
            >
              Next Step
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default DetailsV1
