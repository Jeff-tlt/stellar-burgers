import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './constructorSlice';

import { TIngredient } from '../../utils/types';

const bun: TIngredient = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: 'image',
  image_large: 'image_large',
  image_mobile: 'image_mobile'
};

const main: TIngredient = {
  _id: '2',
  name: 'Котлета',
  type: 'main',
  proteins: 20,
  fat: 20,
  carbohydrates: 20,
  calories: 200,
  price: 200,
  image: 'image',
  image_large: 'image_large',
  image_mobile: 'image_mobile'
};

describe('constructorSlice', () => {
  test('должен добавлять булку', () => {
    const state = constructorReducer(undefined, addIngredient(bun));

    expect(state.bun?._id).toBe('1');
  });

  test('должен добавлять начинку', () => {
    const state = constructorReducer(undefined, addIngredient(main));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('2');
  });

  test('должен удалять ингредиент', () => {
    const stateWithIngredient = constructorReducer(
      undefined,
      addIngredient(main)
    );

    const ingredientId = stateWithIngredient.ingredients[0].id;

    const state = constructorReducer(
      stateWithIngredient,
      removeIngredient(ingredientId)
    );

    expect(state.ingredients).toHaveLength(0);
  });

  test('должен перемещать ингредиент вверх', () => {
    let state = constructorReducer(undefined, addIngredient(main));

    state = constructorReducer(
      state,
      addIngredient({
        ...main,
        _id: '3',
        name: 'Сыр'
      })
    );

    state = constructorReducer(state, moveIngredientUp(1));

    expect(state.ingredients[0]._id).toBe('3');
  });

  test('должен перемещать ингредиент вниз', () => {
    let state = constructorReducer(undefined, addIngredient(main));

    state = constructorReducer(
      state,
      addIngredient({
        ...main,
        _id: '3',
        name: 'Сыр'
      })
    );

    state = constructorReducer(state, moveIngredientDown(0));

    expect(state.ingredients[1]._id).toBe('2');
  });
});
