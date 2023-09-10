class NumberUtils {
    /**
     * 加上千分位
     * @param numberStr
     * @returns
     */
    static getThousandFormat = (numberStr) => {
        const parts = numberStr.split('.');

        // 將整數部分添加千分位分隔符
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        const formattedNumber = parts.join('.');

        return formattedNumber;
    };

    /**
     * 允許負數
     * @param numberStr
     * @returns
     */
    static getPreNumber = (numberStr) => {
        return numberStr.replace(/^(-)?0+(?!\.|$)/, '$1');
    };

    /**
     * 移除非數字、小數點和負號的字符
     * @param numberStr
     * @returns
     */
    static getNumber = (numberStr) => {
        return numberStr.replace(/[^0-9.]/g, '');
    };

    /**
     * 計算業務邏輯重疊與未包含的數字區間
     * @param data
     * @returns
     */
    static getNumberIntervals = (inputIntervals) => {
        // 初始化結果對象
        const result = {
            overlap: [],
            notInclude: [],
        };

        // 創建一個數組，表示所有數字區間的占用情況
        const intervalStatus = new Array(21).fill(0);

        // 遍歷輸入的數字區間，標記占用情況
        for (const interval of inputIntervals) {
            const [start, end] = interval;
            for (let i = start; i <= end; i++) {
                intervalStatus[i] += 1;
            }
        }

        // 根據占用情況劃分重疊和未包含的區間
        let currentOverlap = null;
        let currentNotInclude = null;
        for (let i = 0; i <= 20; i++) {
            if (intervalStatus[i] > 1) {
                // 重疊區間
                if (!currentOverlap) {
                    currentOverlap = [i, i];
                } else {
                    currentOverlap[1] = i;
                }
                currentNotInclude = null;
            } else if (intervalStatus[i] === 0) {
                // 未包含區間
                if (!currentNotInclude) {
                    currentNotInclude = [i, i];
                } else {
                    currentNotInclude[1] = i;
                }
                if (currentOverlap) {
                    result.overlap.push(currentOverlap);
                    currentOverlap = null;
                }
            } else {
                // 包含但不重疊
                if (currentOverlap) {
                    result.overlap.push(currentOverlap);
                    currentOverlap = null;
                }
                if (currentNotInclude) {
                    result.notInclude.push(currentNotInclude);
                    currentNotInclude = null;
                }
            }
        }

        // 如果最後一個區間仍然是重疊區間，添加到結果中
        if (currentOverlap) {
            result.overlap.push(currentOverlap);
        }
        if (currentNotInclude) {
            result.notInclude.push(currentNotInclude);
        }

        return result;
    };

    /**
     * 計算數字區間是否為 [0, 20]
     * @param arr
     * @returns
     */
    static getValidateArray = (arr) => {
        const result = arr.some(
            (subArr) =>
                Array.isArray(subArr) &&
                subArr.length === 2 &&
                subArr[0] === 0 &&
                subArr[1] === 20
        );

        return result;
    };

    /**
     * 計算可新增的有效區間
     * @param inputRanges
     * @returns
     */
    static getValidateIntervals = (inputRanges) => {
        // 將輸入的範圍按照起始值排序
        inputRanges.sort((a, b) => a[0] - b[0]);

        // 初始化輸出的範圍
        const outputRanges = [];

        for (let i = 0; i < inputRanges.length; i++) {
            const currentRange = inputRanges[i];

            // 如果輸出範圍為空或者無法合併，則直接添加到輸出中
            if (
                outputRanges.length === 0 ||
                currentRange[0] > outputRanges[outputRanges.length - 1][1] + 1
            ) {
                outputRanges.push(currentRange);
            } else {
                // 否則，合併範圍
                outputRanges[outputRanges.length - 1][1] = Math.max(
                    outputRanges[outputRanges.length - 1][1],
                    currentRange[1]
                );
            }
        }

        // 如果只有一個範圍，複製一次
        if (outputRanges.length === 1) {
            outputRanges.push([...outputRanges[0]]);
        }

        // 轉換輸出格式
        const output = outputRanges.map((range) => [range[0], range[1]]);

        return output;
    };
}

export default NumberUtils;
