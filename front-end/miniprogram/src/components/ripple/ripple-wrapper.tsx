import React from 'react';
import {View} from 'remax/one';
import {FAYMDC} from '../base';
import clsx from 'clsx';
import TouchRipple from '../ripple/touch-ripple';

const CLASS_PREFIX = FAYMDC+'-ripple-wrapper';

export default ({className, children}: any) => {
  const [touchEvent, setTouchEvent] = React.useState(null);

  const handleTouchStart = (e: any) => {
    console.log(e);
    setTouchEvent(e);
  }

  return (
    <View className={clsx(CLASS_PREFIX+'-root', className)} onTouchStart={handleTouchStart}>
      {children}
      <TouchRipple touchEvent={touchEvent}/>
    </View>
  )
}
