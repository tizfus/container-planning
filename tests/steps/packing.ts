import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

const Container = require('../../src/container-view');

let container: any;
let products: any[];
let result: any;

Before(function(){
    container = undefined;
    products = [];
    result = undefined!;
})


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
  products.push({ length, width, height, quantity });
});

When('products are packed', function () {
  result = Container.pack(container, products);
});

Then('there are {int} layers', function (count: number) {
  expect(result.layers.length).toBe(count);
});

Then('layer no. {int} has {int} products', function (index: number, count: number) {
  expect(result.layers[index - 1].placements.length).toBe(count);
});