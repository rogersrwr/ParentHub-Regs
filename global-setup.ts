import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { json } from 'stream/consumers';

const jsonData = require('D:/a/ParentHub-Regs/ParentHub-Regs/datetime.json');




test('global setup', async ({ page }) => {
  jsonData.datetime = "";
  jsonData.started = false;
  jsonData.failures = false;
  jsonData.finished = false;
  const jsonString = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync('D:/a/ParentHub-Regs/ParentHub-Regs/datetime.json', jsonString);

  await page.goto('https://target110.brightarrow.com/r/');
  
});



