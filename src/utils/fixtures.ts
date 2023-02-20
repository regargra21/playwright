import { test as baseTest } from '@playwright/test';
import WebActionsUtils from './webActions.utils';
import StringUtils from './string.utils';
import LoginSteps from '../steps/login.steps';

const test = baseTest.extend<{
    webActions: WebActionsUtils;
    stringUtils: StringUtils;
    loginSteps: LoginSteps;
}>({
    webActions: async({ page }, use) => {
        await use(new WebActionsUtils(page));
    },
    stringUtils: async({}, use) => {
        await use(new StringUtils());
    },
    loginSteps: async({ page}, use) => {
        await use(new LoginSteps(page));
    }
})

export default test;

export const expect = test.expect;