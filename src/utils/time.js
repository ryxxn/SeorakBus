/* 1700 -> 오후 5시 00분으로 바꿔주는 함수 */
export const timeToKorean = (time) => {
  // 입력된 숫자를 시간과 분으로 분리
  let hour = Math.floor(parseInt(time) / 100);
  let minute = parseInt(time) % 100;

  // 시간이 12 이상인 경우는 오후로 변환
  let meridiem = "오전";
  if (hour >= 12) {
    if (hour >= 24) {
      hour %= 24;
    }
    else if (hour > 12) {
      meridiem = "오후";
      hour -= 12;
    }
  }

  // 시간과 분을 조합하여 반환
  if (minute === 0) {
    return `${meridiem} ${hour || 12}시`;
  } else {
    return `${meridiem} ${hour || 12}시 ${minute}분`;
  }
}

export const timeFormat = (time) => {
  const hh = parseInt(time.slice(0, 2)) % 24;
  const mm = time.slice(2);

  return `${zeroPadding(hh)}:${mm}`;
}

export const zeroPadding = (number) => {
  return (number < 10 ? '0' : '') + number.toString();
}

/** 00시 ~ 04시 */
export const is새벽 = () => {
  const nowDate = new Date();
  const hour = nowDate.getHours();

  // 현재 시간이 00시부터 04시 사이에 있는지 확인
  return hour >= 0 && hour <= 4;
};