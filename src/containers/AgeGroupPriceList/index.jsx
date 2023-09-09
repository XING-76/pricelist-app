import AgeGroupPriceItem from '../../components/AgeGroupPriceItem';
import { FETCH_ACTION, SET_LIST_FIELD } from './model';
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
        validOptions,
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
        const newList = ageGroupPriceListField.filter(
            (item) => item.itemId !== itemId
        );

        const newData = {
            data: newList,
            type: 'delete',
        };

        dispatch(FETCH_ACTION(newData));
    };

    useEffect(() => {
        const { data, type } = apiResponse;

        if (type === 'add') {
            const newItem = {
                itemId: nanoid(),
                ageGroup: [validOptions[0], validOptions[1]],
                price: 0,
                startAge: validOptions[0],
                endAge: validOptions[1],
            };

            dispatch(SET_LIST_FIELD([...ageGroupPriceListField, newItem]));

            setResult((formData) => {
                return [...formData, newItem];
            });
        }

        if (type === 'delete') {
            dispatch(SET_LIST_FIELD(data));

            setResult(data);
        }
    }, [apiResponse]);

    return (
        <>
            {result.map((item, index) => (
                <AgeGroupPriceItem
                    key={item.itemId}
                    itemIndex={index}
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
