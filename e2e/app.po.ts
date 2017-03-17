import { browser, element, by } from 'protractor';

export class EwicomTankChessPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('etc-root h1')).getText();
  }
}
