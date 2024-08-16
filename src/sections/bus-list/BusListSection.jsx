import React from 'react';
import { useBusListStore, useStationInfoStore } from '@/stores';
import { format } from 'date-fns';
import { bindClassNames, scrollToTop, zeroPadding, is새벽 } from '@/utils';
import { Card } from '@/components/card';
import AdjustScroll from './AdjustScroll';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

const cn = bindClassNames(styles);

// ----------------------------------------------------------------------

const BusListSection = () => {
  // state
  const [isPreview, setIsPreview] = React.useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = React.useState(-1);

  // store
  const { fullData, dayKind, is운행종료, setIs운행종료 } = useBusListStore();
  const selectedOrigin = useStationInfoStore((state) => state.selectedOrigin);

  const is설악 = selectedOrigin === '설악';

  // 이전 시간표 보기 활성화 버튼 클릭 함수
  const handlePreviewButtonClick = () => {
    setIsPreview(!isPreview);
  };

  // 현재 시간에 따라 시간표 동기화 함수
  const updateTimeTable = () => {
    const date = new Date();

    let currentTime = format(date, 'HHmm');
    if (is새벽()) {
      const hh = Number(currentTime.slice(0, 2));
      const mm = Number(currentTime.slice(2));

      currentTime = `${hh + 24}${zeroPadding(mm)}`;
    }

    const index = fullData.findIndex((item) => {
      return is설악 ? item.설악출발 > currentTime : item.잠실출발 > currentTime;
    });

    const 막차끊김 = index === -1;

    if (막차끊김) {
      // 전체 데이터 다 보여주기
      setCurrentTimeIndex(fullData.length);
      setIsPreview(true);
      setIs운행종료(true);
      return;
    }

    setCurrentTimeIndex(index);
  };

  React.useEffect(() => {
    // 버스 및 시간표 data 없데이트
    updateTimeTable();

    if (is운행종료) return;

    // 이전 버스 보기 비활성화
    setIsPreview(false);

    // 스크롤 위치 정상화
    scrollToTop();

    // 1분마다 실시간 버스 정보 및 시간표 업데이트
    const intervalId = setInterval(() => {
      // 시간표 동기화
      updateTimeTable();
    }, 1_000 * 60);

    // clean up
    return () => {
      clearInterval(intervalId);
    };

    // eslint-disable-next-line
  }, [is설악, dayKind]);

  const tableData = isPreview ? fullData : fullData.slice(currentTimeIndex);

  return (
    <AdjustScroll isPreview={isPreview} currentTimeIndex={currentTimeIndex}>
      <div className={cn('cardsContainer')}>
        {/* 이전 버스 보기 중이거나, 데이터가 전부 있는 경우 버튼 없애기 */}
        {/* {isPreview || data.length === departureTimes.length ? null : */}
        {/* {isPreview || data.length === 평일시간.length ? null : */}
        {isPreview || currentTimeIndex === 0 ? null : (
          <button
            className={cn('previewBusButton')}
            onClick={handlePreviewButtonClick}
            key="prevBtn"
          >
            이전 버스 보기
          </button>
        )}
        {tableData.map((item, index) => (
          <Card
            key={item.id}
            bus={item.bus}
            departureTime={is설악 ? item.설악출발 : item.잠실출발}
            isSeolak={is설악}
            disable={isPreview ? index < currentTimeIndex : false}
          />
        ))}
      </div>
    </AdjustScroll>
  );
};

export default BusListSection;
