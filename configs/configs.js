const path = require('path');

// ENV Variables
// ----------------
// process.env.DEV_APP_PATH='C:/Users/vabis/Desktop/Playground/projects/snippster-devData'
// process.env.IS_PUBLISHED=''
// ----------------
defaultEnv = {
  DEV_APP_PATH: path.join(__dirname, '../../', 'snippster-devData'),
  IS_PUBLISHED: '',
  CONFIGS_LOADED: 'DEV_DEFAULT',
};

devEnv = {
  CONFIGS_LOADED: 'DEV',
};

prodEnv = {
  CONFIGS_LOADED: 'PROD',
};

const loadConfigs = (mode) => {
    let env = {};
  if (mode === 'dev') {
    env = { ...defaultEnv, ...devEnv };
  } else if (mode === 'prod') {
    env = { ...defaultEnv, ...prodEnv };
  }
  for (const key in env) {
    process.env[key] = env[key];
  }
};
module.exports = loadConfigs;
