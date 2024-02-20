import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { DAY_KIND } from '../components/BusTable/static';
import { 일요일시간, 토요일공휴일시간, 평일시간 } from '../static/data';

const getFullDataFromDayKind = (dayKind) => {
    switch (dayKind) {
        case DAY_KIND.평일:
            return 평일시간;
        case DAY_KIND.토요일공휴일:
            return 토요일공휴일시간;
        case DAY_KIND.일요일:
            return 일요일시간;
        default:
            return 평일시간;
    }
}

const tableStore = (set) => ({
    fullData: 평일시간,
    dayKind: DAY_KIND.평일,
    setDayKind: (dayKind) => {
        const fullData = getFullDataFromDayKind(dayKind);
        set({ dayKind, fullData })
    },
})

export const useTableStore = create(devtools(tableStore));

