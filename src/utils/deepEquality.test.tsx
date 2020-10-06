import deepEquality from './deepEquality';

describe('DeepEquality', () => {
  it('same objects must be equals', () => {
    const obj1 = { name: 'eduardo', firstName: 'noel', age: 31 };
    const obj2 = { name: 'eduardo', firstName: 'noel', age: 31 };
    // expect(deepEquality(obj1, obj2)).toBeTruthy();
    expect(obj1).toStrictEqual(obj2);
  });
  it('case sensitive is important!', () => {
    const obj1 = { name: 'eduardo', firstName: 'nOel', age: 31 };
    const obj2 = { name: 'eduardo', firstName: 'noel', age: 31 };
    // expect(deepEquality(obj1, obj2)).toBeFalsy();
    expect(obj1).not.toStrictEqual(obj2);
  });
  it('different objects must be not equals', () => {
    const obj1 = { name: 'Eduardo', firstName: 'noel' };
    const obj2 = { name: 'eduardo', firstName: 'noel', age: 31 };
    //expect(deepEquality(obj1, obj2)).toBeFalsy();
    expect(obj1).not.toStrictEqual(obj2);
  });
});
