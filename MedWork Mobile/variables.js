import Constants from 'expo-constants';

export const prodUrl = "http://192.168.15.13:3001";
export const key = "networkSenhores"
export const api_key = "AIzaSyAT1u72BEre__s7KGO7a6B9HE5nvznnobk"

// export const ImagesPaciente = prodUrl +"/uploads/paciente";
// export const ImagesFarmacia = prodUrl +"/uploads/farmacia";
// export const ImagesHospital = prodUrl +"/uploads/hospital";
// export const ImagesMedico = prodUrl +"/uploads/medico";
// export const ImagesMedWork = prodUrl +"/uploads/medwork";
// export const ImagesRecepcionista = prodUrl +"/uploads/recepcionista";


const ENV = {
  dev: {
    API_URL: "http://192.168.15.13:3001",
    JWT_KEY: "networkSenhores",
    API_YTB_KEY: "AIzaSyAT1u72BEre__s7KGO7a6B9HE5nvznnobk",
  },
  staging: {
    API_URL: prodUrl,
    JWT_KEY: key,
    API_YTB_KEY: api_key
  },
  prod: {
    API_URL: prodUrl,
    JWT_KEY: key,
    API_YTB_KEY:api_key
  }
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("staging") !== -1) return ENV.staging;
  if (env.indexOf("prod") !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);