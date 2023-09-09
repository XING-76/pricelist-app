import PriceInput from '../PriceInput';
import AgeGroupSelect from '../AgeGroupSelect';
import Grid from '../Grid';
import NumberUtils from '../../utils/numberUtils';
import ObjectUtils from '../../utils/objectUtils';
import {
    FETCH_ITEM_FIELD,
    SET_BLANK_ERROR,
} from '../../containers/AgeGroupPriceList/model';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './style.scss';

const AgeGroupPriceItem = (props) => {
    const { item, itemIndex, handleDelete } = props;

    const dispatch = useDispatch();

    const { overlapError, ageGroupPriceListField } = useSelector((state) => ({
        ...state.mainPage,
    }));

    const [ageGroupPriceItem, setAgeGroupPriceItem] = useState({
        ...item,
    });

    const handleOnChange = (props) => {
        const dataTarget = props.target ?? props;
        const { name: inputName, value: inputValue } = dataTarget;

        let priceValue = inputValue;

        if (inputName === 'price') {
            dispatch(SET_BLANK_ERROR(!ObjectUtils.isValidValue(inputValue)));

            priceValue = priceValue.replace(/^(-)?0+(?!\.|$)/, '$1');

            // 移除非數字、小數點和負號的字符
            priceValue = priceValue.replace(/[^-0-9.]/g, '');

            setAgeGroupPriceItem((formData) => {
                return {
                    ...formData,
                    [inputName]:
                        NumberUtils.getThousandFormat(priceValue) ?? '',
                };
            });

            return;
        }

        if (inputName === 'startAge' || inputName === 'endAge') {
            const convertedValue = Number(inputValue);

            setAgeGroupPriceItem((formData) => {
                return {
                    ...formData,
                    ageGroup:
                        inputName === 'startAge'
                            ? [convertedValue, ...formData.ageGroup.slice(1)]
                            : [
                                  ...formData.ageGroup.slice(0, 1),
                                  convertedValue,
                              ],
                    [inputName]: convertedValue ?? '',
                };
            });

            return;
        }

        setAgeGroupPriceItem((formData) => {
            return {
                ...formData,
                [inputName]: priceValue ?? '',
            };
        });
    };

    useEffect(() => {
        const newData = [...ageGroupPriceListField].map((item) => {
            return item.itemId === ageGroupPriceItem.itemId
                ? { ...ageGroupPriceItem }
                : { ...item };
        });

        dispatch(FETCH_ITEM_FIELD(newData));
    }, [ageGroupPriceItem]);

    return (
        <>
            <div className="ageGroupPriceItem__title">
                <span>價格設定 - {itemIndex + 1}</span>

                {itemIndex + 1 === 1 ? (
                    <></>
                ) : (
                    <div
                        className="deleteBtn"
                        onClick={() => handleDelete(ageGroupPriceItem.itemId)}
                    >
                        × 移除
                    </div>
                )}
            </div>

            <Grid row>
                <Grid col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                    <AgeGroupSelect
                        label="年齡"
                        name="ageGroup"
                        onChange={handleOnChange}
                        startAge={ageGroupPriceItem.startAge}
                        endAge={ageGroupPriceItem.endAge}
                        errorMessage="年齡區間不可重疊"
                        error={overlapError}
                    />
                </Grid>

                <Grid col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                    <PriceInput
                        label="入住費用（每人每晚）"
                        type="text"
                        name="price"
                        placeholder="請輸入費用"
                        message="輸入 0 表示免費"
                        onChange={handleOnChange}
                        value={ageGroupPriceItem?.price}
                        error="不可以為空白"
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default AgeGroupPriceItem;
