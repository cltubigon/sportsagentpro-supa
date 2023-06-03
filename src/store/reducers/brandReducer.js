const initialState = {
    brands: [],
  }
  
  const brandReducer = (state = initialState, action) => {
      switch (action.type) {
          case "SAVE_BRAND_TO_STORAGE":
            console.log('SAVE_BRAND_TO_STORAGE: ', action.payload)
            return {
              ...state,
              brands: action.payload,
            }
          default:
            return state
          }
  }
  
  export default brandReducer