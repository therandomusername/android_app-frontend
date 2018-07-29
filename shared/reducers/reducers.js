export function markers(state = [], action) {
    console.log('redM')
    switch (action.type) {
        case 'GET_MARKERS':
            return action.payload;
            break;
        case 'ADD_MARKER':
            return [...state, action.payload];
            break;
        case 'REMOVE_MARKER':
            return state.filter(e => e.id === action.payload);
            break;
        default:
            return state;
    }
}

export function routes(state = [], action) {
    switch (action.type) {
        case 'GET_ROUTES':
            return action.payload;
            break;
        case 'ADD_ROUTE':
            return [...state, action.payload];
            break;
        case 'REMOVE_ROUTE':
            return state.filter(e => e.id === action.payload);
            break;
        default:
            return state;
    }
}

export function userInfo(state = null, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.payload;
            break;
        case 'RESET_TOKEN':
            return null;
            break;
        default:
            return state;
    }
}

export function getOthers(state = true, action) {
    switch(action.type) {
        case 'SET_GET_OTHERS':
            return action.payload;
        default:
            return state;
    }
}