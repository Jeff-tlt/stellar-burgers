import orderReducer, { createOrder } from './orderSlice';

describe('orderSlice', () => {
  test('должен обрабатывать createOrder.pending', () => {
    const state = orderReducer(undefined, createOrder.pending('', []));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('должен обрабатывать createOrder.fulfilled', () => {
    const order = {
      _id: '1',
      status: 'done',
      name: 'Тестовый заказ',
      createdAt: '',
      updatedAt: '',
      number: 123,
      ingredients: []
    };

    const state = orderReducer(undefined, createOrder.fulfilled(order, '', []));

    expect(state.loading).toBe(false);
    expect(state.order).toEqual(order);
  });

  test('должен обрабатывать createOrder.rejected', () => {
    const state = orderReducer(
      undefined,
      createOrder.rejected(new Error('Ошибка'), '', [])
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });
});
