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
  EventObject = obj;
  while ((obj = Reflect.getPrototypeOf(obj))) {
    let keys = Reflect.ownKeys(obj);
    keys.forEach((key) => {
      if (!inheritedMethods.includes(key)) {
        ipcMain.handle(key, (event, data) => {
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
