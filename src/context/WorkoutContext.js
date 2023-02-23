import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

//reducer function
//action has type and payload property
//action is the object that's being passed to the dispatch function
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUT" :
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter((workout)=> workout._id !== action.payload._id)
            }
        default:
            return state
            }
}

//this custom context provider is going to wrap the componenet where we want to upadate the local state using the value object 
export const WorkoutsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}