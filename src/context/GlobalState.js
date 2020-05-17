import React, { createContext, useReducer, useCallback } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    currently: {}, hourly: [], daily: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions //
    /* Initialise app with data from Dark Sky API.
        Function is placed in useCallback because it's ultimately called within a useEffect hook. */
    const setInitialWeather = useCallback(data => {
        dispatch({
            type: 'SET_INITIAL_WEATHER',
            payload: data
        });
    }, []);

    return (
        <GlobalContext.Provider value={{
            currently: state.currently,
            hourly: state.hourly,
            daily: state.daily,
            setInitialWeather
        }}>
            {children}
        </GlobalContext.Provider>
    );
}