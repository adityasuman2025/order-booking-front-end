const initState = {
    products: { "error": 0, "data": [], "total_items": 0 },
    cities: { "error": 0, "data": [] },
    ordersByCity: { "error": 0, "data": [], "total_items": 0  },
}

const rootReducer = ( state = initState, action ) => {
    const { type, payload } = action
    switch(type) {
        case 'GET_PRODUCTS': return { ...state, products: payload }
        case 'GET_CITIES': return { ...state, cities: payload }
        case 'GET_ORDERS_BY_CITY': return { ...state, ordersByCity: payload }
        default: return state
    }
}

export default rootReducer;