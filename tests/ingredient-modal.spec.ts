import { test, expect } from '@playwright/test';

test.describe('Модальное окно ингредиента', () => {
  const ingredientName = 'Краторная булка N-200i';

  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/burger.har', {
      notFound: 'fallback'
    });
  });

  test('открывается и закрывается через Escape', async ({ page }) => {
    await page.goto('/');

    await page.getByText(ingredientName).click();

    const modal = page.locator('#modals');

    await expect(modal.getByText('Детали ингредиента')).toBeVisible();

    await expect(
      modal.getByRole('heading', { name: ingredientName })
    ).toBeVisible();

    await expect(modal.getByText('420')).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(modal.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('закрывается через крестик', async ({ page }) => {
    await page.goto('/');

    await page.getByText(ingredientName).click();

    const modal = page.locator('#modals');

    await expect(modal.getByText('Детали ингредиента')).toBeVisible();

    await modal.locator('button').click();

    await expect(modal.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('закрывается через оверлей', async ({ page }) => {
    await page.goto('/');

    await page.getByText(ingredientName).click();

    const modal = page.locator('#modals');

    await expect(modal.getByText('Детали ингредиента')).toBeVisible();

    await page.locator('#modals > div:last-child').dispatchEvent('click');

    await expect(modal.getByText('Детали ингредиента')).not.toBeVisible();
  });
});
