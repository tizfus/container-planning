import { Given, Then } from '@cucumber/cucumber';
import CustomWorld from "../support/world";
import { expect } from '@playwright/test';

Given('no products', async function (this: CustomWorld) {
  // Do nothing
});

Then('the total volume is {int}', async function (this: CustomWorld, expected: number) {
  const totalVolumeText = await this.page!.getByTestId('totalVolume').textContent();

  expect(totalVolumeText).not.toBeNull();

  const totalVolume = parseFloat(totalVolumeText!);
  const expectedVolume = parseFloat(String(expected));
  
  expect(totalVolume).toBeCloseTo(expectedVolume, 5);
});

Given('a product with length {float} width {float} height {float}', async function (
  this: CustomWorld,
  length: number,
  width: number,
  height: number
) { 
  await this.page!.getByTestId('length').last().fill(String(length));
  await this.page!.getByTestId('width').last().fill(String(width));
  await this.page!.getByTestId('height').last().fill(String(height));
});

Given('{int} products with length {int} width {int} height {int}', async function (
  this: CustomWorld,
  quantity: number,
  length: number,
  width: number,
  height: number
) {
  await this.page!.getByTestId('quantity').last().fill(String(quantity));
  await this.page!.getByTestId('length').last().fill(String(length));
  await this.page!.getByTestId('width').last().fill(String(width));
  await this.page!.getByTestId('height').last().fill(String(height));
});