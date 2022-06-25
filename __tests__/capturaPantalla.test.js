const puppeteer = require('puppeteer');

const { getCount } = require('../lib/helpers');

describe('Captura de pantalla', () => {
	let browser;
	let page;

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
		});

		const context = await browser.createIncognitoBrowserContext();
		page = await context.newPage();

		await page.goto('https://google.com', { waitUntil: 'networkidle0' });
	}, 20000);

	afterAll(async () => {
		await browser.close();
	});

	test('Captura de pantalla completa', async () => {
    await page.screenshot({
      path: './capturaPantalla.png',
      fullPage: true
    });
	}, 50000);

  test('Captura de pantalla seleccionado un elemento', async () => {
    await page.screenshot({
      path: './capturaPantallaArea.png',
      clip: {
        x: 0,
        y: 0,
        width: 500,
        height: 500
      }
    });
	}, 50000);

  test('Captura de pantalla con fondo transparente', async () => {

    await page.evaluate(() => (document.body.style.background = 'transparent'));

    await page.screenshot({
      path: './capturaPantallaTransparent.png',
      omitBackground: true
    });
	}, 50000);

  test('Captura de pantalla a un elemento', async () => {

    const element = await page.waitForSelector('.lnXdpd');

    await element.screenshot({
      path: './capturaPantallaSelector.png',
    });
	}, 50000);
});
