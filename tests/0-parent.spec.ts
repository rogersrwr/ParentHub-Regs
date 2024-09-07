import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { json } from 'stream/consumers';

const jsonData = require('C:/Users/ryanr/Desktop/stuff/brightarrow/automation/ParentHub Regs/datetime.json');

const user = '';
const pass = '';
const userDesktop = '';
const passDesktop = '';



test.beforeAll('', async ({ }) => {
  if (jsonData.started == false) {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    // if (hours < 7) {
    //   hours = (hours + 24) - 7;

    // } else if (hours > 7) {
    //   hours = hours -7;
    // }
    // hours = hours - 7;
    // if (hours < 0) {
    //   hours = hours + 24;
    // }

    const formattedDateTime = `${year}-${month}-${day}_${hours}-${minutes}`;
    const msgString = `parent msg ${formattedDateTime}`;
    jsonData.datetime = msgString;
    jsonData.tHour = hours;
    jsonData.tMin = minutes;
    jsonData.tDay = day;
    jsonData.started = true;
    jsonData.failures = false;
    jsonData.finished = false;
    const jsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync('C:/Users/ryanr/Desktop/stuff/brightarrow/automation/ParentHub Regs/datetime.json', jsonString);


  }
});









test('#000-1: Send a private chat message from BrightArrow teacher desktop',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: ''},
    { type: 'Potential Sources of Failure:', description: ''},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
  ],
}, async ({ page }) => {
  
  await page.goto('https://target110.brightarrow.com/r/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill(`${userDesktop}`);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(`${passDesktop}`);

  const [request] = await Promise.all([
    page.waitForResponse(response => response.url().includes("TargetAPI/api/report/GetWeeklySummary?accessToken=") && response.status() === 200, {timeout: 60000}),
    page.getByRole('button', { name: 'Sign in' }).click()
  ]);

  await expect(page.getByText('Welcome, Ryantest5')).toBeVisible();
  await expect(page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByText('Hi, I\'m the new BrightArrow')).toBeVisible();
  await page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByRole('button', { name: 'Close' }).click();  

  await page.locator('div').filter({ hasText: /^Active BrightChats$/ }).click();
  await expect(page.getByRole('link', { name: 'ryantest5 & test contact1'})).toBeVisible();
  await page.getByRole('link', { name: 'ryantest5 & test contact1' }).click();
  await page.getByLabel('Type message here...').click();
  await page.getByLabel('Type message here...').fill(`chat ${jsonData.datetime}`);
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText(`chat ${jsonData.datetime}`)).toBeVisible();

});






test('#000-2: Send a groupchat message from BrightView teacher desktop',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: ''},
    { type: 'Potential Sources of Failure:', description: ''},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
  ],
}, async ({ page }) => {

  await page.goto('https://target110.brightarrow.com/r/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill(`${userDesktop}`);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(`${passDesktop}`);

  const [request] = await Promise.all([
    page.waitForResponse(response => response.url().includes("TargetAPI/api/report/GetWeeklySummary?accessToken=") && response.status() === 200, {timeout: 60000}),
    page.getByRole('button', { name: 'Sign in' }).click()
  ]);

  await expect(page.getByText('Welcome, Ryantest5')).toBeVisible();
  await expect(page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByText('Hi, I\'m the new BrightArrow')).toBeVisible();
  await page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByRole('button', { name: 'Close' }).click();  
  
  await page.locator('div').filter({ hasText: /^Active BrightChats$/ }).click();
  await page.getByRole('link', { name: 'test main groupchat (' }).click();
  await page.getByLabel('Type message here...').click();
  await page.getByLabel('Type message here...').fill(`chat ${jsonData.datetime}`);
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText(`chat ${jsonData.datetime}`)).toBeVisible();

});






test('#000-3: Send a feed message from BrightArrow teacher desktop. informational not urgent, texting only',{
tag: ['@Messages', '@ParentHub'],
annotation: [
  { type: 'Test description', description: ''},
  { type: 'Potential Sources of Failure:', description: ''},
  { type: '', description: '● '},
  { type: '', description: '● '},
  { type: '', description: '● '},
  { type: '', description: '● '},
],
}, async ({ page }) => {

await page.goto('https://target110.brightarrow.com/r/');
await page.getByLabel('Username').click();
await page.getByLabel('Username').fill(`${userDesktop}`);
await page.getByLabel('Password').click();
await page.getByLabel('Password').fill(`${passDesktop}`);

const [request] = await Promise.all([
  page.waitForResponse(response => response.url().includes("TargetAPI/api/report/GetWeeklySummary?accessToken=") && response.status() === 200, {timeout: 60000}),
  page.getByRole('button', { name: 'Sign in' }).click()
]);

await expect(page.getByText('Welcome, Ryantest5')).toBeVisible();
await expect(page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByText('Hi, I\'m the new BrightArrow')).toBeVisible();
await page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByRole('button', { name: 'Close' }).click();  

await page.locator('div').filter({ hasText: /^My Lists$/ }).click();
await page.getByRole('button', { name: 'ryantest5' }).click();
await page.getByRole('link', { name: 'a parent' }).click();
await page.locator('div').filter({ hasText: 'Edit Message' }).nth(3).click();
await page.getByRole('tab', { name: 'Texting' }).click();
await page.getByLabel('Text Message').click();
await page.getByLabel('Text Message').fill(`feed ${jsonData.datetime} p reg tests`);
await page.getByRole('button', { name: 'Next' }).click();
await page.locator('div').filter({ hasText: /^Send Message Now$/ }).click();
await page.getByRole('button', { name: 'Yes' }).click();
await expect(page.getByText('Welcome, Ryantest5')).toBeVisible();

});







test('#000-4: Send another feed message from BrightArrow teacher desktop. mark as urgent in app, texting only',{
tag: ['@Messages', '@ParentHub'],
annotation: [
  { type: 'Test description', description: ''},
  { type: 'Potential Sources of Failure:', description: ''},
  { type: '', description: '● '},
  { type: '', description: '● '},
  { type: '', description: '● '},
  { type: '', description: '● '},
],
}, async ({ page }) => {
let x = jsonData.tHour + 1;
let pm = false;
if (x > 12){
  x -= 12;
  pm = true;
}

await page.goto('https://target110.brightarrow.com/r/');
await page.getByLabel('Username').click();
await page.getByLabel('Username').fill(`${userDesktop}`);
await page.getByLabel('Password').click();
await page.getByLabel('Password').fill(`${passDesktop}`);

const [request] = await Promise.all([
  page.waitForResponse(response => response.url().includes("TargetAPI/api/report/GetWeeklySummary?accessToken=") && response.status() === 200, {timeout: 60000}),
  page.getByRole('button', { name: 'Sign in' }).click()
]);

await expect(page.getByText('Welcome, Ryantest5')).toBeVisible();
await expect(page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByText('Hi, I\'m the new BrightArrow')).toBeVisible();
await page.frameLocator('iframe[title="Help Scout Beacon - Messages and Notifications"]').getByRole('button', { name: 'Close' }).click();  

await page.locator('div').filter({ hasText: /^My Lists$/ }).click();
await page.getByRole('button', { name: 'ryantest5' }).click();
await page.getByRole('link', { name: 'a parent' }).click();
await page.locator('div').filter({ hasText: 'Edit Message' }).nth(3).click();
await page.getByLabel('Choose date').click();
await page.getByRole('gridcell', { name: `${jsonData.tDay}` }).click();

await page.getByLabel(`${x} hours`, { exact: true }).click();

if (pm == false) {
  await page.getByLabel('AM', { exact: true }).click();
} else {
  await page.getByLabel('PM').click();
}

await page.getByRole('tab', { name: 'Proceed' }).click();
await page.getByRole('tab', { name: 'Texting' }).click();
await page.getByLabel('Text Message').click();
await page.getByLabel('Text Message').fill(`urgent ${jsonData.datetime}`);
await page.getByRole('button', { name: 'Next' }).click();
await page.locator('div').filter({ hasText: /^Send Message Now$/ }).click();
await page.getByRole('button', { name: 'Yes' }).click();
await expect(page.getByText('Welcome, Ryantest5')).toBeVisible();

});






