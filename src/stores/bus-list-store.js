import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { DAY_KIND } from '../constants/day-kind';
import { 일요일시간, 토요일공휴일시간, 평일시간 } from '../constants/data';

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

const busListStore = (set) => ({
  fullData: 평일시간,
  dayKind: DAY_KIND.평일,
  is운행종료: false,
  setDayKind: (dayKind) => {
    const fullData = getFullDataFromDayKind(dayKind);
    set({ dayKind, fullData })
  },
  setIs운행종료: (is운행종료) => set({ is운행종료 })
})

export const useBusListStore = create(devtools(busListStore));

