import Handlebars from 'handlebars';
import puppeteer from 'puppeteer-core';

export const compileHtmlTemplate = (htmlTemplate, data) => {
  const compiler = Handlebars.compile(htmlTemplate);
  return compiler(data);
};

export const generatePdfBuffer = async (htmlContent) => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', bottom: '20px' },
    });
    return pdfBuffer;
  } catch (error) {
    throw new Error(`PDF Generation Failed: ${error.message}`);
  } finally {
    await browser.close();
  }
};
