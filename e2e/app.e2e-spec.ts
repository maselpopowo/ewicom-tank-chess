import { EwicomTankChessPage } from './app.po';

describe('ewicom-tank-chess App', () => {
  let page: EwicomTankChessPage;

  beforeEach(() => {
    page = new EwicomTankChessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('etc works!');
  });
});
