import { World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export default class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(opts: any) {
      super(opts);
  }

  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext({ recordVideo: { dir: 'report/videos/' } });
    this.page = await this.context.newPage();
  }

  async close() {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
  }
}