const puppeteer = require('puppeteer');

describe('Emulación de dispositivos', () => {
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

	test('Emulando dispositivos de forma manual', async () => {
		await page.emulate({
			name: 'Mi dispositivo',
			viewport: {
				width: 375,
				height: 667,
				deviceScaleFactor: 2,
				isMobile: true,
				hasTouch: true,
				isLandscape: false,
			},
			userAgent:
				'Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-J600G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.1 Chrome/71.0.3578.99 Mobile Safari/537.36',
		});

		await page.waitForTimeout(1000);
	}, 40000);

	test('Emulando dispositivos de escritorio de forma manual', async () => {
		await page.setViewport({
			width: 1180,
			height: 800,
		});

		await page.waitForTimeout(1000);
	}, 40000);

	test('Emulando dispositivos de tablet de forma auto', async () => {
		const tablet = puppeteer.devices['iPad Pro'];
		await page.emulate(tablet);

		await page.waitForTimeout(1000);
	}, 40000);

	test('Emulando celular', async () => {
		const iphone = puppeteer.devices['iPhone X'];
		await page.emulate(iphone);

		await page.waitForTimeout(1000);
	}, 40000);
});
