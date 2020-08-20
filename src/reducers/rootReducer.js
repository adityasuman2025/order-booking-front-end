const initState = {
    products: { "error": 0, "data": [], "total_items": 0 },
    cities: { "error": 0, "data": [] },
}

const rootReducer = ( state = initState, action ) => {
    const { type, payload } = action
    switch(type) {
        case 'GET_PRODUCTS': return { ...state, products: payload }
        case 'GET_CITIES': return { ...state, cities: payload }
        default: return state
    }

    return state;
}

export default rootReducer;