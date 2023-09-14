import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_CURRENT_PAGE, SET_IS_LOADING } from "../store/actions/utilsActions"
import { Flex, Text } from "@chakra-ui/react"
import { useEffect } from "react"

const Pagination = () => {
  const dispatch = useDispatch()
  const { currentPage, itemsPerPage, totalItems } = useSelector(
    (state) => state.utils.pagination
  )

  const handlePageClick = (newPage) => {
    dispatch(SET_IS_LOADING(true))
    dispatch(SET_CURRENT_PAGE(newPage))
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <Flex gap={4} w={'100%'} justifyContent={'center'} my={'40px'}>
      {pageNumbers.map((page) => (
        <Flex key={page} onClick={() => handlePageClick(page)} w={'25px'} h={'35px'} bgColor={currentPage === page ? 'blue.300' : 'gray.200'} justifyContent={'center'} alignItems={'center'} boxShadow={'xl'} borderRadius={'sm'} border={'1px solid #cccccc'} >
          <Text cursor={'default'} color={currentPage === page ? 'white' : 'black'} >{page}</Text>
        </Flex>
      ))}
    </Flex>
  )
}

export default Pagination
