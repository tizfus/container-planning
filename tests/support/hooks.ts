import { Before, After, setDefaultTimeout, setWorldConstructor, ITestCaseHookParameter } from '@cucumber/cucumber';
import CustomWorld from './world';
import * as fs from 'fs';

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

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
    const video = this.page.video();
    await this.close();

    if (scenario.result?.status !== 'FAILED' && video) {
        const videoPath = await video.path();
        fs.unlinkSync(videoPath);
    }
});
