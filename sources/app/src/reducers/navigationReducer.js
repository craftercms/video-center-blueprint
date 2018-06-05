export default function reducer(state={
    nav: null,
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "GET_NAV": {
            return {...state, fetching: true}
        }
        case "GET_NAV_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                nav: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }

    return state;
}
