import {request} from "./request";

export async function getAnimeDate(){
  return await request({
    url: '/api/getAnimeDate',
    method: 'get',
  });
}

export async function getAnimeRecordByDateId(date_id){
  return await request({
    url: '/api/getAnimeRecordByDateId',
    method: 'get',
    params: {date_id}
  });
}

export async function updateNewAnimeRecord(record_id, date_id, anime_name, watch_status){
  return await request({
    url: '/api/updateNewAnimeRecord',
    method: 'post',
    data: {record_id, date_id, anime_name, watch_status}
  });
}

export async function addNewAnimeDate(date_name){
  return await request({
    url: 'api/addNewAnimeDate',
    method: 'post',
    data: {date_name}
  });
}