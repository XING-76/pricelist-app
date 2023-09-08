import { MainSaga } from './containers/AgeGroupPriceList/model/saga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
    yield all([MainSaga()]);
}

export default rootSaga;
