import {
    setStartDate,
    setEndDate,
    setTextFilter,
    sortByAmount,
    sortByDate
} from "../../actions/filters";
import moment from "moment";

test('Should generate setStartDate action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

test('Should generate setEndDate action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})

test('Should generate setTextFilter action object with default value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT',
        text: ''
    })
})


test('Should generate setTextFilter action object with text value', () => {
    const text = 'Something in';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT',
        text
    });
});

test('Should generate action object for sortByDate', () => {
    expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' })
})

test('Should generate action object for sortByAmount', () => {
    expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' })
})