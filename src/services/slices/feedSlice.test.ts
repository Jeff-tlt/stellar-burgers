import feedReducer, { getFeeds } from './feedSlice';

describe('feedSlice', () => {
  test('должен обрабатывать getFeeds.pending', () => {
    const state = feedReducer(undefined, getFeeds.pending('', undefined));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('должен обрабатывать getFeeds.fulfilled', () => {
    const payload = {
      orders: [],
      total: 100,
      totalToday: 10
    };

    const state = feedReducer(
      undefined,
      getFeeds.fulfilled(payload, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  test('должен обрабатывать getFeeds.rejected', () => {
    const state = feedReducer(
      undefined,
      getFeeds.rejected(new Error('Ошибка'), '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки заказов');
  });
});
