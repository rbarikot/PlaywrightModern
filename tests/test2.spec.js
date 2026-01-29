const { test, expect } = require('@playwright/test');
const robot = require('robotjs');

test.describe('PVCS Protocol Tests', () => {
  test('navigate dialog with Tab key', async ({ page }) => {
    await page.goto("https://win2022da.otxlab.net:8443/vminet.html");
    
    await page.locator("//a[text()='/sampleDB']").click();    
    // Wait longer for dialog to fully appear
    await page.waitForTimeout(3000);
    robot.keyTap('tab');
    await page.waitForTimeout(500);
    robot.keyTap('enter');
    await page.waitForTimeout(1000);
    robot.keyTap('tab');
    await page.waitForTimeout(500);
    robot.keyTap('enter');
    await page.waitForTimeout(1000);
    robot.keyTap('enter');
    await page.waitForTimeout(1000);
    let loginFrame = null;
    for (let attempt = 0; attempt < 30; attempt++) {
      loginFrame = page.frames().find(f => f.url().includes('jsp=login'));
      
      if (loginFrame) {
        const nameFieldCount = await loginFrame.locator('#nameField').count();
        if (nameFieldCount > 0) {
          console.log(`✅ Login form appeared after ${attempt * 2} seconds`);
          break;
        }
      }
      
      await page.waitForTimeout(2000);
      if (attempt % 5 === 0) {
        console.log(`Still waiting... (${attempt * 2}s)`);
      }
    }
    
    if (loginFrame) {
      const nameFieldExists = await loginFrame.locator('#nameField').count();
      if (nameFieldExists > 0) {
        await loginFrame.locator('#nameField').fill('Administrator');
        await loginFrame.locator('#passwordField').fill('Password1!');
        await loginFrame.locator("//button[text()='OK']").click();
        console.log('✅ Login submitted');
      }
    } else {
      console.log('❌ Agent did not connect - dialog might still be open');
    }
    
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'result.png', fullPage: true });
  });
});