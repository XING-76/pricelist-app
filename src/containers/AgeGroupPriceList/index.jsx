import AgeGroupPriceItem from '../../components/AgeGroupPriceItem';
// import { AgeGroupPriceListField as initAgeGroupPriceListField } from './model/data';
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
        apiResponse,
    } = useSelector((state) => ({
        ...state.mainPage,
    }));

    const [result, setResult] = useState(ageGroupPriceListField);

    const handleAdd = () => {
        if (overlapError || blankError || includeAll) return;

        // const newItem = {
        //     itemId: nanoid(),
        //     ageGroup: [0, 20],
        //     price: 0,
        //     startAge: 0,
        //     endAge: 20,
        // };

        const newData = {
            // data: [...ageGroupPriceListField, newItem],
            data: [...ageGroupPriceListField],
            type: 'add',
        };

        // 業務邏輯
        dispatch(FETCH_ACTION(newData));

        // 這邊應該要用 useEffect 偵測 saga 丟回的資訊去重組新的資料並塞入新增
        // setResult((formData) => {
        //     return [...formData, newItem];
        // });
    };

    const handleDelete = (itemId) => {
        // 業務邏輯
        const newData = ageGroupPriceListField.filter(
            (item) => item.itemId !== itemId
        );

        dispatch(SET_LIST_FIELD(newData));
        setResult(newData);
    };

    // 可能合併在 add、delete 中丟全域錯誤來做顯示
    useEffect(() => {
        // 檢查目前輸入
        // dispatch(FETCH_ACTION(ageGroupPriceListField))
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
