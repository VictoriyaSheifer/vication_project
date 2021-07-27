
const initialState = {
    loged_in_user : -1,
    is_a_meneger : false,
    vacations:[{}],
};




function rootReducer(state = initialState, action) {
    // console.log("Root : ", action, state)

    switch (action.type) {
        case 'updateLogedInUser':
            state = { ...state, loged_in_user: action.payload }
            break;
        case 'isAManeger':
            state = { ...state, is_a_meneger: action.payload }
            break;
        case 'updateVacations':
            state = { ...state, vacations: action.payload }
            break;
        default : break;
    }
    return state;
}

export default rootReducer;