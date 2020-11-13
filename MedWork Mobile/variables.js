import Constants from 'expo-constants';

export const prodUrl = "http://192.168.1.48:3001";

const ENV = {
  dev: {
    apiUrl: "http://192.168.1.48:3001"
  },
  staging: {
    apiUrl: prodUrl
  },
  prod: {
    apiUrl: prodUrl
  }
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("staging") !== -1) return ENV.staging;
  if (env.indexOf("prod") !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);