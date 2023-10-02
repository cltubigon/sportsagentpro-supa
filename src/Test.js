import { Flex, Text } from "@chakra-ui/react"
import { useGetPostsQuery, useGetUsersQuery } from "./store/supabaseAPI"

const Test = () => {
  const { data, isLoading, isError } = useGetUsersQuery()
  console.log("isLoading: ", isLoading)
  console.log("isError: ", isError)
  console.log("data: ", data)

  return (
    <Flex pt={"120px"} flexDirection={"column"}>
      {isLoading && <Text>Loading posts...</Text>}
      {isError && <Text>Error loading posts.</Text>}
    </Flex>
  )
}

export default Test