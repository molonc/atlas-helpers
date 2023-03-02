import axios from 'axios';
import { SAMPLE_MODULES_ENUM, ANALYSIS_MODULES_ENUM } from '../const/enums.js';

export const createAtlasApiUrl = (baseUrl, apiVer) => `${baseUrl}/${apiVer}`

export const auth = async (username, password, atlasApiUrl) => {
  const tokenRes = await axios.post(`${atlasApiUrl}/auth/login/`, { username: username, password: password });
  return `Bearer ${tokenRes.data.access}`;
}

export const getSample = async (sampleId, token, atlasApiUrl, labGroup) => {
  const promises = SAMPLE_MODULES_ENUM.map(element => axios.get(`${atlasApiUrl}/${labGroup}/samples/${element}?by_keywords=${sampleId}&search_on=s_uid`,
    { headers: { Authorization: token } }
  ));
  const res = await Promise.all(promises);
  return res.flatMap(element => element.data.data);
}

export const getExperiment = (experimentId, token, atlasApiUrl, labGroup) => {
  return axios.get(`${atlasApiUrl}/${labGroup}/xp/${experimentId}`,
    { headers: { Authorization: token } }
  );
}

export const getAnalysis = async (analysisId, token, atlasApiUrl, labGroup) => {
  const promises = ANALYSIS_MODULES_ENUM.map(element => axios.get(`${atlasApiUrl}/${labGroup}/ax/${element}?by_keywords=AX${analysisId}&search_on=s_uid`,
    { headers: { Authorization: token } }
  ));
  const res = await Promise.all(promises);
  return res.flatMap(element => element.data.data);
}

export const getExperimentbyExternalId = (externalId, experimentType, token, atlasApiUrl, labGroup) => {
  return axios.get(`${atlasApiUrl}/${labGroup}/xp/${experimentType}?by_keywords=${externalId}&search_on=s_external_identifier`,
    { headers: { Authorization: token } }
  );
}

export const addSample = (sample, sampleType, token, atlasApiUrl, labGroup) => {
  return axios.post(`${atlasApiUrl}/${labGroup}/samples/${sampleType}/`,
    sample,
    { headers: { Authorization: token } }
  );
}

export const addExperiment = (experiment, experimentType, token, atlasApiUrl, labGroup) => {
  return axios.post(`${atlasApiUrl}/${labGroup}/xp/${experimentType}/`,
    experiment,
    { headers: { Authorization: token } }
  );
}

export const addAnalysis = (analysis, analysisType, token, atlasApiUrl, labGroup) => {
  return axios.post(`${atlasApiUrl}/${labGroup}/ax/${analysisType}/`,
    analysis,
    { headers: { Authorization: token } }
  );
}

export const deleteSample = (sampleId, sampleType, token, atlasApiUrl, labGroup) => {
  return axios.delete(`${atlasApiUrl}/${labGroup}/samples/${sampleType}/${sampleId}`,
    { headers: { Authorization: token } }
  );
}

export const deleteExperiment = (experimentId, experimentType, token, atlasApiUrl, labGroup) => {
  return axios.delete(`${atlasApiUrl}/${labGroup}/xp/${experimentType}/${experimentId}`,
    { headers: { Authorization: token } }
  );
}

export const deleteAnalysis = (analysisId, analysisType, token, atlasApiUrl, labGroup) => {
  return axios.delete(`${atlasApiUrl}/${labGroup}/ax/${analysisType}/${analysisId}`,
    { headers: { Authorization: token } }
  );
}