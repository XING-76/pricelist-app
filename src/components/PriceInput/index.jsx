import Mark from '../Mark';
import ObjectUtils from '../../utils/objectUtils';

import './style.scss';

const PriceInput = (props) => {
    const {
        type = 'text',
        name,
        label = '',
        placeholder = '',
        onChange,
        // defaultValue,
        value,
        message = '',
        error = '',
    } = props;

    const handleOnChange = (event) => {
        // if (readonly || disabled) return;

        if (onChange) onChange(event);
    };

    return (
        <div
            className={`input__wrapper ${
                !ObjectUtils.isValidValue(value) ? 'errorInput' : ''
            }`}
        >
            <span className="label__top">{label}</span>

            <div className="input__container">
                <Mark mark="TWD" radius="left" />
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    value={value}
                />
            </div>

            {!ObjectUtils.isValidValue(value) && (
                <div className="error__wrapper">
                    <span className="error__message">{error}</span>
                </div>
            )}
            <span className="label__bottom">{message}</span>
        </div>
    );
};

export default PriceInput;
