const BasePage = require('./Basepage');  
const HomePageLocator= require('../locators/RahulshettyLocator')
const ActionUtils = require('../../utils/ActonUtils');

class HomePage extends BasePage {

  constructor(page) {
    super(page); 
    this.elements = HomePageLocator;
    this.actions=new ActionUtils(page);

  }

  async navigateToHome() {
    await this.navigateToURL("https://rahulshettyacademy.com/AutomationPractice/");
  }

  async clickingOnRadioButton() {
    await this.actions.check(this.elements.Radio_radio1,"xpath");
    await this.actions.check(this.elements.Radio_radio2,"xpath");
    await this.actions.check(this.elements.Radio_radio3,"xpath");

  }

  async clickingOnDropdown() {
    await this.actions.selectOptions(this.elements.Dropdown_Example,"xpath","Option1")
    
  }
}

module.exports = HomePage;
