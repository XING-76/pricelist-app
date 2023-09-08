import AgeGroupPriceItem from '../../components/AgeGroupPriceItem';
import { FETCH_ACTION, FETCH_VALIDATE, SET_LIST_FIELD } from './model';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './style.scss';

const AgeGroupPriceList = () => {
    const dispatch = useDispatch();

    const {
        ageGroupPriceListField,
        overlapError,
        blankError,
        includeAll,
        apiResponse,
    } = useSelector((state) => ({
        ...state.mainPage,
    }));

    const [result, setResult] = useState(ageGroupPriceListField);

    const handleAdd = () => {
        if (overlapError || blankError || includeAll) return;

        const newData = {
            data: [...ageGroupPriceListField],
            type: 'add',
        };

        dispatch(FETCH_ACTION(newData));
    };

    const handleDelete = (itemId) => {
        const newData = ageGroupPriceListField.filter(
            (item) => item.itemId !== itemId
        );

        // 功能待修正
        // dispatch(FETCH_VALIDATE(newData));
        // 此行為版本一暫行
        dispatch(SET_LIST_FIELD(newData));

        setResult(newData);
    };

    useEffect(() => {
        const { data, type } = apiResponse;

        if (type === 'add') {
            const newItem = {
                itemId: nanoid(),
                ageGroup: [data[0][0], data[1][1]],
                price: 0,
                startAge: data[0],
                endAge: data[1],
            };

            dispatch(SET_LIST_FIELD([...ageGroupPriceListField, newItem]));

            setResult((formData) => {
                return [...formData, newItem];
            });
        }
    }, [apiResponse]);

    return (
        <>
            {result.map((item, index) => (
                <AgeGroupPriceItem
                    key={item.itemId}
                    itemIndex={index}
                    itemId={item.itemId}
                    item={item}
                    handleDelete={handleDelete}
                />
            ))}

            <div className="addBtn" onClick={handleAdd}>
                + 新增價格設定
            </div>
        </>
    );
};

export default AgeGroupPriceList;
