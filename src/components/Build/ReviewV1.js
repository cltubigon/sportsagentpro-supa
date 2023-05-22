import {
  Grid,
  GridItem,
  Button,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { BsChevronLeft, BsChevronRight, BsPlus } from "react-icons/bs"
import { TfiClose, TfiMenuAlt } from "react-icons/tfi"
import { setActiveStep, setContent } from "../../store/actions/PostActions"
import { Editor, EditorState, convertFromRaw } from "draft-js"
import { useState } from "react"
import { useEffect } from "react"

const ReviewV1 = () => {
  const dispatch = useDispatch()
  const reduxPosts = useSelector((state) => state.post)
  const { postContent } = reduxPosts
  
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
    
  useEffect(()=> {
    if (postContent) {
        const rawDataParsed = postContent && JSON.parse(postContent)
        console.log('rawDataParsed: ', rawDataParsed)
        const contentState = convertFromRaw(rawDataParsed)
        setEditorState(EditorState.createWithContent(contentState))
    }
  }, [postContent])
  

  return (
    <>
      <Grid
        templateAreas={`"header"
                            "main"
                            "footer"`}
        gridTemplateRows={"auto 9fr auto"}
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
          px={"80px"}
          py={2}
          area={"main"}
          overflowY={"auto"}
          position={"relative"}
        >
          <Flex>
            <Text>Deal type</Text>
            <Text>Edit</Text>
          </Flex>

            {/* <Editor editorState={editorState} readOnly /> */}
        </GridItem>

        {/* -------------------------------------- Footer Section -------------------------------------- */}
        <GridItem px={20} pt={4} pb={6} area={"footer"}>
          <Flex justifyContent={"space-between"} bottom={"0"}>
            <Button
              leftIcon={<BsChevronLeft />}
              onClick={() => dispatch(setActiveStep("details"))}
            >
              Previous Step
            </Button>
            <Button
              rightIcon={<BsChevronRight />}
              colorScheme="twitter"
              onClick={() => dispatch(setActiveStep("payment"))}
            >
              Next Step
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default ReviewV1