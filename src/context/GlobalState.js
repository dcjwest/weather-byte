import React, { createContext, useReducer, useCallback } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    currently: {}, hourly: [], daily: [], units: 'cel'
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

    const updateWeather = data => {
        dispatch({
            type: 'UPDATE_WEATHER',
            payload: data
        });
    }

    const switchUnits = units => {
        dispatch({
            type: 'SWITCH_UNITS',
            payload: units
        });
    }

    return (
        <GlobalContext.Provider value={{
            currently: state.currently,
            hourly: state.hourly,
            daily: state.daily,
            units: state.units,
            setInitialWeather,
            updateWeather,
            switchUnits
        }}>
            {children}
        </GlobalContext.Provider>
    );
}