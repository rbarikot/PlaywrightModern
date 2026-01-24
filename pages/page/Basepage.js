class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateToURL(url) {
    await this.page.goto(url);
  }
}

module.exports = BasePage;

