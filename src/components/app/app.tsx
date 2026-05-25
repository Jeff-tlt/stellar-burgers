import { FC, useEffect } from 'react';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './app.module.css';

import { AppHeader } from '../app-header';
import { Modal } from '../modal';
import { IngredientDetails } from '../ingredient-details';
import { OrderInfo } from '../order-info';

import { ProtectedRoute } from '../protected-route/protected-route';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '../../pages';

import { useDispatch } from '../../services/store';

import { fetchIngredients } from '../../services/slices/ingredientsSlice';

import { getUser } from '../../services/slices/userSlice';

const App: FC = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchIngredients());

    dispatch(getUser());
  }, [dispatch]);

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <AppHeader />

        <Routes location={background || location}>
          <Route path="/" element={<ConstructorPage />} />

          <Route path="/feed" element={<Feed />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reset-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/orders"
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />

          {!background && (
            <Route
              path="/ingredients/:id"
              element={
                <div className={styles.detailPageWrap}>
                  <h1
                    className={`text text_type_main-large mb-10 ${styles.detailHeader}`}
                  >
                    Детали ингредиента
                  </h1>

                  <IngredientDetails />
                </div>
              }
            />
          )}

          {!background && (
            <Route path="/feed/:number" element={<OrderInfo />} />
          )}

          {!background && (
            <Route
              path="/profile/orders/:number"
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
          )}

          <Route path="*" element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали ингредиента" onClose={closeModal}>
                  <IngredientDetails />
                </Modal>
              }
            />

            <Route
              path="/feed/:number"
              element={
                <Modal title="Информация о заказе" onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              }
            />

            <Route
              path="/profile/orders/:number"
              element={
                <ProtectedRoute>
                  <Modal title="Информация о заказе" onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </DndProvider>
  );
};

export default App;
