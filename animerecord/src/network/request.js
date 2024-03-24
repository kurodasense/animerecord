import axios from 'axios';

const env = process.env.NODE_ENV;
let baseURL = '';
if(env == 'development'){
  baseURL = 'http://localhost:8091';
}else if(env == 'production'){
  baseURL = 'http://8.134.217.191:8091';
}




export function request(config){
  const instance = axios.create({
    baseURL: baseURL
  });
  return instance(config);
}