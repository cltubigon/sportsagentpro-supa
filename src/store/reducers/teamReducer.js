const initState = {
    teams: [
        {id: '1', team: 'Golden State', location: 'United States', totalMembers: '15'},
        {id: '2', team: 'Bucks', location: 'United States', totalMembers: '14'},
        {id: '3', team: 'Lakers', location: 'United States', totalMembers: '16'}
      ]
}

const teamReducer = (state = initState, action) => {
    return state
}

export default teamReducer