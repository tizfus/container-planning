import { Given, When, Then } from '@cucumber/cucumber';
import CustomWorld from "../support/world";
import { expect } from '@playwright/test';

Given('a product with length {string} width {string} height {string}', async function (
  this: CustomWorld,
  length: string,
  width: string,
  height: string
) {
  await this.page!.goto('file:///workspaces/container-planning/src/index.html');
  
  // Fill in the dimension inputs in the first row
  await this.page!.getByTestId('length').first().fill(length);
  await this.page!.getByTestId('width').first().fill(width);
  await this.page!.getByTestId('height').first().fill(height);
});

When('I check the volume', async function (this: CustomWorld) {
  // The volume is calculated reactively on input, so we just wait a moment
  await this.page!.waitForTimeout(100);
});

Then('the total volume should be {string}', async function (this: CustomWorld, expected: string) {
  const totalVolumeText = await this.page!.getByTestId('totalVolume').textContent();
  const totalVolume = parseFloat(totalVolumeText || '0');
  const expectedVolume = parseFloat(expected);
  
  expect(totalVolume).toBeCloseTo(expectedVolume, 5);
});
