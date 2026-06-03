import reducer, { fetchIngredients } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  test('pending должен устанавливать isLoading=true', () => {
    const state = reducer(undefined, fetchIngredients.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fulfilled должен сохранять ингредиенты', () => {
    const ingredients = [
      {
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
      }
    ];

    const state = reducer(
      undefined,
      fetchIngredients.fulfilled(ingredients, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(ingredients);
  });

  test('rejected должен сохранять ошибку', () => {
    const state = reducer(
      undefined,
      fetchIngredients.rejected(new Error('Ошибка'), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
  });
});
