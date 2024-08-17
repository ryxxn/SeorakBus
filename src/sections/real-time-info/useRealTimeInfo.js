import React from 'react'
import { getRealTimeBusList } from '@/apis';
import { useBusListStore, useStationInfoStore } from '@/stores';

export const useRealTimeInfo = () => {
  // state
  const [data, setData] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // store
  const { is운행종료, dayKind } = useBusListStore();
  const selectedOrigin = useStationInfoStore((state) => state.selectedOrigin);

  const is설악 = selectedOrigin === '설악';

  const fetchData = async () => {
    try {
      // 실시간 도착 정보
      const response = await getRealTimeBusList(is설악);

      if (response.isError) {
        console.error(response.data);
        setIsError(true);
        return;
      }

      setIsError(false);
      setData(response.data);
    } catch (e) {
      setIsError(true);
      setData([]);
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
    fetchData().then();

    // 1분마다 실시간 버스 정보 및 시간표 업데이트
    const intervalId = setInterval(() => {
      // 실시간 도착정보 동기화
      fetchData();
    }, 1_000 * 60);

    // clean up
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is설악, dayKind]);

  return {
    data,
    isError,
    isLoading,
  }
}
