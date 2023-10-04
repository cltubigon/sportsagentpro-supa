import { Flex, Text } from "@chakra-ui/react"
import "react-quill/dist/quill.snow.css" // Import Quill styles

function DisplayQuillContent({ quillContent, displayTo }) {
  return (
    <Flex w={"100%"}>
      <Text
        noOfLines={displayTo === "Cards" && [1, 2]}
        fontSize={"md"}
        className="displayedText"
        dangerouslySetInnerHTML={{ __html: quillContent }}
      ></Text>
    </Flex>
  )
}

export default DisplayQuillContent
