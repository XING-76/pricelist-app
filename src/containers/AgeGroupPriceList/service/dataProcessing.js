import NumberUtils from '../../../utils/numberUtils';
import ObjectUtils from '../../../utils/objectUtils';

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
 * 轉換資料 ageGroup
 * @param data
 * @returns
 */
export const getAgeGroupInput = (data) => {
    const newData = data.map((item) => {
        const { ageGroup } = item;

        return ageGroup;
    });

    return newData;
};

/**
 * 檢查資料 price
 * @returns
 */
export const getPriceValidResult = (data) => {
    let result = false;

    data.forEach((item) => {
        const { price } = item;

        result = !ObjectUtils.isValidValue(price);
    });

    return result;
};

/**
 * 印出資料
 * @param data
 * @returns
 */
export const getConsoleOutput = (data) => {
    const newData = data.map((item) => {
        const { ageGroup, price } = item;

        return { ageGroup, price };
    });

    return newData;
};
