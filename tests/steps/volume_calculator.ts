import { Given, When, Then } from '@cucumber/cucumber';
import CustomWorld from "../support/world";
import { expect } from '@playwright/test';

Given('a product with length {string} width {string} height {string}', async function (
  this: CustomWorld,
  length: string,
  width: string,
  height: string
) { 
  await this.page!.getByTestId('length').first().fill(length);
  await this.page!.getByTestId('width').first().fill(width);
  await this.page!.getByTestId('height').first().fill(height);
});

When('I check the volume', async function (this: CustomWorld) {
  await this.page!.getByTestId('totalVolume').isVisible();
});

Then('the total volume should be {string}', async function (this: CustomWorld, expected: string) {
  const totalVolumeText = await this.page!.getByTestId('totalVolume').textContent();

  expect(totalVolumeText).not.toBeNull();

  const totalVolume = parseFloat(totalVolumeText!);
  const expectedVolume = parseFloat(expected);
  
  expect(totalVolume).toBeCloseTo(expectedVolume, 5);
});

When('I check size inputs', async function (this: CustomWorld) {
  await this.page!.getByTestId('length').isVisible();
  await this.page!.getByTestId('width').isVisible();
  await this.page!.getByTestId('height').isVisible();
});

Then('length should be {string}', async function (this: CustomWorld, expected: string) {
  const value = await this.page!.getByTestId('length').inputValue();
  expect(value).toBe(expected);
});

Then('width should be {string}', async function (this: CustomWorld, expected: string) {
  const value = await this.page!.getByTestId('width').inputValue();
  expect(value).toBe(expected);
});

Then('the height should be {string}', async function (this: CustomWorld, expected: string) {
  const value = await this.page!.getByTestId('height').inputValue();
  expect(value).toBe(expected);
});
