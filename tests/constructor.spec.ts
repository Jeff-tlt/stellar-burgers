import { test } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test('добавление ингредиента в конструктор', async ({ page }) => {
    await page.goto('/');

    const addButtons = page.getByRole('button', {
      name: /добавить/i
    });

    await addButtons.first().click();

    await page.pause();
  });
});
