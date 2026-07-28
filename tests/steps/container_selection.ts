import { Given, Then } from '@cucumber/cucumber';
import CustomWorld from "../support/world";
import { expect } from '@playwright/test';

Then('the 20ft container is selected', async function (this: CustomWorld) {
  const select = this.page!.getByTestId('container-select');
  await select.isVisible();
  const selectedValue = await select.inputValue();
  expect(selectedValue).toBe('20ft');
});

Then('container volume is {int}', async function (this: CustomWorld, expected: number) {
  const containerVolumeText = await this.page!.getByTestId('containerVolume').textContent();
  expect(containerVolumeText).not.toBeNull();
  const containerVolume = parseInt(containerVolumeText!, 10);
  expect(containerVolume).toBe(expected);
});

Then('the container volume element is white', async function (this: CustomWorld) {
  const element = this.page!.getByTestId('containerVolume');
  const color = await element.evaluate(el => window.getComputedStyle(el).color);
  expect(color).toBe('rgb(255, 255, 255)');
});

Then('the container volume element is red', async function (this: CustomWorld) {
  const element = this.page!.getByTestId('containerVolume');
  const color = await element.evaluate(el => window.getComputedStyle(el).color);
  expect(color).toBe('rgb(255, 0, 0)');
});
