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

// XML to JSON
export const xmlToJson = (xml) => {
  let obj = {};

  if (xml.nodeType === 1) {
    // element 노드일 경우
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) {
    // text 노드일 경우
    obj = xml.nodeValue;
  }

  // 하위 노드들을 처리
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;

      if (typeof obj[nodeName] === 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push === 'undefined') {
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}


