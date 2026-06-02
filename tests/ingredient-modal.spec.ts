import { test, expect } from '@playwright/test';

test.describe('Модальное окно ингредиента', () => {
  test('открывается и закрывается', async ({ page }) => {
    await page.goto('/');

    await page.getByText('Краторная булка N-200i').click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();

    await expect(page.getByText('Калории, ккал')).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });
});
