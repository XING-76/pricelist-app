import Mark from '../Mark';
import SelectDropDown from '../SelectDropDown';
import { useState, useEffect } from 'react';
// import ObjectUtils from '../../utils/objectUtils';

import './style.scss';

const AgeGroupSelect = (props) => {
    const {
        startAge,
        endAge,
        label = '',
        message,
        errorMessage = '',
        error = false,
        onChange,
    } = props;

    // const [optionsStart, setOptionsStart] = useState([]);
    // const [optionsEnd, setOptionsEnd] = useState([]);
    // const [selectedStart, setSelectedStart] = useState(startAge[0]);
    // const [selectedEnd, setSelectedEnd] = useState(endAge[0]);

    // useEffect(() => {
    //     // 生成起始年龄下拉框的选项
    //     const generateOptionsStart = () => {
    //         const options = [];
    //         for (let i = 0; i <= 20; i++) {
    //             options.push(i);
    //         }
    //         setOptionsStart(options);
    //     };

    //     // 生成结束年龄下拉框的选项
    //     const generateOptionsEnd = () => {
    //         const options = [];
    //         for (let i = 0; i <= 20; i++) {
    //             options.push(i);
    //         }
    //         setOptionsEnd(options);
    //     };

    //     generateOptionsStart();
    //     generateOptionsEnd();
    // }, []);

    // useEffect(() => {
    //     // 根据用户选择更新结束年龄的选项
    //     const updatedOptionsEnd = optionsEnd.filter(
    //         (option) => option >= selectedStart
    //     );
    //     setOptionsEnd(updatedOptionsEnd);
    // }, [selectedStart]);

    // useEffect(() => {
    //     // 根据用户选择更新起始年龄的选项
    //     const updatedOptionsStart = optionsStart.filter(
    //         (option) => option <= selectedEnd
    //     );
    //     setOptionsStart(updatedOptionsStart);
    // }, [selectedEnd]);

    // useEffect(() => {
    //     const updatedOptionsStart = optionsStart.filter(
    //         (option) => option <= selectedEnd
    //     );
    //     const updatedOptionsEnd = optionsEnd.filter(
    //         (option) => option >= selectedStart
    //     );
    //     setOptionsStart(updatedOptionsStart);
    //     setOptionsEnd(updatedOptionsEnd);
    // }, [selectedStart, selectedEnd]);

    // Y
    //   const handleStartAgeChange = (event) => {
    //     const newStartAge = parseInt(event.target.value, 10);
    //     setSelectedStart(newStartAge);
    //   };

    //   const handleEndAgeChange = (event) => {
    //     const newEndAge = parseInt(event.target.value, 10);
    //     setSelectedEnd(newEndAge);
    //   };

    //     useEffect(() => {
    //         // 生成起始年齡下拉框的選項
    //         const generateOptionsStart = () => {
    //             const options = [];
    //             // for (let i = 0; i <= selectEndAge; i++) {
    //                 options.push(i);
    //             }
    //             setOptionsStart(options);
    //         };

    //         // 生成結束年齡下拉框的選項
    //         const generateOptionsEnd = () => {
    //             const options = [];
    //             // for (let i = selectStartAge; i <= 20; i++) {
    //                 options.push(i);
    //             }
    //             setOptionsEnd(options);
    //         };

    //         generateOptionsStart();
    //         generateOptionsEnd();
    //     // }, [selectStartAge, selectEndAge]);
    // }, [selectStartAge, selectEndAge]);
    // Y

    const [localStartAge, setLocalStartAge] = useState(startAge[0]);
    const [localEndAge, setLocalEndAge] = useState(endAge[1]);
    const [optionsStart, setOptionsStart] = useState([]);
    const [optionsEnd, setOptionsEnd] = useState([]);

    useEffect(() => {
        // 生成起始年齡下拉框的選項
        const generateOptionsStart = () => {
            const options = [];
            for (let i = 0; i <= localEndAge; i++) {
                options.push(i);
            }
            setOptionsStart(options);
        };

        // 生成結束年齡下拉框的選項
        const generateOptionsEnd = () => {
            const options = [];
            for (let i = localStartAge; i <= 20; i++) {
                options.push(i);
            }
            setOptionsEnd(options);
        };

        generateOptionsStart();
        generateOptionsEnd();
    }, [localStartAge, localEndAge]);

    // 生成結束年齡選項
    const generateOptionsEndArray = (start, end) => {
        const options = [];
        for (let i = start; i <= localEndAge; i++) {
            options.push(i);
        }
        return options;
    };

    // 生成起始年齡選項
    const generateOptionsStartArray = (start, end) => {
        const options = [];
        for (let i = localStartAge; i <= end; i++) {
            options.push(i);
        }
        return options;
    };

    const handleOnChange = (event) => {
        const dataTarget = event.target ?? props;
        const { name: inputName, value: inputValue } = dataTarget;

        if (inputName === 'startAge')
            setOptionsEnd(generateOptionsEndArray(inputValue, localEndAge));
        if (inputName === 'endAge')
            setOptionsStart(
                generateOptionsStartArray(localStartAge, inputValue)
            );

        if (onChange) onChange(event);
    };

    return (
        <div className="ageGroupSelect__wrapper errorInput">
            <span className="label__top">{label}</span>

            <div className="ageGroupSelect__container">
                <SelectDropDown
                    name="startAge"
                    radius="left"
                    value={startAge}
                    options={optionsStart}
                    onChange={handleOnChange}
                />
                <Mark mark="~" />
                <SelectDropDown
                    name="endAge"
                    radius="right"
                    value={endAge}
                    options={optionsEnd}
                    onChange={handleOnChange}
                />
            </div>

            {error ? (
                <div className="error__wrapper">
                    <span className="error__message">{errorMessage}</span>
                </div>
            ) : (
                <></>
            )}

            <span className="label__bottom">{message}</span>
        </div>
    );
};

export default AgeGroupSelect;