import { createSlice } from '@reduxjs/toolkit';
import {
    ReduxResponseColumns,
    sendPayloadObject,
} from '../../../utils/reduxUtils';
import { initialState } from './data';

export const slice = createSlice({
    name: 'mainPage',
    initialState,
    reducers: {
        FETCH_ACTION: sendPayloadObject(ReduxResponseColumns.PAYLOAD),
        FETCH_ITEM_FIELD: sendPayloadObject(ReduxResponseColumns.PAYLOAD),
        SET_LIST_FIELD: sendPayloadObject('ageGroupPriceListField'),
        SET_OVERLAP_ERROR: sendPayloadObject('overlapError'),
        SET_BLANK_ERROR: sendPayloadObject('blankError'),
        SET_INCLUDE_ALL: sendPayloadObject('includeAll'),
        SET_VALID_OPTIONS: sendPayloadObject('validOptions'),
        SET_API_RESPONSE: sendPayloadObject('apiResponse'),
    },
});

export const {
    FETCH_ACTION,
    FETCH_ITEM_FIELD,
    SET_LIST_FIELD,
    SET_OVERLAP_ERROR,
    SET_BLANK_ERROR,
    SET_INCLUDE_ALL,
    SET_VALID_OPTIONS,
    SET_API_RESPONSE,
} = slice.actions;

export default slice.reducer;
