import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import styles from './app-header.module.css';

import { TAppHeaderUIProps } from './type';

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  isConstructorActive,
  isFeedActive,
  isProfileActive,
  userName
}) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <Link to="/" className={styles.link}>
          <BurgerIcon type={isConstructorActive ? 'primary' : 'secondary'} />

          <p
            className={`text text_type_main-default ml-2 mr-10 ${
              isConstructorActive ? 'text_color_primary' : 'text_color_inactive'
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
          {userName || 'Личный кабинет'}
        </p>
      </Link>
    </nav>
  </header>
);
