const puppeteer = require('puppeteer');

describe('Generando PDF', () => {
	let browser;
	let page;

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: true,
			defaultViewport: null,
		});

		const context = await browser.createIncognitoBrowserContext();
		page = await context.newPage();

		await page.goto('https://platzi.com', { waitUntil: 'networkidle0' });
	}, 20000);

	afterAll(async () => {
		await browser.close();
	});

	test('PDF de tamaño completo', async () => {
		let pdfStyles = [];
		pdfStyles.push('<style>');
		pdfStyles.push('h1 { font-size: 10px; margin-left:30px; }');
		pdfStyles.push('</style>');

		const css = pdfStyles.join('');

		await page.pdf({
			path: './google.pdf',
			format: 'A4',
			printBackground: true,
			displayHeaderFooter: true,
			headerTemplate: css + '<h1>Miren mi primerp PDF</h1>',
			footerTemplate:
				css + '<h1>Page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>',
			margin: {
				top: '100px',
				bottom: '200px',
				right: '30px',
				left: '30px',
			},
		});
	}, 50000);
});
