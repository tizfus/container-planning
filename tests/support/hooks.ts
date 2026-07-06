import { Before, After, setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import CustomWorld from './world';

setWorldConstructor(CustomWorld);
setDefaultTimeout(60000);

const PROJECT_FOLDER_NAME = 'container-planning'; 
const PROJECT_PATH = __dirname.substring(0, __dirname.indexOf(PROJECT_FOLDER_NAME)) + PROJECT_FOLDER_NAME;
const BASE_URL = `file://${PROJECT_PATH}/src/index.html`;

Before(async function (this: CustomWorld) {
    await this.init();
    await this.page.goto(BASE_URL);
});

After(async function (this: CustomWorld) {
    await this.close();
});
