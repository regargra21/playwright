import { expect } from '@playwright/test';
import test from "../src/utils/fixtures";
import * as testData from './testData/testData.json';

test('Create new password encrypted', async({stringUtils}) => {
  const encrypt_pwd = stringUtils.encryptPassword(testData.LOGIN.APP_PASSWORD);
  console.log(encrypt_pwd);
})

test('Correctly login in App', async ({ page, loginSteps}) => {
  await page.goto('https://www.saucedemo.com/');
  await loginSteps.enterUserName(testData.LOGIN.APP_USERNAME);
  await loginSteps.enterPassword(testData.LOGIN.APP_PASSWORD);
  await loginSteps.clickSubmitButton(); 
});

test('User Locked out in App', async ({ page, loginSteps }) => {
  await page.goto('https://www.saucedemo.com/');
  await loginSteps.enterUserName(testData.LOGIN.APP_USERNAME_LOCKED_OUT);
  await loginSteps.enterPassword(testData.LOGIN.APP_PASSWORD);
  await loginSteps.clickSubmitButton();
  await loginSteps.validateErrorMessage(testData.LOGIN.EXPECTED_ERROR_MESSAGE);
});
