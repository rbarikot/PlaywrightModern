import GetLocator from './GetLocatorStrategy';

class ActionUtils
{
    constructor(page)
    {
        this.page=page
        this.getlocator= new GetLocator(page);
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

    
}
module.exports= ActionUtils