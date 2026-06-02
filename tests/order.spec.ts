import { test } from '@playwright/test';

test.describe('Создание заказа', () => {
  test('открывается модальное окно заказа', async ({ page }) => {
    await page.goto('/');

    // Открываем карточку булки
    await page.getByText('Краторная булка N-200i').click();

    // Закрываем модалку ингредиента
    await page.keyboard.press('Escape');

    // Добавляем булку
    await page
      .getByRole('button', { name: /добавить/i })
      .first()
      .click();

    // Добавляем начинку
    await page
      .getByRole('button', { name: /добавить/i })
      .nth(1)
      .click();

    // Нажимаем оформить заказ
    await page.getByRole('button', { name: /оформить заказ/i }).click();

    // Делаем скриншот после нажатия
    await page.screenshot({
      path: 'after-order.png',
      fullPage: true
    });

    // Останавливаем тест и смотрим браузер
    await page.pause();
  });
});
