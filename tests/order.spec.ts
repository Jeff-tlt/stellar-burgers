import { test, expect } from '@playwright/test';

test.describe('Создание заказа', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/burger.har', {
      notFound: 'fallback'
    });

    // Принудительно авторизуем пользователя
    await page.route('**/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: {
            email: 'jeff@mail.ru',
            name: 'Сергей'
          }
        })
      });
    });
  });

  test('открывается модальное окно заказа', async ({ page }) => {
    await page.goto('/');

    const addButtons = page.getByRole('button', {
      name: /добавить/i
    });

    await addButtons.first().click();
    await addButtons.nth(1).click();

    await page
      .getByRole('button', {
        name: /оформить заказ/i
      })
      .click();

    const modal = page.locator('#modals');

    await expect(modal).toContainText('идентификатор заказа');

    await expect(modal).toContainText('Ваш заказ начали готовить');

    await page.keyboard.press('Escape');

    await expect(modal).not.toContainText('идентификатор заказа');
  });
});
