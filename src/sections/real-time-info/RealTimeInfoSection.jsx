import React from 'react';
import { bindClassNames } from '@/utils';
import { Loading } from '@/components/loading';
import { useBusListStore } from '@/stores';
import styles from './styles.module.scss';
import { useRealTimeInfo } from './useRealTimeInfo';

// ----------------------------------------------------------------------

const cn = bindClassNames(styles);

// ----------------------------------------------------------------------

const ReactTimeInfoSection = () => {
  const { data, isLoading, isError } = useRealTimeInfo();

  // store
  const is운행종료 = useBusListStore((state) => state.is운행종료);

  // ----------------------------------------------------------------------

  const renderTitle = () => {
    // if (isError) {
    //   return (
    //     <p className={cn('arrivalInfo')}>
    //       현재 정보를 불러올 수 없습니다. 시간표를 참고해주세요.
    //     </p>
    //   );
    // }

    if (is운행종료) {
      return (
        <p className={cn('arrivalInfo')}>
          <span>운행 시간이 종료되었습니다.</span>
        </p>
      );
    }

    return (
      <p className={cn('arrivalInfo')}>
        <span>다음 버스 도착 정보</span>
        {!data.length && !isLoading && <span>없음</span>}
      </p>
    );
  };

  const renderBusInfo = () => {
    if (isError) return null;

    if (isLoading) {
      return (
        <p className={cn('timeInfo')} style={{ justifyContent: 'center' }}>
          <Loading width="16px" />
        </p>
      );
    }

    if (data.length > 0) {
      return data.map((obj, index) => (
        <p className={cn('timeInfo')} key={index}>
          <span style={{ color: 'red' }}>{obj.routeName}</span>
          <span>{obj.time} 분 후 도착</span>
        </p>
      ));
    }
  };

  // ----------------------------------------------------------------------

  return (
    <div className={cn('realTimeBusInfoBox')}>
      <div className={cn('realTimeBusInfo')}>
        {renderTitle()}
        {renderBusInfo()}
      </div>
    </div>
  );
};

export default ReactTimeInfoSection;
