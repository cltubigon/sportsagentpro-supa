/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react"
import imageHolderRemovable from "../../../assets/images/imageHolderRemovable.png"
import { FaCircle } from "react-icons/fa"
import { BsHeart, BsLink45Deg } from "react-icons/bs"
import { Link } from "react-router-dom"
import React from "react"
import DeletePopup from "./DeletePopup"
import { Editor, EditorState, convertFromRaw } from "draft-js"
import DisplayQuillContent from "../../RichTextEditor/ReactQuill/DisplayQuillContent"

const CardBrandMemo = ({ post }) => {
    const {
        totalAmount,
        postTitle,
        postContent,
        postOwnerFirstName,
        postOwnerLastName,
        selectedActivities,
        postExpirationDate,
        id,
      } = post

      const formatter = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      const formattedAmount = formatter.format(parseFloat(totalAmount))

      // const rawDataParsed = postContent && postContent
      // const contentState = convertFromRaw(rawDataParsed)
      // const editorState = EditorState.createWithContent(contentState)

      const handleDelete = (post) => {
        // setDeleting(post.id)
        // dispatch(DELETE_POST(post.id))
      }

      const btnStyle = {
        colorScheme: "gray",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "sm",
      }
return (
    <>
        <Flex
          key={id}
          flexDirection={"column"}
          borderColor={"gray.200"}
          borderWidth={"1px"}
          borderStyle={"solid"}
          borderRadius={"md"}
          w={"320px"}
          h={"428px"}
          position={"relative"}
        >
          <Flex
            gap={2}
            // w={"310px"}
            bgColor={"gray.100"}
            p={4}
            borderRadius={"md"}
          >
            <Image
              src={imageHolderRemovable}
              maxW={"46px"}
              bgColor={"red"}
              alt="Dan Abramov"
              borderColor={"gray.300"}
              borderWidth={"1px"}
              borderStyle={"solid"}
              borderRadius={"sm"}
            />
            <Flex flexDirection={"column"}>
              <Text fontSize={"lg"} fontWeight={"semibold"}>
                {postOwnerFirstName} {postOwnerLastName}
              </Text>
              <Flex alignItems={"center"} gap={3}>
                <Text fontSize={"sm"}>Draft</Text>
                <Icon as={FaCircle} color={"blue.400"} boxSize={2} />
              </Flex>
            </Flex>
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={2}
              ml={"auto"}
            >
              <Icon as={BsHeart} boxSize={4} />
              <Icon as={BsLink45Deg} boxSize={6} />
            </Flex>
          </Flex>
          <Flex flexDirection={"column"} p={4} gap={1}>
            <Text fontWeight={"semibold"} maxW={"190px"}>
              {postTitle}
            </Text>
            <Box noOfLines={[1, 2]} mb={4} color={"gray.500"}>
              {/* <Editor editorState={editorState} readOnly /> */}
              <DisplayQuillContent quillContent={postContent} displayTo={'Cards'} />
            </Box>
            <Flex gap={2} flexWrap={"wrap"}>
              <Text color={"gray.500"}>Activities:</Text>
              <Text fontWeight={"semibold"} maxW={"190px"}>
                {selectedActivities[0].activityTitle} +
                {selectedActivities.length}
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text color={"gray.500"}>Total:</Text>
              <Text fontWeight={"semibold"}>${formattedAmount}</Text>
            </Flex>
            <Flex gap={2}>
              <Text color={"gray.500"}>Expires:</Text>
              <Text fontWeight={"semibold"}>
                {(postExpirationDate.utcFormat !== "Invalid Date" &&
                  postExpirationDate.utcFormat) ||
                  "-"}
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text color={"gray.500"}>Tags:</Text>
              <Text fontWeight={"semibold"}>-</Text>
            </Flex>
          </Flex>
          <Flex
            justifyContent={"center"}
            gap={2}
            px={4}
            position={"absolute"}
            bottom={4}
            w={"100%"}
          >
            <Link to={`/build/${id}`} style={{ width: "100%" }}>
              <Button sx={btnStyle} borderColor="gray.400" w={"100%"}>
                Edit
              </Button>
            </Link>
            <DeletePopup handleDelete={handleDelete} post={post} />
          </Flex>
        </Flex>
    </>
)
}

const CardBrand = React.memo(CardBrandMemo)

export default CardBrand
