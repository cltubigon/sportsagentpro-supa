const initState = {
    athletes: [
        // {id: '1', athlete: 'Golden State', location: 'United States', totalMembers: '15'},
        // {id: '2', athlete: 'Bucks', location: 'United States', totalMembers: '14'},
        // {id: '3', athlete: 'Lakers', location: 'United States', totalMembers: '16'}
      ]
}

const athleteReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_ATHLETE":
            console.log('created a athlete: ', action.athlete)
            return state
        case 'CREATE_ATHLETE_ERROR':
            console.log('create project error', action.err)
            return state
        default:
            return state
    }
}

export default athleteReducer