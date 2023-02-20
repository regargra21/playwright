import { Locator, Page, expect } from "@playwright/test";

const waitForElement = 30000;

export default class WebActionsUtils {

    constructor(public page: Page) {
    }

    public async findLocator(value:string, options?: {
        frame?: string,
        tabId?: number,
        timeOut?: number,
        has?: Locator,
        hasText?: string
    }): Promise<Locator> {
        if(options?.tabId) {
            this.page = this.page.context().pages()[options.tabId];
        } 
        else if(options?.frame) {
            return this.page.frameLocator(options.frame).locator(value, {
                has: options?.has,
                hasText: options?.hasText
            });
        }
        return this.page.locator(value, {
            has: options?.has,
            hasText: options?.hasText
        });
    }

    public getURL(): string {
        return this.page.url();
    }

    public async closeTab(options?: {
        tabId?: number
    }) {
        if(options?.tabId) {
            await this.page.context().pages()[options.tabId].close();
        } else {
            await this.page.close();
        }
    }

    /**
     * Method to wait for a load state to continue with script
     * @param event - select between:
     *      'load' - wait for the load event to be fired.
     *      'domcontentloaded' - wait for the DOMContentLoaded event to be fired.
     *      'networkidle' - wait until there are no network connections for at least 500 ms. 
    */
    public async waitForPageNavigation(event: string): Promise<void> {
        switch (event.toLowerCase()) {
            case 'networkidle':
                await this.page.waitForLoadState(`networkidle`, {timeout: waitForElement});
                break;
            case 'load':
                await this.page.waitForLoadState(`load`, {timeout: waitForElement});
                break;
            case 'domcontentloaded':
                await this.page.waitForLoadState(`domcontentloaded`, {timeout: waitForElement});
                break;
        }
    }

    /**
     * Method to add some delay time in a specific step
     * @param time - time to delay operation
     * @returns promise of the new set timeout
    */
    public async delay(time: number): Promise<void> {
        return new Promise(function(resolve) {
            setTimeout(resolve, time)
        })
    }

    /**
     * Method to click on a Web element using a Javscript command
     * @param locator - xpath or css to identify the WebElement
    */
    public async clickElementJS(locator: string): Promise<void> {
        await this.page.$eval(locator, (element:HTMLElement) => element.click());
    }

     /**
     * Method to get the text from a WebElement using Javascript command
     * @param locator - xpath or css to identify the WebElement
     * @returns - Text obtained from the WebElement (string)
     */
    public async getTextFromWebElementsJS(locator: string): Promise<string[]> {
        return this.page.$$eval(locator, elements => elements.map(item => item.textContent.trim()));
    }

    /**
     * Method to verify the text from a Web Element against an expected value
     * @param locator - xpath or css to identify the WebElement
     * @param text 
     */
    public async verifyElementText(locator: string, text: string): Promise<void> {
        const textElement = await this.page.textContent(locator);
        expect(textElement.trim()).toBe(text);
    }

     /**
     * Method to verify the Value of a WebElement against an expected value
     * @param locator - xpath or css to identify the WebElement
     * @param value - Expected value to compare with WebElement
     */
    public async verifyElementValueJS(locator: string, value: string): Promise<void> {
        const elementValue = await this.page.$eval(locator, (element: HTMLInputElement) => element.value);
        expect(elementValue.trim()).toBe(value);
    }

    /**
     * Method to verify the Attribute of a WebElement against something expected
     * @param locator - xpath or css to identify the WebElement
     * @param attribute - attribute inside the WebElement which we want to analyze
     * @param value - expected value we should get from the webElement's attribute
     */
    public async verifyElementAttribute(locator: string, attribute: string, value: string): Promise<void> {
        const textAttribute = await this.page.getAttribute(locator, attribute);
        expect(textAttribute.trim()).toBe(value);
    }

    /**
     * Method to verify if a Web Element is displayed and display an error message if not
     * @param locator - xpath or css to identify the WebElement
     * @param errorMessage - Desired error message to display if element is not displayed
     */
    public async verifyElementIsDisplayed(locator: string, errorMessage: string): Promise<void> {
        await this.page.waitForSelector(locator, {state: 'visible', timeout: waitForElement})
        .catch(() => { throw new Error(`${errorMessage}`); });
    }

    /**
     * Method to verify if two strings have same content (exactly same)
     * @param expectedValue - Expected text we will be comparing
     * @param actualValue - Actual text we want to compare
     * @param errorMessage - Error message to display if texts are not same
     */
    public async verifyTwoStringSame(actualValue: string, expectedValue: string,errorMessage: string): Promise<void> {
        expect(expectedValue.trim(), `${errorMessage}`).toBe(actualValue);
    }
}