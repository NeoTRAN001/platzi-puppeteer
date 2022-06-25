const puppeteer = require('puppeteer');

const { getCount } = require('../lib/helpers');

describe('Extrayendo información', () => {
	let browser;
	let page;

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
		});

		const context = await browser.createIncognitoBrowserContext();
		page = await context.newPage();

		await page.goto('https://platzi.com', { waitUntil: 'networkidle0' });
	}, 20000);

	afterAll(async () => {
		await browser.close();
	});

	test('Contar los elementos de la pagina', async () => {
    const images = await getCount(page, 'img');
    console.log('images', images);
	}, 50000);
});
