export default (state, action) => {
    switch(action.type) {
        case 'SET_INITIAL_WEATHER':
            return {
                ...state,
                currently: action.payload.currently,
                hourly: action.payload.hourly.data.slice(0, 25),
                daily: action.payload.daily.data
            }
        case 'UPDATE_WEATHER':
            return {
                ...state,
                currently: action.payload.currently,
                hourly: action.payload.hourly.data.slice(0, 25),
                daily: action.payload.daily.data
            }
        case 'SWITCH_UNITS':
            return {
                ...state,
                units: action.payload
            }
        default:
            return state;
    }
}
