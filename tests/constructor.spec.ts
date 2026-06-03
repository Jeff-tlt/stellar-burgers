import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/burger.har', {
      notFound: 'fallback'
    });
  });

  test('добавление ингредиента в конструктор', async ({ page }) => {
    await page.goto('/');

    const addButtons = page.getByRole('button', {
      name: /добавить/i
    });

    await addButtons.first().click();

    const constructor = page.locator('section').last();

    await expect(
      constructor.getByText('Краторная булка N-200i (верх)')
    ).toBeVisible();

    await expect(
      constructor.getByText('Краторная булка N-200i (низ)')
    ).toBeVisible();
  });
});
