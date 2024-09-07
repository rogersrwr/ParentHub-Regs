import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { json } from 'stream/consumers';

const jsonData = require('C:/Users/ryanr/Desktop/stuff/brightarrow/automation/ParentHub Regs/datetime.json');




test('global setup', async ({ page }) => {
  jsonData.datetime = "";
  jsonData.started = false;
  jsonData.failures = false;
  jsonData.finished = false;
  const jsonString = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync('C:/Users/ryanr/Desktop/stuff/brightarrow/automation/ParentHub Regs/datetime.json', jsonString);

  await page.goto('https://target110.brightarrow.com/r/');
  
});



