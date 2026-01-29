const BasePage = require('../../pages/page/Basepage');  
const HomePageLocator= require('../locators/HomePageLocator')
const ActionUtils = require('../../utils/ActonUtils');

class HomePage extends BasePage {

  constructor(page) {
    super(page); 
    this.elements = HomePageLocator;
    this.actions=new ActionUtils(page);
    this.loginFrame = null;
  }

  async navigateToHome() {
    await this.navigateToURL("https://win2022da.otxlab.net:8443/vminet.html");
  }

  async clickingOnPDB() {
    await this.actions.click("//a[text()='/sampleDB']","xpath");
  }

  async loginToPDB() {
    try {
        if (!this.loginFrame) {
            throw new Error('Login frame not initialized. Call waitForLoginFrame() first.');
        }

        // Check if element exists using frame utility
        const nameFieldExists = await this.actions.frame.elementExistsInFrame(
            this.loginFrame, 
            this.elements.TextBox_UserID, 
            "xpath"
        );
        
        if (nameFieldExists) {
            // Fill form using frame utility
            await this.actions.frame.fillInFrame(
                this.loginFrame, 
                this.elements.TextBox_UserID, 
                "xpath",
                "Administrator"
            );
            
            await this.actions.frame.fillInFrame(
                this.loginFrame, 
                this.elements.TextBox_PassWorrd, 
                "xpath",
                "Password1!"
            );
            
            // Click submit using frame utility
            await this.actions.frame.clickInFrame(
                this.loginFrame, 
                this.elements.Button_OK, 
                "xpath"
            );
            
            console.log('✅ Login submitted');
            await this.actions.wait(2000);
        } else {
            throw new Error('Login form fields not found');
        }
    } catch (error) {
        throw new Error(`Failed to login: ${error.message}`);
    }
  }

  /**
   * Handle protocol dialog using keyboard navigation with robotjs
   */
  async handleProtocolDialog() {
    try {
        console.log('Handling protocol dialog with robotjs...');
        
        // Wait longer for dialog to fully appear
        await this.actions.wait(5000); // ✅ Increased from 3000 to 5000
        
        console.log('Pressing Tab...');
        await this.actions.keyboard.pressTab();
        await this.actions.wait(800); // ✅ Increased from 500
        
        console.log('Pressing Enter...');
        await this.actions.keyboard.pressEnter();
        await this.actions.wait(1500); // ✅ Increased from 1000
        
        console.log('Pressing Tab again...');
        await this.actions.keyboard.pressTab();
        await this.actions.wait(800); // ✅ Increased from 500
        
        console.log('Pressing Enter again...');
        await this.actions.keyboard.pressEnter();
        await this.actions.wait(1500); // ✅ Increased from 1000
        
        console.log('Pressing final Enter...');
        await this.actions.keyboard.pressEnter();
        await this.actions.wait(2000); // ✅ Increased from 1000
        
        console.log('✅ Protocol dialog handled');
    } catch (error) {
        throw new Error(`Failed to handle protocol dialog: ${error.message}`);
    }
  }

  /**
   * Wait for login frame to appear
   */
  async waitForLoginFrame() {
    try {
        console.log('Waiting for login frame...');
        
        // ✅ Increased attempts and interval
        this.loginFrame = await this.actions.frame.findFrameWithElement(
            'jsp=login', 
            '#nameField', 
            40,    // ✅ Increased from 30 to 40 attempts
            3000   // ✅ Increased from 2000 to 3000ms interval
        );
        
        if (!this.loginFrame) {
            throw new Error('Login frame not found - dialog might still be open');
        }
        
        console.log('✅ Login frame loaded');
    } catch (error) {
        throw new Error(`Failed to find login frame: ${error.message}`);
    }
  }

  /**
   * Take screenshot
   */
  async captureScreenshot(filename = 'result.png') {
    await this.actions.takeScreenshot(filename, true);
  }
}

module.exports = HomePage;