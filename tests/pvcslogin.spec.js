import { test, expect } from '@playwright/test';

test("PVCS Login test", async ({ page }) => {
    await page.goto("https://win2022da.otxlab.net:8443/vminet.html");
    await page.locator("//a[text()='/sampleDB']").click();
    await page.waitForTimeout(5000);
    //Put a logic for dialog
    
    await page.locator("//input[@id='nameField']").fill("Administrator")
    await page.locator("//input[@id='passwordField']").fill("Password1!")
    await page.locator("//button[text()='OK']").click();

});