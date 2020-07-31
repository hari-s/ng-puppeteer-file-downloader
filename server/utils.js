const puppeteer = require("puppeteer");

function getHostname(url) {
  const objUrl = new URL(url);
  return objUrl.hostname;
}

async function openBrowser() {
  const browser = await puppeteer.launch();
  return browser;
}

async function closeBrowser(browser) {
  await browser.close();
}

async function goToPage(url, browser) {
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2",
  });
  return page;
}

async function takeScreenShotFromPage(page) {
  await page.waitFor(500);
  await page.addStyleTag({
    content: "@page { size: auto; }",
  });
  await page.pdf({
    path: `${__dirname}/uploads/${getHostname(page.url())}.pdf`,
    format: "A4",
  });
}

async function takeScreenShot(url) {
  const browser = await openBrowser();
  const page = await goToPage(url, browser);
  await takeScreenShotFromPage(page);
  await closeBrowser(browser);
}

module.exports = {
  takeScreenShot,
};
