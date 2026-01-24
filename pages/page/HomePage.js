const BasePage = require('../../pages/page/Basepage');  
const HomePageLocator= require('../locators/HomePageLocator')
const ActionUtils = require('../../utils/ActonUtils');

class HomePage extends BasePage {

  constructor(page) {
    super(page); 
    this.elements = HomePageLocator;
    this.actions=new ActionUtils(page);

  }

  async navigateToHome() {
    await this.navigateToURL("https://win2022da.otxlab.net:8443/vminet.html");
  }

  async clickingOnPDB() {
    await this.actions.click("text=/sampleDB","xpath");
  }

  async loginToPDB() {
    await this.actions.fill(this.elements.TextBox_UserID,"xpath","Administrator")
    await this.actions.fill(this.elements.TextBox_PassWorrd,"xpath","Password1!")
    await this.actions.click(this.elements.Button_OK,"xpath");
  }
}

module.exports = HomePage;
