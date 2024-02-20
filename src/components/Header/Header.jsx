import React, { useState } from 'react'
import './Header.scss'
import { useTableStore } from '../../store/tableStore';
import { displayDayKind } from '../BusTable/utils';
import { Modal } from '../Modal/Modal';
import { DAY_KIND } from '../BusTable/static';

export const Header = () => {

    const { dayKind, setDayKind } = useTableStore();
    const [isOpen, setIsOpen] = useState(false);

    const handleModalOpen = () => {
        setIsOpen(true);
    }

    const handleDayKindChange = (newDayKind) => {
        setDayKind(newDayKind);
        setIsOpen(false);
    }

    return (
        <>
            <header className='mainHeader'>
                <h1>
                    {"설악-잠실 버스"}
                    <span className='dayKind' data-daykind={dayKind}>
                        ({displayDayKind(dayKind)})
                    </span>
                </h1>
                <button className='dayKindChangeButton' onClick={handleModalOpen}>다른 시간표 보기</button>
            </header>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <div className='dayKindButtonsBox'>
                    <button
                        className="dayKindButton"
                        onClick={() => handleDayKindChange(DAY_KIND.평일)}
                        disabled={dayKind === DAY_KIND.평일}
                    >
                        평일 시간표
                    </button>
                    <button
                        className="dayKindButton"
                        onClick={() => handleDayKindChange(DAY_KIND.토요일공휴일)}
                        disabled={dayKind === DAY_KIND.토요일공휴일}
                    >
                        토요일/공휴일 시간표
                    </button>
                    <button
                        className="dayKindButton"
                        onClick={() => handleDayKindChange(DAY_KIND.일요일)}
                        disabled={dayKind === DAY_KIND.일요일}
                    >
                        일요일 시간표
                    </button>
                </div>
            </Modal>
        </>
    )
}
