import NumberUtils from '../../../utils/numberUtils';

/**
 * 驗證
 * @param data
 * @returns
 */
export const getValideResult = (data) => {
    const { overlap, notInclude } = NumberUtils.getNumberIntervals(data);


    return {
        overlap,
        overlapError:
            overlap.length !== 0 || NumberUtils.getValidateArray(overlap),
        includeAll: notInclude.length === 0,
        notInclude: NumberUtils.getValidateIntervals(notInclude),
    };
};

/**
 * 轉換資料
 * @param data
 * @returns
 */
export const getValideInput = (data) => {
    const newData = data.map((item) => {
        const { ageGroup } = item;

        return ageGroup;
    });

    return newData;
};
