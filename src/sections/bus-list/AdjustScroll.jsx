import React from 'react';
import { useBusListStore } from '@/stores';

const AdjustScroll = ({ children, isPreview, currentTimeIndex }) => {
  // store
  const { fullData, is운행종료 } = useBusListStore();

  // 버스 데이터가 전체로 보여지면 scroll 조정하기
  React.useEffect(() => {
    // 스크롤 위치 조정
    if (is운행종료) return;
    if (isPreview) {
      const PREV_BTN_SIZE = 72;
      const currentScrollY = window.scrollY;

      window.scrollTo(
        0,
        124 * (currentTimeIndex - 1) + PREV_BTN_SIZE + currentScrollY - 20
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullData, isPreview]);

  return <> {children} </>;
};

export default AdjustScroll;
