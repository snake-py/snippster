const { ipcMain } = require('electron/main');

const inheritedMethods = [
  'constructor',
  '__defineGetter__',
  '__defineSetter__',
  'hasOwnProperty',
  '__lookupGetter__',
  '__lookupSetter__',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toString',
  'valueOf',
  '__proto__',
  'toLocaleString',
];

function registerEvents(obj) {
  let methods = [];
  console.log(obj);
  const EventObject = obj;
  while ((obj = Reflect.getPrototypeOf(obj))) {
    console.log(obj);
    console.log(EventObject);
    let keys = Reflect.ownKeys(obj);
    keys.forEach((key) => {
      // console.log(key);
      if (!inheritedMethods.includes(key)) {
        ipcMain.handle(key, (event, data) => {
          // console.log(EventObject);
            response = eval(`EventObject.${key}(data)`);
          return response;
        });
      }
    });
  }
}

module.exports = {
  registerEvents,
};
