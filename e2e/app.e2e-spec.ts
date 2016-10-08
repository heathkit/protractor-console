import { ProtractorConsolePage } from './app.po';

describe('protractor-console App', function() {
  let page: ProtractorConsolePage;

  beforeEach(() => {
    page = new ProtractorConsolePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
