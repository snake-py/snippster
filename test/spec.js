const Application = require('spectron').Application;
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const path = require('path');
const assert = require('assert');

const app = new Application({
  path: electronPath,
  args: [path.join(__dirname, '..')],
});

describe('Start up Testing', function () {
  this.timeout(100000);
  beforeEach(() => {
    // console.log(app); // this is executed
    return app.start();
  });
  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });
  // it('shows an initial window', async function () {
  //   console.log('count'); // this is not executed
  //   await app.client.waitUntilWindowLoaded()
  //   const count = await app.client.getWindowCount();
  //   assert(count, 1);
  // });

  // it('the title is correct', async () => {
  //   const title = app.client.getTitle()
  //   assert(title, 'snippster')
  // })

  it('shows an initial window', async () => {
    const isVisible = await app.browserWindow.isVisible();
    expect(isVisible).toBe(true);
    // console.log('count'); // this is not executed
    // await app.client.waitUntilWindowLoaded();
    // console.log(app.browserWindow);
  });
});


// const Application = require('spectron').Application;
// const electronPath = require('electron'); 
// const path = require('path');
// const assert = require('assert');

// const app = new Application({
//   path: electronPath,
//   args: [path.join(__dirname, '..')],
// });

// describe('Start up Testing',  () =>{
//   this.timeout(100000);
//   beforeEach(() => {

//     return app.start();
//   });
//   afterEach(() => {
//     if (app && app.isRunning()) {
//       return app.stop();
//     }
//   });

//   it('shows an initial window', async () => {
//     const isVisible = await app.browserWindow.isVisible();
//     expect(isVisible).toBe(true);

//   });
// });
