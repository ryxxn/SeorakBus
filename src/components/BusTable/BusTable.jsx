import React, { useState, useEffect } from 'react'
import { Card } from '../Card/Card'
import { FaExchangeAlt } from 'react-icons/fa';
import "./BusTable.scss"
import { Loading } from '../Loading/Loading';
import { format } from 'date-fns';
import { is새벽 } from './utils';
import { useTableStore } from '../../store/tableStore';
import { zeroPadding } from '../../utils/functions';
import { fetchData } from '../../utils/api';

export const BusTable = () => {

    const { fullData, dayKind } = useTableStore();

    const [isSeolak, setIsSeolak] = useState(true);

    const [currentTimeIndex, setCurrentTimeIndex] = useState(-1);

    const [isPreview, setIsPreview] = useState(false);

    const [realTimeBusData, setRealTimeBusData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isClosed, setIsClosed] = useState(false);

    // 출발지 바꾸기 버튼 클릭 함수
    const handleStationChange = () => {
        setIsSeolak(!isSeolak);
        setIsClosed(false);
        setIsLoading(true);
    }

    // 이전 시간표 보기 활성화 버튼 클릭 함수
    const handlePreviewButtonClick = () => {
        setIsPreview(!isPreview);
    }

    // 현재 시간에 따라 시간표 동기화 함수
    const updateTimeTable = () => {
        const date = new Date();

        let currentTime = format(date, 'HHmm');
        if (is새벽()) {
            const hh = Number(currentTime.slice(0, 2));
            const mm = Number(currentTime.slice(2));

            currentTime = `${hh + 24}${zeroPadding(mm)}`;
        }

        const index = fullData.findIndex((item) => {
            return isSeolak
                ? (item.설악출발 > currentTime)
                : (item.잠실출발 > currentTime);
        })

        const 막차끊김 = index === -1;

        if (막차끊김) {
            setCurrentTimeIndex(fullData.length);
            setIsPreview(true);
            setIsClosed(true);
            return;
        }

        setCurrentTimeIndex(index);

    }

    const updateData = () => {
        // 실시간 도착 정보
        fetchData(isSeolak)
            .then((response) => {
                if (response.data === "버스 정보 없음") {
                    console.log(response.data);
                    setIsLoading(false);
                    setRealTimeBusData([]);
                }
                else if (response.data.includes("데이터 요청 실패")) {
                    console.log(response.data);

                }
                else if (response.data === "에러") {
                    console.log(response.data);
                }
                else {
                    setIsLoading(false);
                    setRealTimeBusData(response.data);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });

    }

    useEffect(() => {

        // 이전 버스 보기 중(전체 데이터 보는 중)이면
        if (isPreview) {
            // 이전 버스 보기 비활성화
            setIsPreview(false);
        }

        // 버스 및 시간표 data 없데이트
        updateTimeTable();

        // 스크롤 위치 정상화
        window.scrollTo(0, 0);

        if (isClosed) {
            setIsLoading(false);
            return;
        };

        updateData();

        // 1분마다 실시간 버스 정보 및 시간표 업데이트
        const intervalId = setInterval(() => {
            // 시간표 동기화
            updateTimeTable();
            // 실시간 도착정보 동기화
            updateData();
        }, 1_000 * 60);

        // clean up
        return (() => {
            clearInterval(intervalId);
        })

    }, [isSeolak, dayKind])

    // 버스 데이터가 전체로 보여지면 scroll 조정하기
    useEffect(() => {
        // 스크롤 위치 조정
        if (isClosed) return;
        if (isPreview) {
            const PREV_BTN_SIZE = 72;
            const currentScrollY = window.scrollY;

            window.scrollTo(0,
                124 * (currentTimeIndex - 1)
                + PREV_BTN_SIZE
                + currentScrollY
                - 20
            );
        }
    }, [fullData, isPreview])

    const tableData = isPreview ? fullData : fullData.slice(currentTimeIndex);

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
                        onClick={handleStationChange}
                    >
                        <FaExchangeAlt />
                    </button>
                    <div className="station">
                        <p>도착</p>
                        <h2>{isSeolak ? "잠실" : "설악"}</h2>
                    </div>
                </div>
            </article>
            <div className="realTimeBusInfoBox">
                <div className="realTimeBusInfo">
                    {isClosed ?
                        <p className='arrivalInfo'>
                            <span>운행 시간이 종료되었습니다.</span>
                        </p>
                        :
                        <p className='arrivalInfo'>
                            <span>다음 버스 도착 정보</span>
                            {(!realTimeBusData.length && !isLoading) && <span>없음</span>}
                        </p>
                    }
                    {isLoading ?
                        <p className="timeInfo" style={{ justifyContent: 'center' }}>
                            <Loading width="16px" />
                        </p>
                        :
                        realTimeBusData.length > 0 &&
                        realTimeBusData.map((obj, index) => (
                            <p className="timeInfo" key={index}>
                                <span style={{ color: "red" }}>{obj.routeName}</span>
                                <span>{obj.time} 분 후 도착</span>
                            </p>
                        ))
                    }
                </div>
            </div>
            <div className='cardsContainer'>
                {/* 이전 버스 보기 중이거나, 데이터가 전부 있는 경우 버튼 없애기 */}
                {/* {isPreview || data.length === departureTimes.length ? null : */}
                {/* {isPreview || data.length === 평일시간.length ? null : */}
                {isPreview || currentTimeIndex === 0 ? null :
                    <button
                        className="previewBusButton"
                        onClick={handlePreviewButtonClick}
                        key="prevBtn"
                    >
                        이전 버스 보기
                    </button>
                }
                {
                    tableData.map((item, index) => (
                        <Card
                            key={item.id}
                            bus={item.bus}
                            departureTime={isSeolak ? item.설악출발 : item.잠실출발}
                            isSeolak={isSeolak}
                            disable={isPreview ? index < currentTimeIndex : false}
                        />
                    ))
                }
            </div>
        </>
    )
}
