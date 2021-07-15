import React, { useEffect, useState } from 'react'

const useInitialState = state => {
    const [initialState, setInitialState] = useState(state)
    //  useEffect(() => {
    //      setInitialState(state)
    //  }, [])
    return [initialState, setInitialState]
}
export default useInitialState
