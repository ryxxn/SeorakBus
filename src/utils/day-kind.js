import { DAY_KIND } from "@/constants";

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