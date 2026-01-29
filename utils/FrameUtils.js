class FrameUtils
{
    constructor(page)
    {
        this.page=page
    }

    /**
     * Find frame by URL and verify element exists
     */
    async findFrameWithElement(urlFragment, elementLocator, maxAttempts = 30, intervalMs = 2000) {
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const frames = this.page.frames();
            const targetFrame = frames.find(f => f.url().includes(urlFragment));
            
            if (targetFrame) {
                const elementCount = await targetFrame.locator(elementLocator).count();
                if (elementCount > 0) {
                    console.log(`✅ Frame with element found after ${attempt * (intervalMs/1000)} seconds`);
                    return targetFrame;
                }
            }
            
            await this.page.waitForTimeout(intervalMs);
            if (attempt % 5 === 0) {
                console.log(`Still waiting for frame with element... (${attempt * (intervalMs/1000)}s)`);
            }
        }
        throw new Error(`Frame with URL fragment '${urlFragment}' and element '${elementLocator}' not found`);
    }

    /**
     * Fill text in iframe - ✅ Fixed parameter order (frame, locator, strategy, value)
     */
    async fillInFrame(frame, locatorValue, strategy = 'xpath', value) {
        try {
            const locator = strategy === 'xpath' 
                ? frame.locator(locatorValue) 
                : frame.locator(`${strategy}=${locatorValue}`);
            await locator.fill(value);
        } catch (error) {
            throw new Error(`Failed to fill text in frame. Error: ${error.message}`);
        }
    }

    /**
     * Click in iframe
     */
    async clickInFrame(frame, locatorValue, strategy = 'xpath') {
        try {
            const locator = strategy === 'xpath' 
                ? frame.locator(locatorValue) 
                : frame.locator(`${strategy}=${locatorValue}`);
            await locator.click();
        } catch (error) {
            throw new Error(`Failed to click in frame. Error: ${error.message}`);
        }
    }

    /**
     * Check if element exists in frame
     */
    async elementExistsInFrame(frame, locatorValue, strategy = 'xpath') {
        try {
            const locator = strategy === 'xpath' 
                ? frame.locator(locatorValue) 
                : frame.locator(`${strategy}=${locatorValue}`);
            const count = await locator.count();
            return count > 0;
        } catch (error) {
            throw new Error(`Failed to check element in frame. Error: ${error.message}`);
        }
    }
}
module.exports=FrameUtils;