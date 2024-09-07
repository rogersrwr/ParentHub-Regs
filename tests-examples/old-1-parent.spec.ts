import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { json } from 'stream/consumers';

const jsonData = require('C:/Users/ryanr/Desktop/stuff/brightarrow/automation/ParentHub Regs/datetime.json');

const user = '';
const pass = '';



/*
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
*/









test('#000-: Confirm chat msg received on Parent Hub',{
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
    await page.goto('https://target110.brightarrow.com/m/');
    await page.getByRole('button', { name: 'Parent / Student Login' }).click();
    await page.getByLabel('Enter your phone number').click();
    await page.getByLabel('Enter your phone number').fill(`${user}`);
    await page.getByLabel('Enter your password').click();
    await page.getByLabel('Enter your password').fill(`${pass}`);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('button', { name: 'Cancel' }).click();

    await page.locator('div').filter({ hasText: /^CHATS$/ }).click();
    await expect(page.getByText('1', { exact: true })).toBeVisible();   //checks if symbol for new # of msgs is visible
    await page.getByText('RT ryan testphone parent0').first().click();
    await expect(page.getByText(`${jsonData.datetime}`)).toBeVisible();

});






test('#000-: Confirm feed msg received on Parent Hub',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^FEEDS$/ }).click();
  await expect(page.getByText(`feed ${jsonData.datetime}`)).toBeVisible();
  await page.getByText(`feed ${jsonData.datetime}`).click();
  await expect(page.locator('p').filter({ hasText: /^Text Message:$/ })).toBeVisible();
  await expect(page.getByText(`feed ${jsonData.datetime}`)).toBeVisible();
});





test('#000-: Confirm URGENT feed msg received on Parent Hub',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^FEEDS$/ }).click();
  await expect(page.getByText(`urgent ${jsonData.datetime}`)).toBeVisible();
  await page.locator('div').filter({ hasText: /^ALERTS$/ }).click();
  await expect(page.getByText(`urgent ${jsonData.datetime}`)).toBeVisible();
  await page.getByText(`urgent ${jsonData.datetime}`).click();
  await expect(page.getByText('Text Message:')).toBeVisible();
  await expect(page.getByText(`urgent ${jsonData.datetime}`)).toBeVisible();

});



test('#001: Log in and check Favorites tab',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Uses the BrightArrow URL with a "/m/" ending to access the ParentHub app through desktop. Logs into account. Goes to Favorites and verifies previously saved favorite is still there.'},
    { type: 'Potential Sources of Failure:', description: ''},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
  ],
}, async ({ page }) => {
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^FEEDS$/ }).getByRole('img').click();
  await page.getByText('FAVORITES').click();
  await expect(page.getByText('(Re: phone parent.) msg 8/18/')).toBeVisible();

});



test('#002: Search for specific feed and pin it',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^FEEDS$/ }).getByRole('img').click();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByLabel('Search').click();
  await page.getByLabel('Search').fill('#013 test msg at 2024-6-5_0-32');
  await page.locator('#searchBarBtn').click();
  await expect(page.getByText('#013 test msg at 2024-6-5_0-')).toBeVisible();
  await page.locator('div').filter({ hasText: /^RTryan test phone parent$/ }).getByLabel('settings').click();
  await page.getByText('FAVORITES').click();
  await expect(page.getByText('#013 test msg at 2024-6-5_0-')).toBeVisible();
});




test('#003: Unpin a favorited feed',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^FEEDS$/ }).getByRole('img').click();
  await page.locator('div').filter({ hasText: /^FAVORITES$/ }).click();
  await page.locator('#FeedID_e6uofo div').filter({ hasText: 'RTryan test phone parent' }).getByLabel('settings').click();
  await expect(page.getByText('#013 test msg at 2024-6-5_0-')).not.toBeVisible();

  await page.locator('div').filter({ hasText: /^ALL$/ }).first().click();
  await page.locator('div').filter({ hasText: /^FAVORITES$/ }).click();
  await expect(page.getByText('#013 test msg at 2024-6-5_0-')).not.toBeVisible();
});



test('#004: Go to Chats tab, open up an old chat and verify everything is where it should be',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^CHATS$/ }).click();
  await page.locator('div').filter({ hasText: /^RT ryan testphone parent0topic test206\/18\/24 1:37 AM$/ }).getByRole('button').click();
  await expect(page.getByText('with groupchat marked')).toBeVisible();
  await expect(page).toHaveScreenshot("004-chat-open.png", { fullPage: true });
});



test('#005: Verify terms of service page is working as expected',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByRole('button', { name: 'Terms of Service' }).click();
  await expect(page.getByRole('heading', { name: 'Terms of Service' })).toBeVisible();
  await expect(page.getByText('BrightArrow\'s Privacy and')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^FEEDS$/ }).getByRole('img')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^FEEDS$/ })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^CHATS$/ })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^MENU$/ })).toBeVisible();
  //await expect(page).toHaveScreenshot("005-TOS.png", { fullPage: true });
});





test('#006: Verify Settings > Change Password',{
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


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('button', { name: 'Change Password' }).click();
  await expect(page.getByText('Current Password', { exact: true })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^FEEDS$/ })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^CHATS$/ })).toBeVisible();
  await expect(page).toHaveScreenshot("006-Settings-ChangeP.png", { fullPage: true });
});





test('#007: Verify Settings > Language Preferences',{
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


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();


  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('button', { name: 'Language Preferences' }).click();
  await expect(page.getByText('Note: Please limit the number')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^FEEDS$/ })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^CHATS$/ })).toBeVisible();
  //await expect(page).toHaveScreenshot("007-Settings-LanguagePref.png", { fullPage: true });
});





test('#008: Verify Settings > Do Not Disturb',{
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


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('button', { name: 'Do Not Disturb' }).click();
  await expect(page.getByText('Always notify me')).toBeVisible();
  await expect(page.getByText('Do not disturb me during')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^FEEDS$/ })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^CHATS$/ })).toBeVisible();
  //await expect(page).toHaveScreenshot("008-Settings-LanguagePref.png", { fullPage: true });
});





test('#009: Verify Settings > Delete Account',{
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


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('button', { name: 'Delete Account' }).click();
  await expect(page.getByRole('heading', { name: 'Delete Account' })).toBeVisible();
  await expect(page.getByText('Do you wish to delete your')).toBeVisible();
  //await expect(page).toHaveScreenshot("009-Settings-DeleteAcct.png", { fullPage: true });

});






test('#010: Chats > Group',{
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


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^CHATS$/ }).click();
  await page.locator('div').filter({ hasText: /^GROUP$/ }).click();
  await expect(page.getByText('topic test2')).toBeVisible();
});





test('#011: Chats > Private',{
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


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^CHATS$/ }).click();
  await page.locator('div').filter({ hasText: /^PRIVATE$/ }).click();
});






test('#012: Feed > Urgent',{
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


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^FEEDS$/ }).click();
  await page.locator('div').filter({ hasText: /^ALERTS$/ }).click();

});





test('#013: Chat > Popup when trying to send an empty message',{
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


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^FEEDS$/ }).click();
  await page.locator('div').filter({ hasText: /^ALERTS$/ }).click();
});





test('#014: ',{
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


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

});





test('#015: send a msg',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^CHATS$/ }).click();
  await page.getByText('RT ryan testphone parent0').first().click();
  await page.getByText('Write your message').nth(1).click();
  await page.getByRole('textbox', { name: 'Write your message' }).click();
  await page.getByRole('textbox', { name: 'Write your message' }).fill(`reply ${jsonData.datetime}`);
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.locator('div:nth-child(4) > div > .MuiBox-root').click();
  await expect(page.getByText(`reply ${jsonData.datetime}`)).toBeVisible();

});






test('#016: search filter. Search type: From. Sender: ryan test',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^FEEDS$/ }).click();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByTestId('MoreVertIcon').click();
  await page.getByLabel('Message').click();
  await page.getByRole('option', { name: 'From' }).click();
  await page.getByRole('combobox', { name: '​', exact: true }).click();
  await page.getByRole('option', { name: 'ryan test' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

});






test('#017: search filter test 2. Search type: To. Receiver: parent, phone',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.locator('div').filter({ hasText: /^FEEDS$/ }).click();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByTestId('MoreVertIcon').click();
  await page.getByLabel('Message').click();
  await page.getByRole('option', { name: 'To' }).click();
  await page.getByRole('combobox', { name: '​', exact: true }).click();
  await page.getByRole('option', { name: 'parent, phone' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

});





test('#018: feed filter test 1. Recent Days: 1. Message Types: All',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByTestId('FilterListOffIcon').locator('path').click();
  await page.getByLabel('90').click();
  await page.getByRole('option', { name: '1', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  
});







test('#019: feed filter test 2. Recent Days: 7. Message Types: All',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByTestId('FilterListOffIcon').locator('path').click();
  await page.getByLabel('90').click();
  await page.getByRole('option', { name: '7', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  
});







test('#020: feed filter test 3. Recent Days: 30. Message Types: All',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByTestId('FilterListOffIcon').locator('path').click();
  await page.getByLabel('90').click();
  await page.getByRole('option', { name: '30', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  
});




test('#021: feed filter test 4. Recent Days: 60. Message Types: All',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByTestId('FilterListOffIcon').locator('path').click();
  await page.getByLabel('90').click();
  await page.getByRole('option', { name: '60', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  
});








test('#022: feed filter test 5. Recent Days: 90. Message Types: All',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByTestId('FilterListOffIcon').locator('path').click();
  await page.getByLabel('90').click();
  await page.getByRole('option', { name: '90', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  
});






test('#023: feed filter test 5. Recent Days: 180. Message Types: All',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByTestId('FilterListOffIcon').locator('path').click();
  await page.getByLabel('90').click();
  await page.getByRole('option', { name: '180', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  
});








test('#024: feed filter test 6. Recent Days: 360. Message Types: All',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByTestId('FilterListOffIcon').locator('path').click();
  await page.getByLabel('90').click();
  await page.getByRole('option', { name: '360', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  
});




test('#025: feed filter test 7. Recent Days: 1. Message Types: Chat Invite Received',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByTestId('FilterListOffIcon').locator('path').click();
  await page.getByLabel('90').click();
  await page.getByRole('option', { name: '1', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  
});






test('#026: feed filter test 8. Recent Days: 7. Message Types: Chat Invite Received',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByTestId('FilterListOffIcon').locator('path').click();
  await page.getByLabel('90').click();
  await page.getByRole('option', { name: '7', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  
});








test('#027: feed filter test 9. Recent Days: 30. Message Types: Chat Invite Received',{
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
  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Parent / Student Login' }).click();
  await page.getByLabel('Enter your phone number').click();
  await page.getByLabel('Enter your phone number').fill(`${user}`);
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(`${pass}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.getByTestId('FilterListOffIcon').locator('path').click();
  await page.getByLabel('90').click();
  await page.getByRole('option', { name: '30', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  
});




