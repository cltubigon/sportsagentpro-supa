/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Flex } from "@chakra-ui/react"
import { useEffect } from "react"

const UsePageNumbers = ({ props }) => {
  const { count, pageNumber, setpageNumber } = props

  const pageNumberStyles = {
    px: "15px",
    py: "14px",
    boxShadow: "sm",
    border: "1px",
    borderColor: "gray.200",
    borderStyle: "solid",
    fontSize: "18px",
    fontWeight: "md",
    cursor: "default",
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('timout tirggered')
      window.scrollTo(0, 0)
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [pageNumber])

  return (
    <Flex
      mt={"40px"}
      mb={"20px"}
      w={{ sph: "100%", slt: "660px", llt: "998px", sdt: "985px", ldt: "98%" }}
      overflowX={"hidden"}
    >
      <Flex gap={1} w={"100%"}>
        <Button
          sx={pageNumberStyles}
          onClick={() => setpageNumber(pageNumber - 1)}
          w={"50%"}
          colorScheme={pageNumber === 1 ? "gray" : "twitter"}
          pointerEvents={pageNumber === 1 && "none"}
          color={"white"}
        >
          Previous Page
        </Button>
        <Button
          sx={pageNumberStyles}
          onClick={() => setpageNumber(pageNumber + 1)}
          w={"50%"}
          colorScheme={"twitter"}
          pointerEvents={count === pageNumber && "none"}
          bgColor={count === pageNumber && "gray.300"}
          _hover={count === pageNumber && {bgColor: "gray.300"}}
          color={"white"}
        >
          Next Page
        </Button>
      </Flex>
    </Flex>
  )
}

export default UsePageNumbers
