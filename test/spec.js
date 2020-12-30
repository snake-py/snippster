const Application = require('spectron').Application;
const assert = require('assert');
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const path = require('path');

const app = new Application({
  path: electronPath,
  args: [path.join(__dirname, '..')],
});

describe('Testing', function () {
  this.timeout(10000);
  beforeEach(() => {
    console.log(app); // this is executed
    return app.start(); // troubling line
  });

  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('shows an initial window', function () {
    console.log('count'); // this is not executed
    const count = app.client.getWindowCount();
    return assert.equal(count, 1);
  });
});

// describe('Application launch', function () {
// console.log(this);

//   this.timeout(10000)
//     // this.timeout(2000).then((res) => {
//     beforeEach(function(){
//       this.app = new Application({
//         path: electronPath,
//         args: [path.join(__dirname, '../public/LocalServer.js')],
//       });
//       return this.app.start();
//     });
// //   });

//   afterEach(function () {
//     if (this.app && this.app.isRunning()) {
//       return this.app.stop();
//     }
//   });

//   it('shows an initial window', function () {
//     return this.app.client.getWindowCount().then(function (count) {
//       assert.equal(count, 2);
//       // Please note that getWindowCount() will return 2 if `dev tools` are opened.
//       // assert.equal(count, 2)
//     });
//   });
// });

// // const AppEvents = require('../events/AppEvents');
// // apev = new AppEvents()

// // test('Test appevents ', () => {
// //   expect(apev.getLanguages())
// // })
