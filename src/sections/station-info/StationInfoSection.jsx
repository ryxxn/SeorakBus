import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { bindClassNames } from '@/utils';
import { useBusListStore, useStationInfoStore } from '@/stores';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

const cn = bindClassNames(styles);

// ----------------------------------------------------------------------

const StationInfoSection = () => {
  const { selectedOrigin, changeOrigin } = useStationInfoStore();
  const setIs운행종료 = useBusListStore((state) => state.setIs운행종료);

  // 출발지 바꾸기 버튼 클릭 함수
  const handleStationChange = () => {
    changeOrigin();
    setIs운행종료(false);
  };

  const is설악 = selectedOrigin === '설악';

  return (
    <section className={cn('stationInfomationContainer')}>
      <div className={cn('stationInfomationBox')}>
        <div className={cn('station')}>
          <p>출발</p>
          <h2>{is설악 ? '설악' : '잠실'}</h2>
        </div>
        <button
          onClick={handleStationChange}
          className={cn('stationChangeButton')}
          aria-label="출발지 바꾸기"
        >
          <FaExchangeAlt />
        </button>
        <div className={cn('station')}>
          <p>도착</p>
          <h2>{is설악 ? '잠실' : '설악'}</h2>
        </div>
      </div>
    </section>
  );
};

export default StationInfoSection;
