import { FC } from 'react';

import { Link, useLocation } from 'react-router-dom';

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import styles from '../ui/app-header/app-header.module.css';

export const AppHeader: FC = () => {
  const location = useLocation();

  const isConstructorActive =
    location.pathname === '/' || location.pathname.startsWith('/ingredients');

  const isFeedActive = location.pathname.startsWith('/feed');

  const isProfileActive = location.pathname.startsWith('/profile');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link to="/" className={styles.link}>
            <BurgerIcon type={isConstructorActive ? 'primary' : 'secondary'} />

            <p
              className={`text text_type_main-default ml-2 mr-10 ${
                isConstructorActive
                  ? 'text_color_primary'
                  : 'text_color_inactive'
              }`}
            >
              Конструктор
            </p>
          </Link>

          <Link to="/feed" className={styles.link}>
            <ListIcon type={isFeedActive ? 'primary' : 'secondary'} />

            <p
              className={`text text_type_main-default ml-2 ${
                isFeedActive ? 'text_color_primary' : 'text_color_inactive'
              }`}
            >
              Лента заказов
            </p>
          </Link>
        </div>

        <div className={styles.logo}>
          <Link to="/">
            <Logo className="" />
          </Link>
        </div>

        <Link to="/profile" className={styles.link_position_last}>
          <ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />

          <p
            className={`text text_type_main-default ml-2 ${
              isProfileActive ? 'text_color_primary' : 'text_color_inactive'
            }`}
          >
            Личный кабинет
          </p>
        </Link>
      </nav>
    </header>
  );
};
