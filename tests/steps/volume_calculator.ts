import { Given, When, Then } from '@cucumber/cucumber';
import CustomWorld from "../support/world";
import { expect } from '@playwright/test';

Given('a product with length {string} width {string} height {string}', async function (
  this: CustomWorld,
  length: string,
  width: string,
  height: string
) { 
  await this.page!.getByTestId('length').last().fill(length);
  await this.page!.getByTestId('width').last().fill(width);
  await this.page!.getByTestId('height').last().fill(height);
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
  await this.page!.getByTestId('length').first().isVisible();
  await this.page!.getByTestId('width').first().isVisible();
  await this.page!.getByTestId('height').first().isVisible();
});

Then('length should be {string}', async function (this: CustomWorld, expected: string) {
  const value = await this.page!.getByTestId('length').first().inputValue();
  expect(value).toBe(expected);
});

Then('width should be {string}', async function (this: CustomWorld, expected: string) {
  const value = await this.page!.getByTestId('width').first().inputValue();
  expect(value).toBe(expected);
});

Then('the height should be {string}', async function (this: CustomWorld, expected: string) {
  const value = await this.page!.getByTestId('height').first().inputValue();
  expect(value).toBe(expected);
});

When('the volume is different than zero', async function (this: CustomWorld) {
  const totalVolumeText = await this.page!.getByTestId('totalVolume').textContent();
  expect(parseFloat(totalVolumeText!)).toBeGreaterThan(0);
});

When('there is at least a product', async function (this: CustomWorld) {
  const productsCount = await this.page!.getByTestId('product-size').count();
  expect(productsCount).toBeGreaterThan(1);

  var lengthValue = await this.page!.getByTestId('product-size').getByTestId('length').first().inputValue();
  expect(lengthValue).not.toBe('');

  var widthValue = await this.page!.getByTestId('product-size').getByTestId('width').first().inputValue();
  expect(widthValue).not.toBe('');

  var heightValue = await this.page!.getByTestId('product-size').getByTestId('height').first().inputValue();
  expect(heightValue).not.toBe('');
});

Then('there should be {string} products', async function (this: CustomWorld, expected: string) {
  const productRows = this.page!.getByTestId('product-size');
  // Subtract 1 to exclude the empty row for the next product
  const count = await productRows.count() - 1; 
  expect(count).toBe(parseInt(expected));
});

Then('last line is ready for the next product', async function (this: CustomWorld) {
  const productRows = this.page!.getByTestId('product-size');
  const count = await productRows.count();
  const lastRow = productRows.nth(count - 1);
  const lengthValue = await lastRow.getByTestId('length').inputValue();
  const widthValue = await lastRow.getByTestId('width').inputValue();
  const heightValue = await lastRow.getByTestId('height').inputValue();
  expect(lengthValue).toBe('');
  expect(widthValue).toBe('');
  expect(heightValue).toBe('');
});
