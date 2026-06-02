import userReducer, { getUser, loginUser, logoutUser } from './userSlice';

describe('userSlice', () => {
  test('должен обрабатывать getUser.pending', () => {
    const state = userReducer(undefined, getUser.pending('', undefined));

    expect(state.isAuthChecked).toBe(false);
  });

  test('должен обрабатывать getUser.fulfilled', () => {
    const payload = {
      success: true,
      user: {
        email: 'test@test.ru',
        name: 'Сергей'
      }
    };

    const state = userReducer(
      undefined,
      getUser.fulfilled(payload, '', undefined)
    );

    expect(state.user).toEqual(payload.user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  test('должен обрабатывать getUser.rejected', () => {
    const state = userReducer(
      undefined,
      getUser.rejected(new Error('Ошибка'), '', undefined)
    );

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  test('должен обрабатывать loginUser.fulfilled', () => {
    const payload = {
      success: true,
      refreshToken: 'test-refresh-token',
      accessToken: 'test-access-token',
      user: {
        email: 'test@test.ru',
        name: 'Сергей'
      }
    };

    const state = userReducer(
      undefined,
      loginUser.fulfilled(payload, '', {
        email: '',
        password: ''
      })
    );

    expect(state.user).toEqual(payload.user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  test('должен обрабатывать logoutUser.fulfilled', () => {
    const startState = {
      user: {
        email: 'test@test.ru',
        name: 'Сергей'
      },
      isAuthenticated: true,
      isAuthChecked: true,
      error: null
    };

    const state = userReducer(
      startState,
      logoutUser.fulfilled({ success: true }, '', undefined)
    );

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });
});
