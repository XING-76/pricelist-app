// import { PayloadAction } from '@reduxjs/toolkit';

export const ReduxResponseColumns = {
    PAYLOAD: 'payload',
};

export const sendPayloadObject = (columnName) => (state, action) => {
    return {
        ...state,
        [columnName]: action.payload,
    };
};
