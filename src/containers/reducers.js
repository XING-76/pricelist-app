import mainPage from './AgeGroupPriceList/model';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
    mainPage,
});

const rootReducer = (state, action) => {
    switch (action.type) {
        case 'LOGOUT': {
            return appReducer(undefined, action);
        }
        default:
            return appReducer(state, action);
    }
};

// export type storesType = ReturnType<typeof rootReducer>;
export default rootReducer;
