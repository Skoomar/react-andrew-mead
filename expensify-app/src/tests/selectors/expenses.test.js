import selectExpenses from '../../selectors/expenses';

const expenses = [{
    id: '1',
    description: 'Gum',
    note: '',
    
}]

test('Should filter by text value', () => {
    const result = selectExpenses();
})