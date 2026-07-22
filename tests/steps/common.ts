import { Given, Then } from '@cucumber/cucumber';
import CustomWorld from "../support/world";
import { expect } from '@playwright/test';

Given('no products', async function (this: CustomWorld) {
  // Do nothing
});

Given('the main page', async function (this: CustomWorld) {
  expect(this.page!).not.toBeNull();
});

Then('the total volume is {int}', async function (this: CustomWorld, expected: number) {
  const totalVolumeText = await this.page!.getByTestId('totalVolume').textContent();

  expect(totalVolumeText).not.toBeNull();

  const totalVolume = parseFloat(totalVolumeText!);
  const expectedVolume = parseFloat(String(expected));
  
  expect(totalVolume).toBeCloseTo(expectedVolume, 5);
});
