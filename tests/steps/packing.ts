import { Given, When, Then, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

const ContainerView = require('../../src/container-view');

let container: any;
let products: any[];
let layers: any[];

Given('a container with length {int}cm width {int}cm height {int}cm', function (
  length: number,
  width: number,
  height: number
) {
  container = { length, width, height };
});

Given('{int} products have length {int}cm width {int}cm height {int}cm', function (
  quantity: number,
  length: number,
  width: number,
  height: number
) {
  products = [{ length, width, height, quantity }];
});

When('products are packed', function () {
  layers = ContainerView.pack(container, products);
});

Then('there are {int} layers', function (count: number) {
  expect(layers.length).toBe(count);
});

Then('the first layer should have {int} products', function (count: number) {
  expect(layers[0].placements.length).toBe(count);
});

After(function(){
    container = undefined;
    products = undefined!;
    layers = undefined!;
})
