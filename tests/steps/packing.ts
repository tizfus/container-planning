import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import CustomWorld from '../support/world';

When('the 20ft container is selected', async function (this: CustomWorld) {
  const select = this.page!.getByTestId('container-select');
  await select.selectOption('20ft');
  expect(await select.inputValue()).toBe('20ft');
});

Then('there are {int} layers', async function (this: CustomWorld, count: number) {
  const layers = this.page!.getByTestId('layer');
  expect(await layers.count()).toBe(count);
});

Then('layer no. {int} has {int} products', async function (this: CustomWorld, index: number, count: number) {
  const layer = this.page!.getByTestId('layer').nth(index - 1);
  const placements = layer.getByTestId('layer-product');
  expect(await placements.count()).toBe(count);
});

Then('container is overfilled', async function (this: CustomWorld) {
  const element = this.page!.getByTestId('containerVolume');
  const color = await element.evaluate(el => window.getComputedStyle(el).color);
  expect(color).toBe('rgb(255, 0, 0)');
});
