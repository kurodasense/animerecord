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