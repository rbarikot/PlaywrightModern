import GetLocator from './GetLocatorStrategy';
const KeyboardUtils = require('./KeyboardUtils');
const FrameUtils = require('./FrameUtils');

class ActionUtils
{
    constructor(page)
    {
        this.page=page
        this.getlocator= new GetLocator(page);
        this.keyboard = new KeyboardUtils();
        this.frame = new FrameUtils(page);
    }

    /**
     * Click on Element
     */

    async click(locatorValue, strategy = 'xpath')
    {
        try{
            const locator = this.getlocator._getLocator(locatorValue, strategy);
            await locator.click();
        }
        catch(error)
        {
            throw new Error(`Failed to click on element: ${locatorValue}. Error: ${error.message}`);
        }     

    }
    async fill(locatorValue, strategy = 'xpath',value)
    {
        try{
            const locator = this.getlocator._getLocator(locatorValue, strategy);
            await locator.fill(value);
        }
        catch(error)
        {
            throw new Error(`Failed to fill text. Error: ${error.message}`)
        }
    }

    /**
     * Method For Radio Button and Check Box
     */

    async check(locatorValue, strategy='xpath')
    {
         try{
            const locator = this.getlocator._getLocator(locatorValue, strategy);
            await locator.check();
        }
        catch(error)
        {
            throw new Error(`Failed to check the element: ${locatorValue}. Error: ${error.message}`)
        }
    }
    async toBechecked(locatorValue, strategy='xpath')
    {
         try{
            const locator = this.getlocator._getLocator(locatorValue, strategy);
            await locator.toBeChecked();
        }
        catch(error)
        {
            throw new Error(`Failed to check the element: ${locatorValue}. Error: ${error.message}`)
        }
    }

    /**
     * Method For Select options
     */

    async selectOptions(locatorValue,strategy="xpath",optionValue)
    {
        try
        {
            const locator= this.getlocator._getLocator(locatorValue,strategy);
            await locator.selectOption(optionValue)

        }
        catch(error)
        {
            throw new Error(`Failed to select option on ${locatorValue} → ${error.message}`)
        }
    }

    /**
     * Handling Window Method
     */

    async clickAndSwitchToNewWindow(locatorValue, strategy='xpath') {
    try {
    const locator = this.getlocator._getLocator(locatorValue, strategy);

    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      locator.click()
    ]);

    await newPage.waitForLoadState();
    return newPage; // return new window page object

  } catch (error) {
    throw new Error(`Failed to open new window → ${error.message}`);
  }
}

    /**
     * Wait methods
     */
    async wait(milliseconds) {
        await this.page.waitForTimeout(milliseconds);
    }

    /**
     * Screenshot
     */
    async takeScreenshot(filename = 'screenshot.png', fullPage = true) {
        try {
            await this.page.screenshot({ path: filename, fullPage });
            console.log(`✅ Screenshot saved: ${filename}`);
        } catch (error) {
            throw new Error(`Failed to take screenshot. Error: ${error.message}`);
        }
    }


    
}
module.exports= ActionUtils