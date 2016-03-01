import cfg from '../appSettings.json!text';

var config = JSON.parse(cfg);

export default {
  environment: {
    current: config.environment,
    list: {
      development: 'DEVELOPMENT',
      production: 'PRODUCTION'
    }
  },
  apiUrl: (relativeUrl) => {
    return config.apiUrl + `${relativeUrl}`;
  }
}