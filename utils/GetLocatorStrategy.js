
class GetLocatorStrategy
{
    constructor(page)
    {
        this.page=page
    }    
    /**
     * Getting Locator Strategy
     */

    _getLocator(Locatorvalue, strategy="xpath")
    {
        switch(strategy.toLowerCase())
        {
            case "css":
                return this.page.locator(Locatorvalue);
            case "xpath":
                return this.page.locator(Locatorvalue);
            case "text":
                return this.page.getByText(Locatorvalue);
            case "role":
                return this.page.getByRole(Locatorvalue);
            case "label":
                return this.page.getByLabel(Locatorvalue);
            case "placeholder":
                return this.page.getByPlaceholder(Locatorvalue);
            case "title":
                return this.page.getByTitle(Locatorvalue);
            case "testid":
                return this.page.getByTestId(Locatorvalue);
            case "attribute":
                return this.page.getAttribute(Locatorvalue);
            default :
                return this.page.locator(Locatorvalue);
        }
    }
}
module.exports = GetLocatorStrategy