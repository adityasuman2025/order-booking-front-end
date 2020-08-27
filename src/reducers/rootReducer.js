const initState = {
    products: { "error": 0, "data": [], "total_items": 0 },
    cities: { "error": 0, "data": [] },
    ordersByCity: { "error": 0, "data": [], "total_items": 0 },
    ordersByCityList: { "error": 0, "data": [] },
    todaysCitiesOrders: { "error": 0, "data": [] },
    weeklyCitiesOrders: { "error": 0, "data": [] },
}

const rootReducer = ( state = initState, action ) => {
    const { type, payload } = action
    switch(type) {
        case 'GET_PRODUCTS': return { ...state, products: payload }
        case 'GET_CITIES': return { ...state, cities: payload }
        case 'GET_ORDERS_BY_CITY': return { ...state, ordersByCity: payload }
        case 'GET_ORDERS_BY_CITY_lIST': return { ...state, ordersByCityList: payload }
        case 'GET_TODAYS_CITIES_ORDERS': return { ...state, todaysCitiesOrders: payload }
        case 'GET_WEEKLY_CITIES_ORDERS': return { ...state, weeklyCitiesOrders: payload }

        default: return state
    }
}

export default rootReducer;