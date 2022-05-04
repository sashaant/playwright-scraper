const playwright = require('playwright');


async function takeScreenShots() {
    const browser = await playwright.chromium.launch({
        headless: true // set this to true
    });
    const page = await browser.newPage()
    await page.setViewportSize({ width: 1280, height: 800 }); // set screen shot dimention
    await page.goto('https://finance.yahoo.com/')
    await page.screenshot({ path: 'my_screenshot.png' })
    await browser.close()
}
takeScreenShots()