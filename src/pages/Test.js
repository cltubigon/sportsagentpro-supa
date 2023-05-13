import React from 'react'

const Test = () => {
    const state = {
        selectedRecipients: [],
      }
      
    const action = {
        data: {
          "phoneNumber": "16666666666",
          "lastName": "Green",
          "initials": "M G",
          "firstName": "Molly",
          "id": "ZpcBSK8g1ts6HN9UbA0X",
          "path": "athlete"
      },
    }

      const newState = {
        ...state,
        selectedRecipients: [...state.selectedRecipients, action.data],
      };
      
      console.log('action.data: ', action.data)
    //   console.log(newState);
  return (
    <div>
      
    </div>
  )
}

export default Test
