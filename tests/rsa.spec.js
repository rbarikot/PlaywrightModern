import { test, expect } from '@playwright/test';
const HomePage = require('../pages/page/RahulShettyPage')

test.describe('Login Functionalaity',()=>{
    let homePage;
    test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    
    // Navigate to login page (ensure navigateToHome waits for load)
    await homePage.navigateToHome();
   
  });

  test('@sanity Valid User Login With Credential',async({page})=>{
    await homePage.clickingOnRadioButton();
    await homePage.clickingOnDropdown();
    await page.waitForTimeout(3000);
  })

})