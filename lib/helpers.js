module.exports = {
  click: async function(page, selector, opts = {}) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector, opts);
    } catch(e) {
      throw new Error(`Error al dar click al selector: ${selector}`);
    }
  },

  doubleClick: async function(page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector, { clickCount: 2 });
    } catch(e) {
      throw new Error(`Error al dar doble click al selector: ${selector}`);
    }
  },

  getText: async function(page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (el) => el.textContent);
    } catch(e) {
      throw new Error(`Error al obtener el texto del elemento: ${selector}`);
    }
  },

  type: async function(page, selector, text, opts = {}) {
    try {
      await page.waitForSelector(selector);
      await page.type(selector, text, opts);
    } catch(e) {
      throw new Error(`Error al escribir texto del elemento: ${selector}`);
    }
  },

  getCount: async function(page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$$eval(selector, (el) => el.length);
    } catch(e) {
      throw new Error(`Error al contar los elementos del selector: ${selector}`);
    }
  }
};