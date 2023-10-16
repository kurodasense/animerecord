import axios from 'axios'
export function request(config){
  const instance = axios.create({
    baseURL: 'http://8.134.217.191:8091'
  });
  return instance(config);
}
