import React from 'react'
import { useState, useEffect } from 'react'
import { busInfomations } from '../static/data'
import { timeToKorean, timeFormat } from '../utils/functions'
import "./Card.css"


export const Card = ({ busId, departureTime, isSeolak, disable=false }) => {

    const [bus, setBus] = useState({});

    useEffect(() => {
        // 버스 relation에서 id로 정보 추출
        const index = busInfomations.findIndex((obj) => obj.id === busId)
        setBus(busInfomations[index]);
    }, [])


    // 정보가 없을 때
    if (JSON.stringify(bus) === "{}") {
        return (
            <div className="card">없음</div>
        )
    }

    return (
        <div className='card' data-state={disable ? 'disable' : ''}>
            <div className="busBox">
                <p>{bus.routeNumber}</p>
                <p>{isSeolak ? "잠실행" : bus.department}</p>
            </div>
            <div className="timeBox">
                <p>{timeFormat(departureTime)}</p>
                <p>{timeToKorean(departureTime)}</p>
            </div>
        </div>
    )
}
