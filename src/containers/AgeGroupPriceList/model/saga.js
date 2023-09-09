import { getValideResult, getValideInput } from '../service/dataProcessing';
import { put, takeEvery } from 'redux-saga/effects';
import {
    FETCH_VALIDATE,
    FETCH_ACTION,
    FETCH_ITEM_FIELD,
    SET_LIST_FIELD,
    SET_OVERLAP_ERROR,
    SET_INCLUDE_ALL,
    SET_VALID_OPTIONS,
    SET_API_RESPONSE,
} from './index';

function* fetchValidate(action) {
    try {
        const data = action.payload;

        const convertedData = getValideInput(data);

        const { overlapError, includeAll } = getValideResult(convertedData);

        yield put(SET_OVERLAP_ERROR(overlapError));
        yield put(SET_INCLUDE_ALL(includeAll));
    } catch (error) {
        console.error(error);
    }
}

function* fetchAction(action) {
    try {
        const { data, type } = action.payload;

        const convertedData = getValideInput(data);

        const { overlapError, notInclude, includeAll } =
            getValideResult(convertedData);

        yield put(SET_OVERLAP_ERROR(overlapError));
        yield put(SET_INCLUDE_ALL(includeAll));

        yield put(SET_VALID_OPTIONS(notInclude));

        if (type === 'add')
            yield put(SET_API_RESPONSE({ data: notInclude, type }));
        if (type === 'delete')
            yield put(SET_API_RESPONSE({ data: data, type }));
    } catch (error) {
        console.error(error);
    }
}

function* fetchItemField(action) {
    try {
        const data = action.payload;

        const convertedData = getValideInput(data);

        const { overlapError, includeAll } = getValideResult(convertedData);

        yield put(SET_OVERLAP_ERROR(overlapError));
        yield put(SET_INCLUDE_ALL(includeAll));

        yield put(SET_LIST_FIELD(data));
    } catch (error) {
        console.error(error);
    }
}

function* MainSaga() {
    yield takeEvery(FETCH_VALIDATE, fetchValidate);
    yield takeEvery(FETCH_ACTION, fetchAction);
    yield takeEvery(FETCH_ITEM_FIELD, fetchItemField);
}

export { MainSaga };
