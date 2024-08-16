import React from 'react';
import { BUS } from '../../constants/data';
import { timeToKorean, timeFormat, bindClassNames } from '../../utils';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

const cn = bindClassNames(styles);

// ----------------------------------------------------------------------

const Card = ({ bus, departureTime, isSeolak, disable = false }) => {
  const busData = BUS[bus];

  return (
    <div className={cn('card')} data-state={disable ? 'disable' : ''}>
      <div className={cn('busBox')}>
        <p>{busData?.routeNumber}</p>
        <p>{isSeolak ? '잠실행' : busData?.department}</p>
      </div>
      <div className={cn('timeBox')}>
        <p>{timeFormat(departureTime)}</p>
        <p>{timeToKorean(departureTime)}</p>
      </div>
    </div>
  );
};

export default Card;
