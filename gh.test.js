let page;

beforeEach(async () => {
  page = await browser.newPage();
}, 15000); // Устанавливаем тайм-аут для хука beforeEach в 15 секунд

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForNavigation();
    await page.waitForSelector('h1', { timeout: 10000 }); // Устанавливаем тайм-аут в 10 секунд
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 15000); // Устанавливаем тайм-аут для теста в 15 секунд

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 10000); // Устанавливаем тайм-аут для теста в 10 секунд

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
      timeout: 15000 // Устанавливаем тайм-аут в 15 секунд
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  });
});

describe("Other page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/pricing");
  });

  test("Header content for 'How often do you want to pay?'", async () => {
    // Получаем текст заголовка
    const titleText = await page.$eval("#billing-frequency-header", h3 => h3.textContent.trim());
    // Проверяем, что текст заголовка соответствует ожидаемому
    expect(titleText).toEqual("How often do you want to pay?");
  }, 10000);
  

  test("Header content for 'Additional add-ons'", async () => {
    // Получаем текст заголовка
    const titleText = await page.$eval("body > div.logged-out.env-production.page-responsive.header-white > div.application-main > main > div.position-relative > div.p-responsive.container-xl.text-center > div.text-left > div.text-center.my-7 > h2", h2 => h2.textContent.trim());
    // Проверяем, что текст заголовка соответствует ожидаемому
    expect(titleText).toEqual("Additional add-ons");
  }, 10000);

  test("Header content for 'Compare features'", async () => {
    // Получаем текст заголовка
    const titleText = await page.$eval("body > div.logged-out.env-production.page-responsive.header-white > div.application-main > main > div.d-md-block.p-responsive.container-xl.text-center.my-8.my-md-9.js-compare-features-item > h1", h1 => h1.textContent.trim());
    // Проверяем, что текст заголовка соответствует ожидаемому
    expect(titleText).toEqual("Compare features");
  }, 10000);
});