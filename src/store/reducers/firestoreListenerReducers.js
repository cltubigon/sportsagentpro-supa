const initialState = {
  athlete: {
    data: null,
    lastUpdated: null,
  }
}

const firestoreListenerReducers = (state = initialState, action) => {
  switch (action.type) {
    case "DOCUMENT_UPDATED":
      return {
        ...state,
        [action.payload.collectionName]: {
          ...state[action.payload.collectionName],
          [action.payload.documentId]: action.payload.updatedData,
        },
      }
    case "COLLECTION_UPDATED":
      console.log('collection is updated')
      return {
        ...state,
        [action.collectionName]: {data: action.updatedData, lastUpdated: action.timestamp}
      }
    case "QUERY_SNAPSHOT_UPDATED":
      return {
        ...state,
        [action.payload.collectionName]: action.payload.updatedData,
      }
    default:
      return state
  }
}

export default firestoreListenerReducers