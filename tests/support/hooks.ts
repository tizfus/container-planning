import { Before, After, setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import CustomWorld from './world';

setWorldConstructor(CustomWorld);
setDefaultTimeout(60000);


function getBaseUrl(): string {
    const reversedPath = __dirname.split('/').reverse();
    
    const projectFolderName = 'container-planning'; 
    const projectPath = reversedPath.slice(reversedPath.indexOf(projectFolderName))
        .reverse()
        .join('/');

    return `file://${projectPath}/src/index.html`;
}


Before(async function (this: CustomWorld) {
    await this.init();
    await this.page.goto(getBaseUrl());
});

After(async function (this: CustomWorld) {
    await this.close();
});
