const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

  const getCode = async (url) => {
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      // The CodePen editor might show code in mirrors. We can try grabbing the innerText of the CodeMirror lines or just getting the raw endpoint.
      
      // Let's go to the raw exports directly via browser and read content!
      const htmlUrl = url.replace('/pen/', '/pen/') + '.html';
      const cssUrl = url.replace('/pen/', '/pen/') + '.css';
      
      await page.goto(htmlUrl);
      const htmlCode = await page.evaluate(() => document.body.innerText);
      
      await page.goto(cssUrl);
      const cssCode = await page.evaluate(() => document.body.innerText);
      
      return { html: htmlCode, css: cssCode };
    } catch(e) {
      return { error: e.message };
    }
  };

  const wizard = await getCode('https://codepen.io/Craaftx/pen/ExyYRMK');
  const pacman = await getCode('https://codepen.io/iddar/pen/xwXowq');

  const fs = require('fs');
  fs.writeFileSync('wizard.json', JSON.stringify(wizard, null, 2));
  fs.writeFileSync('pacman.json', JSON.stringify(pacman, null, 2));

  await browser.close();
})();
