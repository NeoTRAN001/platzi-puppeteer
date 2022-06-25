const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('Visual Test', () => {
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

	test('Snapshot de toda la página', async () => {
		await page.waitForSelector('img');

		const screenshot = await page.screenshot();

		expect(screenshot).toMatchImageSnapshot();
	}, 50000);

	test('Snapshot de solo un elemento', async () => {
		const image = await page.waitForSelector('img');

		const screenshot = await page.screenshot();

		expect(screenshot).toMatchImageSnapshot({
			failureThreshold: 0.1,
			failureThresholdType: 'percent',
		});
	}, 50000);

	test('Snapshot de un celular', async () => {
		const tablet = puppeteer.devices['iPad Pro'];
		await page.emulate(tablet);

		await page.waitForSelector('img');

		const screenshot = await page.screenshot();

		expect(screenshot).toMatchImageSnapshot({
			failureThreshold: 0.1,
			failureThresholdType: 'percent',
		});
	}, 50000);
});
