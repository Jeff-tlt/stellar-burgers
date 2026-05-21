import { setCookie, getCookie } from './cookie';

import { TIngredient, TOrder, TOrdersData, TUser } from './types';

const URL = process.env.BURGER_API_URL;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;

  accessToken: string;
}>;

export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${URL}/auth/token`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },

    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((res) => checkResponse<TRefreshResponse>(res));

export const fetchWithRefresh = async <T>(
  url: RequestInfo,

  options: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, options);

    return await checkResponse<T>(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();

      localStorage.setItem('refreshToken', refreshData.refreshToken);

      setCookie('accessToken', refreshData.accessToken);

      options.headers = {
        ...(options.headers as object),

        authorization: refreshData.accessToken
      };

      const res = await fetch(url, options);

      return await checkResponse<T>(res);
    }

    return Promise.reject(err);
  }
};

export type TRegisterData = {
  email: string;

  name: string;

  password: string;
};

export type TLoginData = {
  email: string;

  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;

  accessToken: string;

  user: TUser;
}>;

export const registerUserApi = (data: TRegisterData): Promise<TAuthResponse> =>
  fetch(`${URL}/auth/register`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },

    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      localStorage.setItem('refreshToken', data.refreshToken);

      setCookie('accessToken', data.accessToken);

      return data;
    });

export const loginUserApi = (data: TLoginData): Promise<TAuthResponse> =>
  fetch(`${URL}/auth/login`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },

    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      localStorage.setItem('refreshToken', data.refreshToken);

      setCookie('accessToken', data.accessToken);

      return data;
    });

export const logoutApi = (): Promise<TServerResponse<{}>> =>
  fetch(`${URL}/auth/logout`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },

    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      localStorage.removeItem('refreshToken');

      setCookie('accessToken', '', {
        expires: -1
      });

      return data;
    });

export const forgotPasswordApi = (data: {
  email: string;
}): Promise<TServerResponse<{}>> =>
  fetch(`${URL}/password-reset`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },

    body: JSON.stringify(data)
  }).then((res) => checkResponse<TServerResponse<{}>>(res));

export const resetPasswordApi = (data: {
  password: string;

  token: string;
}): Promise<TServerResponse<{}>> =>
  fetch(`${URL}/password-reset/reset`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },

    body: JSON.stringify(data)
  }).then((res) => checkResponse<TServerResponse<{}>>(res));

export const getIngredientsApi = (): Promise<TIngredient[]> =>
  fetch(`${URL}/ingredients`)
    .then((res) =>
      checkResponse<
        TServerResponse<{
          data: TIngredient[];
        }>
      >(res)
    )
    .then((data) => data.data);

export const getUserApi = (): Promise<TServerResponse<{ user: TUser }>> =>
  fetchWithRefresh(`${URL}/auth/user`, {
    headers: {
      authorization: getCookie('accessToken')
    } as HeadersInit
  });

export const updateUserApi = (
  user: Partial<TRegisterData>
): Promise<TServerResponse<{ user: TUser }>> =>
  fetchWithRefresh(`${URL}/auth/user`, {
    method: 'PATCH',

    headers: {
      'Content-Type': 'application/json;charset=utf-8',

      authorization: getCookie('accessToken')
    } as HeadersInit,

    body: JSON.stringify(user)
  });

export const orderBurgerApi = (ingredients: string[]) =>
  fetchWithRefresh(`${URL}/orders`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json;charset=utf-8',

      authorization: getCookie('accessToken')
    } as HeadersInit,

    body: JSON.stringify({
      ingredients
    })
  });

export const getFeedsApi = (): Promise<TOrdersData> =>
  fetch(`${URL}/orders/all`).then((res) => checkResponse<TOrdersData>(res));

export const getOrderByNumberApi = (number: number): Promise<TOrder> =>
  fetch(`${URL}/orders/${number}`)
    .then((res) =>
      checkResponse<
        TServerResponse<{
          orders: TOrder[];
        }>
      >(res)
    )
    .then((data) => data.orders[0]);
