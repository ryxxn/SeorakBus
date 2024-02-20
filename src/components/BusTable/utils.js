import { DAY_KIND } from "./static";

/** 00시 ~ 04시 */
export const is새벽 = () => {
    const nowDate = new Date();
    const hour = nowDate.getHours();

    // 현재 시간이 00시부터 04시 사이에 있는지 확인
    return hour >= 0 && hour <= 4;
};

/**
 * @param {0 | 1 | 2} dayKind 
 */
export const displayDayKind = (dayKind) => {
    switch (dayKind) {
        case DAY_KIND.평일:
            return '평일';
        case DAY_KIND.토요일공휴일:
            return '토요일/공휴일';
        case DAY_KIND.일요일:
            return '일요일';
        default:
            return '';
    }
}