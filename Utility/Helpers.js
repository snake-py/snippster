function registerEvents(EventObject) {
  Object.values(EventObject).map((value) => {
    if (typeof value === 'function') {
      value.call();
    }
  });
}
