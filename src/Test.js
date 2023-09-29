import { Button, Flex, Text } from "@chakra-ui/react"
import supabase from "./config/supabaseClient"

const Test = () => {
  const userId = "36ebb6f4-6cd7-42bf-88b6-3d0a84a47589"
  const fieldToInsert = '22'

  const handleClick = async () => {
    const { data, error } = await supabase
      .from("posts")
      .insert({ ownerUID: userId, totalPayment: fieldToInsert })
      .select()
    if (data[0]) {
      console.log("data[0]: ", data[0])
    } else if (error) {
      console.log("error: ", error)
    }
  }
  return (
    <Flex pt={"120px"} flexDirection={"column"}>
      <Button onClick={handleClick}>Send</Button>
      <Text>Data: {JSON.stringify(fieldToInsert)}</Text>
      <Text>userId: {userId}</Text>
    </Flex>
  )
}

export default Test