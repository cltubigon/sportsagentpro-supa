import { Heading, Text, Stack, Flex } from '@chakra-ui/layout'
import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Teams = ({teams}) => {
  return (
    <Flex gap={4}>
      {teams && teams.map((team)=> {
        return (
          <Stack w={"100%"} bg={"gray.300"} p={"20px"} border={"1px solid gray"} key={team.id}>
            <Heading as={"h4"} fontSize={"2xl"}>{team.team}</Heading>
            <Text>{team.location}</Text>
            <Text>Total members: {team.totalMembers}</Text>
          </Stack>
        )
      })}
    </Flex>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    teams: state.firestore.ordered.team
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'team'}
  ])
)(Teams)