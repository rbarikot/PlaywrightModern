import { test, expect } from '@playwright/test';

test("PVCS Login test", async ({ page }) => {

  await page.goto("https://win2022da.otxlab.net:8443/vminet.html");

  await page.locator("//a[text()='/sampleDB']").click();

  await page.waitForTimeout(5000);

  // If external protocol dialog appears
  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  await page.locator("#nameField").fill("Administrator");
  await page.locator("#passwordField").fill("Password1!");
  await page.locator("//button[text()='OK']").click();

});
