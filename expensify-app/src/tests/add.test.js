const add = (a, b) => a + b;
const generateGreeting = (name='Anon') => `Hello ${name}`;

test('Should add two nums', () => {
    const result = add(3, 4);
    expect(result).toBe(7);
})

test('should generate greeting for no name', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anon');
})

test('Should return Hello Boi', () => {
    const result = generateGreeting('Boi');
    expect(result).toBe('Hello Boi')
})