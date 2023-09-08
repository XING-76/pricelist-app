class ObjectUtils {
    static isExist(string) {
        return string !== null && string !== undefined && string !== '';
    }

    static isDefault(val) {
        return val === 0;
    }

    static isValidValue(val) {
        if (val !== 0) {
            return val !== null && val !== undefined && val !== '';
        }
        return val === 0;
    }
}

export default ObjectUtils;
