import React, { useReducer } from 'react'

const mainContext = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {

    default:
    return false
  }
}

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    duskClaimStatus: false
  })
  return (
    <mainContext.Provider value={{ state, dispatch }}>
      {props.children}
    </mainContext.Provider>
  )
}

export { reducer, mainContext, ContextProvider }
