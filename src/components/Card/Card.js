import React from 'react'
import { BUS } from '../../static/data'
import { timeToKorean, timeFormat } from '../../utils/functions'
import "./Card.css"

export const Card = ({ bus, departureTime, isSeolak, disable = false }) => {

    const busData = BUS[bus];

    return (
        <div className='card' data-state={disable ? 'disable' : ''}>
            <div className="busBox">
                <p>{busData?.routeNumber}</p>
                <p>{isSeolak ? "잠실행" : busData?.department}</p>
            </div>
            <div className="timeBox">
                <p>{timeFormat(departureTime)}</p>
                <p>{timeToKorean(departureTime)}</p>
            </div>
        </div>
    )
}
