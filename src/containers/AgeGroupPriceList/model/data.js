import { nanoid } from 'nanoid';

export const AgeGroupPriceItem = {
    itemId: nanoid(),
    price: 0,
    ageGroup: [0, 20],
    startAge: [0, 20],
    endAge: [0, 20],
};

export const AgeGroupPriceListField = [{ ...AgeGroupPriceItem }];

export const ApiResponse = {
    type: '',
    // code: 0,
    // dataId: '',
    data: {},
    // mode: 'view'
};

export const initialState = {
    ageGroupPriceListField: AgeGroupPriceListField,
    overlapError: false,
    blankError: false,
    includeAll: false,
    apiResponse: ApiResponse,
};
