import axios from 'axios';
import { SAMPLE_MODULES_ENUM, ANALYSIS_MODULES_ENUM } from '../const/enums';
import { baseUrl, apiVer, labGroup } from '../config/api';

export const auth = async (username, password) => {
  const tokenRes = await axios.post(`${baseUrl}/${apiVer}/auth/login/`, { username: username, password: password });
  return `Bearer ${tokenRes.data.access}`;
}

export const getSample = async (sampleId, token) => {
  const promises = SAMPLE_MODULES_ENUM.map(element => axios.get(`${baseUrl}/${apiVer}/${labGroup}/samples/${element}?by_keywords=${sampleId}&search_on=s_uid`,
    { headers: { Authorization: token } }
  ));
  const res = await Promise.all(promises);
  return res.flatMap(element => element.data.data);
}

export const getExperiment = (experimentId, token) => {
  return axios.get(`${baseUrl}/${apiVer}/${labGroup}/xp/${experimentId}/`,
    { headers: { Authorization: token } }
  );
}

export const getAnalysis = async (analysisId, token) => {
  const promises = ANALYSIS_MODULES_ENUM.map(element => axios.get(`${baseUrl}/${apiVer}/${labGroup}/ax/AX${element}?by_keywords=${analysisId}&search_on=s_uid`,
    { headers: { Authorization: token } }
  ));
  const res = await Promise.all(promises);
  return res.flatMap(element => element.data.data);
}

export const getExperimentbyExternalId = (externalId, experimentType, token) => {
  return axios.get(`${baseUrl}/${apiVer}/${labGroup}/xp/${experimentType}?by_keywords=${externalId}&search_on=s_external_identifier`,
    { headers: { Authorization: token } }
  );
}

export const addSample = (sample, sampleType, token) => {
  return axios.post(`${baseUrl}/${apiVer}/${labGroup}/samples/${sampleType}/`,
    sample,
    { headers: { Authorization: token } }
  );
}

export const addExperiment = (experiment, experimentType, token) => {
  return axios.post(`${baseUrl}/${apiVer}/${labGroup}/xp/${experimentType}/`,
    experiment,
    { headers: { Authorization: token } }
  );
}

export const addAnalysis = (analysis, analysisType, token) => {
  return axios.post(`${baseUrl}/${apiVer}/${labGroup}/ax/${analysisType}/`,
    analysis,
    { headers: { Authorization: token } }
  );
}

export const deleteSample = (sampleId, sampleType, token) => {
  return axios.delete(`${baseUrl}/${apiVer}/${labGroup}/samples/${sampleType}/${sampleId}`,
    { headers: { Authorization: token } }
  );
}

export const deleteExperiment = (experimentId, experimentType, token) => {
  return axios.delete(`${baseUrl}/${apiVer}/${labGroup}/xp/${experimentType}/${experimentId}`,
    { headers: { Authorization: token } }
  );
}

export const deleteAnalysis = (analysisId, analysisType, token) => {
  return axios.delete(`${baseUrl}/${apiVer}/${labGroup}/ax/${analysisType}/${analysisId}`,
    { headers: { Authorization: token } }
  );
}