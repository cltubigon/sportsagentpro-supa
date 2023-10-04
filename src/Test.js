import { Flex } from "@chakra-ui/react"
import DisplayQuillContent from "./components/RichTextEditor/ReactQuill/DisplayQuillContent"
import { useSelector } from "react-redux"
import QuillEditor from "./components/RichTextEditor/ReactQuill/QuillEditor"

const Test = () => {
  console.log("test rendered")
  const newValue = useSelector((state) => state.post.quilData)
  console.log({ newValue })
  return (
    <Flex pt={"120px"} flexDirection={"column"} px={"80px"}>
      {/* <LexicalEditor /> */}
      <QuillEditor />
      <Flex mt={"40px"}>
        <DisplayQuillContent quillContent={newValue} />
      </Flex>
    </Flex>
  )
}

export default Test
