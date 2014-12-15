'use strict';

// spec.js
describe('My first Protractor test', function() {
  it('should log in', function() {
   
    //browser.get('http://juliemr.github.io/protractor-demo/');
    //expect(browser.getTitle()).toEqual('Super Calculator');

    browser.get('http://cloudclient.herokuapp.com/');
    element(by.id('loginurl')).click();

    element(by.model('user.email')).sendKeys('johan.b.brodin@gmail.com');
    element(by.model('user.password')).sendKeys('1234');

    element(by.id('loginbutton')).click();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toEqual('http://cloudclient.herokuapp.com/#/activity');

  });
});