import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { json } from 'stream/consumers';

const jsonData = require('C:/Users/ryanr/Desktop/stuff/brightarrow/automation/ParentHub Regs/datetime.json');

const user = process.env.ACCT_LOGIN;
const pass = process.env.ACCT_PASS;



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







test('#001: Confirm private chat message received on ParentHub',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Within the pre-test setup, a chat is sent from a sender account to the ParentHub account being tested to confirm that the chat is received as expected.'},
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








test('#002: Confirm group chat message received on ParentHub',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Within the pre-test setup, a chat is sent to a group chat that the ParentHub account being tested is a part of to confirm that the chat is received as expected.'},
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
  await expect(page.getByText('1', { exact: true })).toBeVisible();   //checks if symbol for new # of msgs is visible
  await page.locator('div').filter({ hasText: /^R ryantest5parent phone0test main groupchat 08\/10\/24 12:32 AM$/ }).getByRole('button').click();

  await expect(page.getByText(`${jsonData.datetime}`)).toBeVisible();

});









test('#003: Confirm feed message received on ParentHub',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Within the pre-test setup, a message is sent to the ParentHub account being tested to confirm that the feed is received as expected. Then clicks on the feed message to confirm the expanded feed view works as expected.'},
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
  await expect(page.getByText(`feed ${jsonData.datetime} p reg tests`)).toBeVisible();
  await page.getByText(`feed ${jsonData.datetime} p reg tests`).click();
  await expect(page.locator('p').filter({ hasText: /^Text Message:$/ })).toBeVisible();
  await expect(page.getByText(`feed ${jsonData.datetime} p reg tests`)).toBeVisible();
});






test('#004: Confirm *Urgent* feed message received on ParentHub',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Similar to the previous test, a message is sent from a sender account with the option to “Mark as Urgent in App Until” filled out to have the “End Date” be one hour from the start time of whenever the test suite is run. The ParentHub automated test then will use Playwright’s visual regression tool to check that the message is properly received within Feeds > All and Feeds > Alerts with the red exclamation icon. '},
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






test('#005: Log in and check Favorites tab',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Logs in and navigates to Feeds > Favorites and uses a visual regression tool to confirm that a saved feed message is still there. Then clicks on the saved feed and confirms the expanded feed view is working as expected.'},
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









test('#006: Search for specific feed and pin it',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to the Feeds tab, and then clicks the search icon to look for a previously received feed by inputting the full feed message into the search bar. Once the searched for feed appears, the pin icon on the top right of the feed is clicked. Then backs out of search and navigates to Feeds > Favorites and confirms that the feed now appears in Favorites.'},
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








test('#007: Unpin a favorited feed',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Feeds > Favorites, confirms that the feed pinned in the previous test is still there. Then taps the pin icon in the recently added feed message to remove it from the favorites tab. Uses a visual regression tool to confirm that the message has been properly removed. '},
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






test('#008: Confirm an old chat still works as expected',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Chats tab, opens up an old chat and verifies messages are still there. I’ve had some instances of chats disappearing in the past so this is a check against that. '},
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







test('#009: Verify terms of service page is working as expected',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Menu > Terms of Service and uses a visual regression tool to confirm that TOS is working as expected. '},
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








test('#010: Verify Settings > Change Password',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Menu > Settings > Change Password and confirms that everything on this page appears as expected. Then changes password. '},
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








test('#011: Verify password has been changed',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to the ParentHub login page and tries to login with old password. Ensures that the old password does not work and the "login invalid" popup appears. Then uses the new password to login, and changes password back to original password.'},
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






test('#012: Verify Settings > Language Preferences',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Menu > Settings > Language Preferences and confirms that everything on this page appears as expected. I’ve created an automation to change the language and confirm that the feature is working as expected. However, I am not currently running this as I run the test suite repeatedly when creating new tests and do not want to negatively impact test suite performance by changing languages several times in a test session. This is something I will fully turn on once the test suite reaches a v1.0 and is run on an automated schedule. '},
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





test('#013: Settings > Do Not Disturb > Until further notice',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Menu > Settings > Do Not Disturb and selects "Do not disturb until further notice". Then clicks "Submit" button, backs out and re enters and confirms changes have been saved. A message is then sent from a sender account to the ParentHub account, and then confirms that there are no notifications from this test.'},
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







test('#014: Settings > Do Not Disturb > Do not disturb me at these times',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Menu > Settings > Do Not Disturb and selects "Do not disturb me during these times". The "Start Time" is the preselected time you get when you enter this screen, which is the current time. The "End Time" is marked as an hour from the moment this test began. Then clicks "Submit" button, backs out and re enters and confirms changes have been saved. A message is then sent from a sender account to the ParentHub account, and then confirms that there are no notifications from this test. '},
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







test('#015: Settings > Do Not Disturb > Always notify me',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Menu > Settings > Do Not Disturb and selects ‘Always notify me’. Then clicks ‘Submit’ button, backs out and re enters and confirms changes have been saved. A message is then sent from a sender account to the ParentHub account, and then confirms that notifications are being properly received again.'},
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









test('#016: Visually verify Settings > Delete Account',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Menu > Settings > Delete Account and confirms everything is visually as expected. At the moment, I don’t fully test the delete account functionality, this is something I will maybe circle back to later. '},
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









test('#017: Chats > Group > send a message',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Chats > Group and selects group chat. Then sends a message to the group chat. Backs out and re-enters the same group chat to confirm that the recently sent message is still there. A later test in the suite confirms that the group chat message was properly received by another user. '},
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

  await expect(page.getByText('test main groupchat')).toBeVisible();
  await page.locator('div').filter({ hasText: /^R ryantest5parent phone0test main groupchat 08\/10\/24 12:32 AM$/ }).getByRole('button').click();
  await page.getByText('Write your message').nth(1).click();
  await page.getByRole('textbox', { name: 'Write your message' }).click();
  await page.getByRole('textbox', { name: 'Write your message' }).fill(`msg from parent datetime ${jsonData.datetime}`);
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.getByTestId('SendIcon').click();
  await expect(page.getByText(`msg from parent datetime ${jsonData.datetime}`)).toBeVisible();

});









test('#018: Chats > Private > send a message',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Chats > Private and selects a private chat. Then sends a message to the private chat. Backs out and re-enters the same chat to confirm that the recently sent chat is still there. A later test in the suite confirms that the chat was properly received by another user. '},
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

  await expect(page.getByText('ryantest5 & test contact1')).toBeVisible();
  await page.locator('div').filter({ hasText: /^R ryantest5test contact10ryantest5 & test contact108\/10\/24 12:32 AM$/ }).getByRole('button').click();
  await page.getByText('Write your message').nth(1).click();
  await page.getByRole('textbox', { name: 'Write your message' }).click();
  await page.getByRole('textbox', { name: 'Write your message' }).fill(`msg from parent ${jsonData.datetime}`);
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.locator('div:nth-child(5)').click();
  await expect(page.getByText(`msg from parent ${jsonData.datetime}`)).toBeVisible();

});









test('#019: Feed > Reply Privately',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds and selects a feed message sent by the sender account in pre-test setup. (The sender sent this feed message with the Start BrightChat button, with only private replies checked.) Feed message is clicked on to show the expanded view. The "reply privately" button is then pressed, and a response chat is sent by the ParentHub account. A later test in the suite confirms that the group chat message was properly received by another user. '},
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
  await page.getByText(`feed ${jsonData.datetime} p reg tests`).click();

});








test('#020: Feed > Reply To Group',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds and selects another feed message sent by the sender account. Feed message is clicked on for the expanded view. The ‘reply to group’ button is pressed, and a response chat is sent by the ParentHub account. A later test in the suite confirms that the group chat message was properly received by another user. '},
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







test('#021: Search feature in chat',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Chats and selects a chat. Then clicks the search icon in the top left, enters a previous chat message, and then clicks the search icon again to search. Then a visual regression test to confirm the message is properly displayed.'},
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










test('#022: Disable chat',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to a chat, then selects the people icon in the top right. Then selects "Disable". A message is then sent from the sender account to this chat. Then confirms that: notifications are not received from this chat and that the chat bar in the Chats tab is marked as "disabled".'},
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





test('#023: Enable chat',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to a chat, then selects the same icon as the previous test. Then selects "Enable". A message is then sent from the sender account to this chat. Then confirms that: notifications are now received from this chat and that the chat bar in the Chats tab is no longer marked as "disabled".'},
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






test('#024: Send an attachment in chat',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Selects a chat, then clicks the attachment icon in the bottom left. Adds an attachment jpg and then clicks the send button. Confirms attachment is properly sent from the ParentHub account and properly received from the BrightView account the attachment is sent to.'},
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










test('#025: Send an empty message to get pop up',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to a chat, then hits the send chat icon without inputting any text or attachments. Expects the popup "Please enter a message" to appear. '},
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













test('#026: Help and support',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Menu > Help and Support, verifies that everything is visually as expected. '},
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







test('#027: Help and support > Link 1 (email support)',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigate to Menu > Help and Support, and clicks on the first link, email support. Visually confirms you are brought to Help and Support Information screen. Exits out without actually submitting a report so as to not spam support.'},
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






test('#028: Help and support > Link 2 (get help)',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigate to Menu > Help and Support, and clicks on the second link, get help. Visually confirms you are brought to the Brightarrow Knowledge base. '},
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





test('#029: Help and support > Link 3 (update)',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Menu > Help and Support, and clicks the third link, update. Visually confirms that the Reload App pop up appears as expected (this assumes the web version of the app will not need to restart to update, I may be wrong about that). Then clicks "yes" to reload anyways. Then verifies that app reloads as expected.'},
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






test('#030: Logout button, and then log back in',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Menu, then clicks the "Log out" button and verifies you are brought to the “Let’s Get Started” page. Then selects Parent / Student Login and logs back into account.'},
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







test('#031: Feeds Filter Types. Recent Days, 1. Message Types, All.',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds, then selects the Filters icon. Changes Recent Days from the default (90) to 1. Clicks "ok" and then tries to search for a message that was sent more than a day before the test suite run was started. Waits and ensures that the message does not appear because of the recently set filter. '},
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






test('#032: Feeds Filter Types, reset button',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds, selects the Filters icon. Changes Recent Days from default (90) to 1. Clicks "ok". Then runs same test as #030 to confirm the filter is still working. Then clicks the filter icon again, and selects ‘reset’. Then searches for message that was filtered out and confirms the searched for message now appears as expected. '},
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






test('#033: Pin a feed message from expanded view',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds, then selects a feed message to bring up the expanded view. The pin icon is clicked to add the feed message to the Favorites tab. Then backs out of the expanded Feed view and goes to the Favorites tab and ensures the message is correctly shown in the Favorites tab.'},
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







test('#034: Unpin a feed message from expanded view',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds, then searches for message that was pinned in previous test (#034). Then clicks on the feed message to bring up the expanded view and clicks on the pin icon to unpin it. Then backs out of expanded view, goes to favorites tab and uses visual comparison tool to ensure that feed message has been properly removed. '},
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










test('#035: Search for a chat conversation in Chats > All',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Chats > All and then clicks the search icon. Inputs the name of a previous chat conversation and then clicks the search icon again. Ensures that the conversation appears as expected. '},
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






test('#036: Search for a chat message within a conversation',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Chats > All and then clicks on a conversation. Then searches for a previously sent message within this conversation and expects the message to be found.'},
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






test('#037: Search for a chat conversation in Chats > Group',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Chats > Group and clicks the search icon. Inputs the name of a previous group chat conversation and then clicks the search icon again. Ensures that the conversation appears as expected. Then searches for a private chat conversation and ensures it does not appear.'},
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








test('#038: Search for a chat conversation in Chats > Private',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Chats > Private and clicks the search icon. Inputs the name of a previous private chat conversation and then clicks the search icon again. Ensures that the conversation appears as expected. Then searches for a group chat conversation and ensures it does not appear.'},
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









test('#039: Staff / Faculty Login',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to ParentHub Login page, selects “Staff / Faculty Login”, and then logs in with Staff account. Currently I’m unable to use my own sender accounts?'},
    { type: 'Potential Sources of Failure:', description: ''},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
  ],
}, async ({ page }) => {


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('button', { name: 'Staff / Faculty Login' }).click();
  await page.getByLabel('Enter your email address').click();
  await page.getByLabel('Enter your email address').fill('sdsd');
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill('sdsdsd');
  await page.getByRole('button', { name: 'Sign in' }).click();

});









test('#040: Privacy Policy link from Login page',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'The automation goes to the Parent Hub Login page and clicks the “Privacy Policy” link. Uses visual regression tool to ensure that everything is loading correctly.'},
    { type: 'Potential Sources of Failure:', description: ''},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
  ],
}, async ({ page }) => {


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByRole('link', { name: 'Privacy Policy' }).click();

});






test('#041: Login Page > Get Help link > Mobile App Help',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to the ParentHub login page, then clicks the “Get Help” link and ensures you are brought to the correct page with 3 buttons. Then clicks “Mobile App Help” button and ensures you are brought to the expected page.'},
    { type: 'Potential Sources of Failure:', description: ''},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
  ],
}, async ({ page }) => {


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByText('Get Help').click();
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Mobile App Help' }).click();
  const page3 = await page3Promise;

});








test('#042: Login Page > Get Help link > Delete Account Help',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to the ParentHub login page, then clicks the “Get Help” link and ensures you are brought to the correct page with 3 buttons. Then clicks “Delete Account Help” button and ensures you are brought to the expected page.'},
    { type: 'Potential Sources of Failure:', description: ''},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
  ],
}, async ({ page }) => {


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByText('Get Help').click();
  const page4Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Delete Account Help' }).click();
  const page4 = await page4Promise;

});






test('#043: Login Page > Get Help link > Contact Support',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to the ParentHub login page, then clicks the “Get Help” link and ensures you are brought to the correct page with 3 buttons. Then clicks “Contact Support” button and ensures you are brought to the expected page but does not fill out and submit a support request.'},
    { type: 'Potential Sources of Failure:', description: ''},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
    { type: '', description: '● '},
  ],
}, async ({ page }) => {


  await page.goto('https://target110.brightarrow.com/m/');
  await page.getByText('Get Help').click();
  await page.getByRole('button', { name: 'Contact Support' }).click();

});




test('#044: Staff Directory visual check',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Menu, then selects Staff Directory. Checks that page loads and displays info correctly.'},
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


  await page.getByRole('button', { name: 'Staff Directory' }).click();
  await expect(page.getByRole('heading', { name: 'Staff Directory' })).toBeVisible();
  await expect(page.getByText('All Schools')).toBeVisible();
  await expect(page.getByText('Bily, Raymond')).toBeVisible();


});





test('#045: Staff Directory, favorite a directory contact',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to staff directory and then clicks the star icon to favorite contact Izzy Elskamp. Backs out and back into staff directory to verify that newly favorited contact is now placed at the top of directory.'},
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


  await page.getByRole('button', { name: 'Staff Directory' }).click();
  await expect(page.getByRole('heading', { name: 'Staff Directory' })).toBeVisible();
  await expect(page.getByText('All Schools')).toBeVisible();
  await expect(page.getByText('Bily, Raymond')).toBeVisible();
  await expect(page.getByText('Elskamp, Izzy')).toBeVisible();
  await page.locator('p').filter({ hasText: 'Elskamp, Izzy' }).getByTestId('StarBorderIcon').click();
  await page.getByLabel('settings').click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('button', { name: 'Staff Directory' }).click();
  await expect(page.getByText('Elskamp, Izzy')).toBeVisible();


});






test('#046: Staff Directory, unfavorite a directory contact',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to staff directory and then clicks the star icon to unfavorite contact Izzy Elskamp. Backs out and back into staff directory to verify that the unfavorited contact is now placed in original position.'},
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

  await page.getByRole('button', { name: 'Staff Directory' }).click();
  await expect(page.getByRole('heading', { name: 'Staff Directory' })).toBeVisible();
  await expect(page.getByText('All Schools')).toBeVisible();
  await page.locator('p').filter({ hasText: 'Elskamp, Izzy' }).getByTestId('StarIcon').locator('path').click();
  await page.getByLabel('settings').click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('button', { name: 'Staff Directory' }).click();
  await expect(page.getByRole('heading', { name: 'Staff Directory' })).toBeVisible();
  await expect(page.getByText('All Schools')).toBeVisible();
  await expect(page.getByText('Bily, Raymond')).toBeVisible();
  await expect(page.getByText('Elskamp, Izzy')).toBeVisible();


});









test('#047: Staff Directory > Filter Types > Schools > West',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'For the school directory, this account has been set up to show BrightArrow employees, with each employee in their own "School" (north/east/west). This test navigates to School Directory, clicks the filter icon, and sets "School" to West. Then clicks "OK". Then verifies that only employees marked as "West" are shown, and also checks that the "All Schools" subheading is now changed to say "West" instead. '},
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


  await page.getByRole('button', { name: 'Staff Directory' }).click();
  await page.getByTestId('FilterListIcon').locator('path').click();
  await page.locator('#schools').click();
  await page.getByRole('option', { name: 'West' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByRole('heading', { name: 'Staff Directory' })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Staff DirectoryWest$/ }).getByRole('paragraph')).toBeVisible();
  await expect(page.getByText('Bily, Raymond')).toBeVisible();
});








test('#048: School directory search function',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to school directory, then clicks the search icon and types in contact name "Izzy". Checks that only one contact appears as expected. Does not search with full name due to current limitations with the search function.'},
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

  await page.getByRole('button', { name: 'Staff Directory' }).click();
  await expect(page.getByRole('heading', { name: 'Staff Directory' })).toBeVisible();
  await expect(page.getByText('All Schools')).toBeVisible();
  await expect(page.getByText('Bily, Raymond')).toBeVisible();
  await expect(page.getByText('Elskamp, Izzy')).toBeVisible();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByLabel('Search').click();
  await page.getByLabel('Search').fill('izzy');
  await page.locator('#searchBarBtn').click();
  await expect(page.getByText('Elskamp, Izzy')).toBeVisible();
  await expect(page.getByText('Bily, Raymond')).not.toBeVisible();
  
});





test('#049: Filter within Feeds > Favorties. Verifies favorited feed does not appear under filter condition.',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Feeds > Favorites tab. Then selects the filters icon and changes the "Recent Days" filter from the default of 90 to 1. Then clicks "OK". Then verifies favorited feed outside of this period does not appear.'},
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
  await page.locator('div').filter({ hasText: /^FAVORITES$/ }).click();
  await page.getByTestId('FilterListOffIcon').click();
  await page.getByLabel('90').click();
  await page.getByRole('option', { name: '1', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});






test('#050: Search for a feed message within Feeds > Favorites',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Feeds > Favorites, then clicks the search icon and types in the message contents of a favorited feed. Clicks the search icon again to search for desired message. Checks that searched for message appears as expected.'},
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








test('#051: Feeds refresh icon > “Refresh”',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Feeds, then selects the “Refresh” button text to refresh feed. Verifies that feed refreshes as expected.'},
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







test('#052: Feeds reload icon > “Reload All”',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Feeds, then selects the “Reload All” button text to reload feed. Verifies that feed refreshes as expected.'},
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









test('#053: Feeds reload icon > Contacts refresh icon',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Navigates to Feeds, then selects the refresh icon next to “Contacts”. Verifies that page loads as expected after clicking icon.'},
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






test('#054: Feeds > Filter types > Message Types > Chat Invite Received',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds and selects the filters icon. Then sets “Message Types” to “Chat Invite Received”. Then clicks “OK” and verifies that chat invites are shown.'},
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








test('#055: Feeds > Filter types > Message Types > Email',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds and selects the filters icon. Then sets “Message Types” to “Emails”. Then clicks “OK” and verifies that feeds with email icons are shown.'},
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






test('#056: Feeds > Filter types > Message Types > Texting',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds and selects the filters icon. Then sets “Message Types” to “texting”. Then clicks “OK” and verifies that feeds with texting icons are shown.'},
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







test('#057: Feeds > Filter types > Message Types > Voice',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds and selects the filters icon. Then sets “Message Types” to “voice”. Then clicks “OK” and verifies that feeds with voice icons are shown.'},
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








test('#058: Feeds Filter Types. Recent Days, 7. Message Types, All.',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds, then selects the Filters icon. Changes Recent Days from the default (90) to 7. Clicks ‘ok’ and then tries to search for a message that was sent more than 7 days before the test suite run was started. Waits and ensures that the message does not appear because of the recently set filter.'},
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





test('#059: Feeds Filter Types. Recent Days, 30. Message Types, All.',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds, then selects the Filters icon. Changes Recent Days from the default (90) to 30. Clicks ‘ok’ and then tries to search for a message that was sent more than 30 days before the test suite run was started. Waits and ensures that the message does not appear because of the recently set filter.'},
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






test('#060: Feeds Filter Types. Recent Days, 60. Message Types, All.',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds, then selects the Filters icon. Changes Recent Days from the default (90) to 60. Clicks ‘ok’ and then tries to search for a message that was sent more than 60 days before the test suite run was started. Waits and ensures that the message does not appear because of the recently set filter.'},
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






test('#061: Feeds Filter Types. Recent Days, 180. Message Types, All.',{
  tag: ['@Messages', '@ParentHub'],
  annotation: [
    { type: 'Test description', description: 'Goes to Feeds, then selects the Filters icon. Changes Recent Days from the default (90) to 180. Clicks ‘ok’ and then tries to search for a message that was sent more than 180 days before the test suite run was started. Waits and ensures that the message does not appear because of the recently set filter.'},
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


