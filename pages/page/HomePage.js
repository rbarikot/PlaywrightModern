const BasePage = require('../../pages/page/Basepage');  
const HomePageLocator= require('../locators/HomePageLocator') 

class HomePage extends BasePage {

  constructor(page) {
    super(page); 
    this.elements = HomePageLocator;
  }

  async navigateToHome() {
    await this.navigateToURL("https://win2022da.otxlab.net:8443/vminet.html");
  }

  async clickingOnPDB() {
    await this.page.locator("text=/sampleDB").click();
  }

  async loginToPDB() {
    await this.page.locator(this.elements.TextBox_UserID).fill("Administrator");
    await this.page.locator(this.elements.TextBox_PassWorrd).fill("Administrator");
    await this.page.locator(this.elements.Button_OK).click();
  }
}

module.exports = HomePage;
