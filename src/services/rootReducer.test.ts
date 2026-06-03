import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  test('должен вернуть начальное состояние при неизвестном экшене', () => {
    const state = rootReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },

      user: {
        user: null,
        isAuthChecked: false,
        isAuthenticated: false,
        error: null
      },

      burgerConstructor: {
        bun: null,
        ingredients: []
      },

      order: {
        order: null,
        loading: false,
        error: null
      },

      feed: {
        orders: [],
        profileOrders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      }
    });
  });
});
