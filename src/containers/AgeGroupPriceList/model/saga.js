import {
    getValideResult,
    getAgeGroupInput,
    getPriceValidResult,
    getConsoleOutput,
} from '../service/dataProcessing';
import { put, takeEvery } from 'redux-saga/effects';
import {
    FETCH_ACTION,
    FETCH_ITEM_FIELD,
    SET_LIST_FIELD,
    SET_OVERLAP_ERROR,
    SET_BLANK_ERROR,
    SET_INCLUDE_ALL,
    SET_VALID_OPTIONS,
    SET_API_RESPONSE,
} from './index';

function* fetchAction(action) {
    try {
        const { data, type } = action.payload;

        const convertedAgeGroupData = getAgeGroupInput(data);

        const blankError = getPriceValidResult(data);

        const { overlapError, notInclude, includeAll } = getValideResult(
            convertedAgeGroupData
        );

        // 印出資料
        const consoleData = getConsoleOutput(data);
        console.log(consoleData);

        yield put(SET_BLANK_ERROR(blankError));

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

        const convertedData = getAgeGroupInput(data);
        const { overlapError, includeAll } = getValideResult(convertedData);

        // 印出資料
        const consoleData = getConsoleOutput(data);
        console.log(consoleData);

        yield put(SET_OVERLAP_ERROR(overlapError));
        yield put(SET_INCLUDE_ALL(includeAll));
        yield put(SET_LIST_FIELD(data));
    } catch (error) {
        console.error(error);
    }
}

function* MainSaga() {
    yield takeEvery(FETCH_ACTION, fetchAction);
    yield takeEvery(FETCH_ITEM_FIELD, fetchItemField);
}

export { MainSaga };
