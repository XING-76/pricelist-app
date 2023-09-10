import ObjectUtils from '../../utils/objectUtils';
import './style.scss';

const SelectDropDown = (props) => {
    const {
        name,
        placeholder = '請選擇',
        onChange,
        radius = '',
        value,
        options,
    } = props;

    const handleOnChange = (event) => {
        if (onChange) onChange(event);
    };

    return (
        <div
            className={`select__wrapper ${
                !ObjectUtils.isValidValue(value) ? 'errorInput' : ''
            }`}
        >
            <div className="select__container">
                <select
                    name={name}
                    className={`${
                        radius === 'right'
                            ? 'selectInput__right'
                            : 'selectInput__left'
                    }`}
                    onChange={handleOnChange}
                >
                    <option value="" hidden>
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectDropDown;
