import { publicApiInstance } from './public-api-instance';
import { STATION_ID } from '../constants/data';
import { realTimeService } from './realtime.service';

const URL = process.env.REACT_APP_API_URL;

export const getRealTimeBusList = async (isSeorak) => {
  try {
    if (isSeorak) {
      // 설악터미널 버스 도착 시각
      const response = await publicApiInstance.get(URL, {
        params: {
          serviceKey: process.env.REACT_APP_API_KEY,
          stationId: STATION_ID.설악
        },
      })

      const seorakData = response.data;

      // 데이터 요청 성공하면 (요청 결과 = 0 => 정상적으로 처리되었습니다)
      const isSuccessRequest = realTimeService.isSuccessRequest(seorakData?.response?.msgHeader?.resultCode["#text"]);

      if (isSuccessRequest) {
        const busList = seorakData?.response?.msgBody?.busArrivalList;

        const realTimeBusList = realTimeService.getListOf설악(busList);

        return { type: "seorak", data: realTimeBusList, isError: false };
      }

      // 데이터 요청 실패
      else {
        const errorCode = seorakData?.response?.msgHeader?.resultCode["#text"];
        throw new Error(`데이터 요청 실패 error code : ${errorCode ?? 'unknown'}`);
      }
    }
    // 잠실이면
    else {
      // 잠실 버스 도착 시각
      const response = await publicApiInstance.get(URL, {
        params: {
          serviceKey: process.env.REACT_APP_API_KEY,
          stationId: STATION_ID.잠실
        },
      })

      const jamsilData = response.data;

      const isSuccessRequest = realTimeService.isSuccessRequest(jamsilData?.response?.msgHeader?.resultCode["#text"]);

      // 데이터 요청 성공하면 (요청 결과 = 0 => 정상적으로 처리되었습니다)
      if (isSuccessRequest) {
        let busList = jamsilData?.response?.msgBody?.busArrivalList;

        const realTimeBusList = realTimeService.getListOf잠실(busList);

        return { type: "jamsil", data: realTimeBusList, isError: false };
      }
      // 데이터 요청 실패
      else {
        const errorCode = jamsilData?.response?.msgHeader?.resultCode["#text"];
        throw new Error(`데이터 요청 실패 error code : ${errorCode ?? 'unknown'}`);
      }
    }
  }
  catch (err) {
    console.error(err);
    throw new Error(`데이터 요청 실패 : 알 수 없는 오류`);
  }
}