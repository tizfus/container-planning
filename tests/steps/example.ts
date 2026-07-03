import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from '@playwright/test';

Given('I am on {string}', async function (this: CustomWorld, url: string) {
  await this.page?.goto(url);
});

When('I take a screenshot', async function (this: CustomWorld) {
  await this.page?.screenshot({ path: 'screenshots/example.png' });
});

Then('I should see {string}', async function (this: CustomWorld, text: string) {
  await expect(this.page!).toHaveTitle(text);
});
