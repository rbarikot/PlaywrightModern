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
    
}
module.exports= ActionUtils