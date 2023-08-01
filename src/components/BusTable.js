import React, { useState, useEffect, useRef } from 'react'
import { zeroPadding } from '../utils/functions'
import { Card } from './Card'
import { departureTimes } from '../static/data'
import { FaExchangeAlt } from 'react-icons/fa';
import "./BusTable.css"

export const BusTable = () => {

    const [data, setData] = useState(departureTimes);

    const [isSeolak, setIsSeolak] = useState(true);

    const [currentTimeIndex, setCurrentTimeIndex] = useState(-1);

    const [isPreview, setIsPreview] = useState(false);

    const handlePreviewButtonClick = () => {
        setIsPreview(!isPreview);

        // 전체 버스 데이터 가져오기
        setData(departureTimes);
    }

    useEffect(() => {
        const date = new Date();

        const nowTime = `${zeroPadding(date.getHours())}${zeroPadding(date.getMinutes())}`;
        // const nowTime = "0150";

        // 현재 시간 바로 다음 버스 데이터 index 추출
        const index = departureTimes.findIndex((obj) => {
            // 설악 출발인 경우
            if (isSeolak) {
                return obj.departureTimeOfSeolak >= nowTime;
            }
            // 잠실 출발인 경우
            else {
                // 막차 끊기기 전인데 00시 넘어간 경우
                // 막차보다 작은 경우
                if ((parseInt(nowTime.slice(0, 2)) + 24).toString() + nowTime.slice(2) <= departureTimes[departureTimes.length - 1].departureTimeOfJamsil) {
                    return obj.departureTimeOfJamsil >= (parseInt(nowTime.slice(0, 2)) + 24).toString() + nowTime.slice(2);
                }
                return obj.departureTimeOfJamsil >= nowTime;
            }
        });

        setCurrentTimeIndex(index);

        // 이전 버스 보기 중(전체 데이터 보는 중)이면
        if (isPreview) {
            // 이전 버스 보기 비활성화
            setIsPreview(false);
        }

        // 데이터 추출
        const filteredData = departureTimes.slice(index);
        setData(filteredData);

        // 스크롤 위치 정상화
        window.scrollTo(0, 0);

    }, [isSeolak])

    // 버스 데이터가 전체로 보여지면 scroll 조정하기
    useEffect(() => {
        // 스크롤 위치 조정
        if (isPreview) {
            window.scrollTo(0, 120 * currentTimeIndex);
        }
    }, [data])


    return (
        <>
            <article className="stationInfomationContainer">
                <div className="stationInfomationBox">
                    <div className="station">
                        <p>출발</p>
                        <h2>{isSeolak ? "설악" : "잠실"}</h2>
                    </div>
                    <button
                        className="stationChangeButton"
                        onClick={() => setIsSeolak(!isSeolak)}
                    >
                        <FaExchangeAlt />
                    </button>
                    <div className="station">
                        <p>도착</p>
                        <h2>{isSeolak ? "잠실" : "설악"}</h2>
                    </div>
                </div>
            </article>
            <div className='cardsContainer'>
                {/* 이전 버스 보기 중이거나, 데이터가 전부 있는 경우 버튼 없애기 */}
                {isPreview || data.length === departureTimes.length ? null :
                    <button
                        className="previewBusButton"
                        onClick={handlePreviewButtonClick}
                        key="prevBtn"
                    >
                        이전 버스 보기
                    </button>
                }
                {
                    data.map((obj, index) => (
                        <Card
                            busId={obj.busId}
                            departureTime={isSeolak ? obj.departureTimeOfSeolak : obj.departureTimeOfJamsil}
                            isSeolak={isSeolak}
                            key={index}
                            disable={isPreview ? index < currentTimeIndex : false}
                        />
                    ))
                }
            </div>
        </>
    )
}
