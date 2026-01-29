const robot = require('robotjs');

class KeyboardUtils {
    /**
     * Press Tab key
     */
    async pressTab() {
        try {
            robot.keyTap('tab');
            await this.delay(100); // Small delay after keypress
        } catch (error) {
            throw new Error(`Failed to press Tab key. Error: ${error.message}`);
        }
    }

    /**
     * Press Enter key
     */
    async pressEnter() {
        try {
            robot.keyTap('enter');
            await this.delay(100); // Small delay after keypress
        } catch (error) {
            throw new Error(`Failed to press Enter key. Error: ${error.message}`);
        }
    }

    /**
     * Press Escape key
     */
    async pressEscape() {
        try {
            robot.keyTap('escape');
            await this.delay(100);
        } catch (error) {
            throw new Error(`Failed to press Escape key. Error: ${error.message}`);
        }
    }

    /**
     * Press any key
     */
    async pressKey(key) {
        try {
            robot.keyTap(key);
            await this.delay(100);
        } catch (error) {
            throw new Error(`Failed to press ${key} key. Error: ${error.message}`);
        }
    }

    /**
     * Press key combination (e.g., Ctrl+C)
     */
    async pressKeyCombination(key, modifiers = []) {
        try {
            robot.keyTap(key, modifiers);
            await this.delay(100);
        } catch (error) {
            throw new Error(`Failed to press key combination. Error: ${error.message}`);
        }
    }

    /**
     * Internal delay helper
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = KeyboardUtils;