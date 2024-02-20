import axios from 'axios'
import { xmlToJson } from './functions';

const URL = "http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList";

export const fetchData = async (isSeorak) => {
    try {
        // DOMParser 인스턴스 생성
        const parser = new DOMParser();

        // axios 취소 토큰 변수
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();

        // 요청 중단
        source.cancel("요청 중단");

        if (isSeorak) {

            // 설악터미널 버스 도착 시각
            const responseOfSeorak = await axios.get(URL, {
                params: {
                    serviceKey: process.env.REACT_APP_API_KEY,
                    stationId: 239000374
                },
                calcelToken: source.token
            })

            // XML에서 JSON파싱
            const xmlDocOfSeorak = parser.parseFromString(responseOfSeorak.data, 'text/xml');
            const jsonOfSeorak = xmlToJson(xmlDocOfSeorak);

            // 데이터 요청 성공하면 (요청 결과 = 0 => 정상적으로 처리되었습니다)
            if (jsonOfSeorak?.response?.msgHeader?.resultCode["#text"] === '0') {
                let busList = jsonOfSeorak?.response?.msgBody?.busArrivalList;

                // 버스가 1개만 있으면 object 배열이 아니고 object로 오기 때문에 처리
                if (busList.constructor === Object) {
                    busList = [busList];
                }

                let realTimeBusList = [];

                busList.forEach((busInfo, index) => {

                    // 7000번이면
                    if (busInfo?.routeId["#text"] === "239000139") {
                        // 잠실행인지 확인
                        if (busInfo.staOrder["#text"] === "38") {
                            realTimeBusList.push({ routeName: 7000, time: busInfo.predictTime1["#text"] });
                        }
                    }
                    // 7001번이면
                    else if (busInfo?.routeId["#text"] === "239000140") {
                        if (busInfo.staOrder["#text"] === "10") {
                            realTimeBusList.push({ routeName: 7001, time: busInfo.predictTime1["#text"] });
                        }

                    }
                    // 7002번이면
                    else if (busInfo?.routeId["#text"] === "239000141") {
                        if (busInfo.staOrder["#text"] === "18") {
                            realTimeBusList.push({ routeName: 7002, time: busInfo.predictTime1["#text"] });
                        }
                    }
                    else {
                        console.error("error!!!!!!!!!!!!!!!")
                    }
                })
                if (realTimeBusList.length === 0) {
                    return { type: "seorak", data: "버스 정보 없음" };
                }
                return { type: "seorak", data: realTimeBusList };
            }
            // 데이터 요청 실패
            else {
                const errorCode = jsonOfSeorak?.response?.msgHeader?.resultCode["#text"];
                return { type: "seorak", data: "데이터 요청 실패" + (errorCode ? ` error code : ${errorCode}` : "") };
            }
        }
        // 잠실이면
        else {

            // 잠실 버스 도착 시각
            const responseOfJamsil = await axios.get(URL, {
                params: {
                    serviceKey: process.env.REACT_APP_API_KEY,
                    stationId: 123000049
                },
                calcelToken: source.token
            })

            // XML에서 JSON파싱
            const xmlDocOfJamsil = parser.parseFromString(responseOfJamsil.data, 'text/xml');
            const jsonOfJamsil = xmlToJson(xmlDocOfJamsil);

            // 데이터 요청 성공하면 (요청 결과 = 0 => 정상적으로 처리되었습니다)
            if (jsonOfJamsil?.response?.msgHeader?.resultCode["#text"] === '0') {
                let busList = jsonOfJamsil?.response?.msgBody?.busArrivalList;

                // 버스가 1개만 있으면 object 배열이 아니고 object로 오기 때문에 처리
                if (busList.constructor === Object) {
                    busList = [busList];
                }

                let realTimeBusList = [];

                busList.forEach((busInfo, index) => {

                    // 7000번이면
                    if (busInfo?.routeId["#text"] === "239000139") {
                        realTimeBusList.push({ routeName: 7000, time: busInfo.predictTime1["#text"] });
                    }
                    // 7001번이면
                    else if (busInfo?.routeId["#text"] === "239000140") {
                        realTimeBusList.push({ routeName: 7001, time: busInfo.predictTime1["#text"] });
                    }
                    // 7002번이면
                    else if (busInfo?.routeId["#text"] === "239000141") {
                        realTimeBusList.push({ routeName: 7002, time: busInfo.predictTime1["#text"] });
                    }
                    else {
                        // console.error("error!!!!!!!!!!!!!!!")
                    }
                });

                if (realTimeBusList.length === 0) {
                    return { type: "jamsil", data: "버스 정보 없음" };
                }
                return { type: "jamsil", data: realTimeBusList };
            }
            // 데이터 요청 실패
            else {
                const errorCode = jsonOfJamsil?.response?.msgHeader?.resultCode["#text"];
                return { type: "jamsil", data: "데이터 요청 실패" + (errorCode ? ` error code : ${errorCode}` : "") };
            }
        }
    }
    catch (err) {
        console.error(err);
        return { type: "error", data: "에러" };
    }
}