import React from 'react';
import {Text} from 'remax/one';
import {FAYMDC} from '../base';
import clsx from 'clsx';
// import './ripple.scss';

const CLASS_PREFIX = FAYMDC+'-ripple';

export default ({rippleSize, rippleX, rippleY, duration}: any) => {
  const [leaving, setLeaving] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setLeaving(true);
    }, duration)
  }, []);

  const style = {
    width: rippleSize*2,
    height: rippleSize*2,
    top: (-(rippleSize / 2) + rippleY)*2,
    left: (-(rippleSize / 2) + rippleX)*2,
  };
  console.log(style);

  return (
    <Text
      className={clsx(CLASS_PREFIX+'-root', {[CLASS_PREFIX+'-leaving']: leaving})}
      style={style}
    />
  )
}