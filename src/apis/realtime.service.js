import { BUS } from "../constants/data";

export const realTimeService = {
  // 요청 성공 여부
  isSuccessRequest: (code) => code == '0',

  // 실시간 설악 버스 리스트
  getListOf설악: (busList) => {
    // 버스가 1개만 있으면 object 배열이 아니고 object로 오기 때문에 처리
    if (busList.constructor === Object) {
      busList = [busList];
    }

    let realTimeBusList = [];

    busList.forEach((busInfo, _index) => {
      // 7000번이면
      if (busInfo?.routeId["#text"] == BUS[7000].id) {
        // 잠실행인지 확인
        if (busInfo.staOrder["#text"] == BUS[7000].staOrderOfSeorak) {
          realTimeBusList.push({ routeName: 7000, time: busInfo.predictTime1["#text"] });
        }
      }
      // 7001번이면
      else if (busInfo?.routeId["#text"] == BUS[7001].id) {
        if (busInfo.staOrder["#text"] == BUS[7001].staOrderOfSeorak) {
          realTimeBusList.push({ routeName: 7001, time: busInfo.predictTime1["#text"] });
        }

      }
      // 7002번이면
      else if (busInfo?.routeId["#text"] == BUS[7002].id) {
        if (busInfo.staOrder["#text"] == BUS[7002].staOrderOfSeorak) {
          realTimeBusList.push({ routeName: 7002, time: busInfo.predictTime1["#text"] });
        }
      }
      else {
        console.error("error!!!!!!!!!!!!!!!")
      }
    })

    return realTimeBusList;
  },

  // 실시간 잠실 버스 리스트
  getListOf잠실: (busList) => {
    // 버스가 1개만 있으면 object 배열이 아니고 object로 오기 때문에 처리
    if (busList.constructor === Object) {
      busList = [busList];
    }

    let realTimeBusList = [];

    busList.forEach((busInfo, _index) => {
      // 7000번이면
      if (busInfo?.routeId["#text"] == BUS[7000].id) {
        realTimeBusList.push({ routeName: 7000, time: busInfo.predictTime1["#text"] });
      }
      // 7001번이면
      else if (busInfo?.routeId["#text"] == BUS[7001].id) {
        realTimeBusList.push({ routeName: 7001, time: busInfo.predictTime1["#text"] });
      }
      // 7002번이면
      else if (busInfo?.routeId["#text"] == BUS[7002].id) {
        realTimeBusList.push({ routeName: 7002, time: busInfo.predictTime1["#text"] });
      }
      else {
        // console.error("error!!!!!!!!!!!!!!!")
      }
    });

    return realTimeBusList;
  }
}