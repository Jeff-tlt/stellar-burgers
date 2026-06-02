import { test, expect } from '@playwright/test';

test.describe('Создание заказа', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().addCookies([
      {
        name: 'accessToken',
        value: 'Bearer test-access-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    await page.route('**/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: {
            email: 'test@test.ru',
            name: 'Тестовый пользователь'
          }
        })
      });
    });

    await page.route('**/orders', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            name: 'Space флюоресцентный бургер',
            order: {
              number: 106034
            }
          })
        });

        return;
      }

      await route.continue();
    });
  });

  test('открывается модальное окно заказа', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Escape');

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

    await expect(page.getByText('106034')).toBeVisible();

    await expect(page.getByText('идентификатор заказа')).toBeVisible();

    await expect(page.getByText('Ваш заказ начали готовить')).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.getByText('идентификатор заказа')).not.toBeVisible();

    await expect(page.getByText('Выберите начинку')).toBeVisible();
  });
});
