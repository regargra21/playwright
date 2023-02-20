import { Page, expect } from '@playwright/test';
import WebActionsUtils from '../utils/webActions.utils';
import * as loginPage from '../pages/login.page';
import StringUtils from '../utils/string.utils';

export default class LoginSteps {
    constructor(public page: Page) {
        this.stringUtils = new StringUtils();
        this.webActions = new WebActionsUtils(page);
    }

    readonly stringUtils: StringUtils;
    readonly webActions: WebActionsUtils;

    public async enterUserName(username: string): Promise<void> {
        await this.page.type(loginPage.USERNAME_INPUTBOX_XPATH, username);
    }

    public async enterPassword(encryptPwd: string): Promise<void> {
        const password = await this.stringUtils.decipherAppPassword(encryptPwd);
        await this.page.type(loginPage.PASSWORD_INPUTBOX_XPATH, password);
    }

    public async clickSubmitButton(): Promise<void> {
        await this.page.click(loginPage.SUBMIT_BUTTON_XPATH);
    }

    public async validateErrorMessage(expectedErrorMessage: string): Promise<void> {
        expect(this.page.isVisible(loginPage.ERROR_LOCKED_OUT_USER_XPATH));
        const actualError = (await this.page.textContent(loginPage.ERROR_LOCKED_OUT_USER_XPATH)).trim();
        await this.webActions.verifyTwoStringSame(actualError, expectedErrorMessage, "Error Message not same");
    }
}