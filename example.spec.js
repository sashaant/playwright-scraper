const fs = require('fs');
const pdf = require('pdf-parse');
const { chromium } = require('playwright');
const assert = require('chai').assert;
const axios = require('axios');
 


(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({ downloadsPath: './', acceptDownloads: true })
  const page = await context.newPage()

  await page.goto('http://www2.portoalegre.rs.gov.br/dopa/')
  await page.screenshot({path: 'screenshot.png'});

  // await page.click('#login')
  // await page.type('#n-email', process.env.USER_EMAIL)
  // await page.type('#n-password2', process.env.USER_PASSWORD)

  // await page.click('#goto-signin-btn')

  // await page.click('#account')

  // const foundSelector = await page.waitForSelector('table > tr:nth-child(2) > td:nth-child(2) > a:nth-child(2)')
  // console.log({foundSelector})

  const executivo = await page.waitForSelector('table>tbody>tr:nth-child(2)>td:nth-child(2)>a:nth-child(3)')
  console.log({executivo})

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('table>tbody>tr:nth-child(2)>td:nth-child(2)>a:nth-child(3)'),
  ])

  const path = await download.path()
  console.log({path})

  /* SAMPLE PDF PARSE */
  let dataBuffer = fs.readFileSync(path);
  // let dataBuffer = fs.readFileSync('./sample.pdf');
  
  pdf(dataBuffer).then(function(data) {
      console.log({
        numpages: data.numpages,
        // numrender: data.numrender,
        // info: data.info,
        // meta: data.metadata,
        // version: data.version,
        text: data.text,
        textSearch: data.text.search('André Luis')
      });        
  });

  // const newFile = await fs.readFileSync(path)
  // const testFile = await fs.readFileSync('fixtures/testfile.pdf')

  // assert(newFile.equals(testFile))

  await browser.close()
})()