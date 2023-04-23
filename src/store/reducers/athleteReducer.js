const initState = {
    athletes: []
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


// const initState = {
//     athletes: []
// }

// const athleteReducer = (state = initState, action) => {
//     switch (action.type) {
//         case "CREATE_ATHLETE":
//             console.log('created a athlete: ', action.athlete)
//             return state
//         case 'CREATE_ATHLETE_ERROR':
//             console.log('create project error', action.err)
//             return state
//         default:
//             return state
//     }
// }

// export default athleteReducer