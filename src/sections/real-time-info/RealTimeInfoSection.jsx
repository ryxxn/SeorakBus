import React from 'react';
import { bindClassNames } from '@/utils';
import { Loading } from '@/components/loading';
import { useBusListStore, useStationInfoStore } from '@/stores';
import { getRealTimeBusList } from '@/apis';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

const cn = bindClassNames(styles);

// ----------------------------------------------------------------------

const ReactTimeInfoSection = () => {
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [realTimeBusData, setRealTimeBusData] = React.useState([]);

  const { is운행종료, dayKind } = useBusListStore();
  const selectedOrigin = useStationInfoStore((state) => state.selectedOrigin);

  const is설악 = selectedOrigin === '설악';

  const updateData = async () => {
    try {
      // 실시간 도착 정보
      const response = await getRealTimeBusList(is설악);

      if (response.isError) {
        console.error(response.data);
        setIsError(true);
        return;
      }

      setIsError(false);
      setRealTimeBusData(response.data);
    } catch (e) {
      setIsError(true);
      setRealTimeBusData([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (is운행종료) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    updateData().then();

    // 1분마다 실시간 버스 정보 및 시간표 업데이트
    const intervalId = setInterval(() => {
      // 실시간 도착정보 동기화
      updateData();
    }, 1_000 * 60);

    // clean up
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is설악, dayKind]);

  return (
    <div className={cn('realTimeBusInfoBox')}>
      <div className={cn('realTimeBusInfo')}>
        {is운행종료 ? (
          <p className={cn('arrivalInfo')}>
            <span>운행 시간이 종료되었습니다.</span>
          </p>
        ) : (
          <p className={cn('arrivalInfo')}>
            <span>다음 버스 도착 정보</span>
            {!realTimeBusData.length && !isLoading && <span>없음</span>}
          </p>
        )}
        {isLoading ? (
          <p className={cn('timeInfo')} style={{ justifyContent: 'center' }}>
            <Loading width="16px" />
          </p>
        ) : (
          realTimeBusData.length > 0 &&
          realTimeBusData.map((obj, index) => (
            <p className={cn('timeInfo')} key={index}>
              <span style={{ color: 'red' }}>{obj.routeName}</span>
              <span>{obj.time} 분 후 도착</span>
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default ReactTimeInfoSection;
