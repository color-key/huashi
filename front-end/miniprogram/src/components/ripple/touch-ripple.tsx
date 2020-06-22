import React from 'react';
import {View, Text} from 'remax/one';
import {FAYMDC} from '../base';
import clsx from 'clsx';
import Ripple from './ripple';
// import './touch-ripple.scss';
import {querySelectorClientRect} from '../utils/querySelector';

const CLASS_PREFIX = FAYMDC+'-touch-ripple';
const DELAY_RIPPLE = 80;
const DURATION = 550;

export default React.forwardRef(({touchEvent, pulsate = false, rippleX, rippleY, rippleSize, in: inProp, onExited = () => {}, timeout}: any, ref: any) => {
  const [ripples, setRipples] = React.useState<any>([]);
  const nextKey = React.useRef(0);
  const startTimer = React.useRef<any>(null);
  const rippleCallback = React.useRef<any>(null);

  React.useEffect(() => {
    return () => clearTimeout(startTimer.current);
  }, []);

  const start = React.useCallback((touchEvent) => {
    const { clientX, clientY } = touchEvent.touches[0];
    const { offsetLeft, offsetTop } = touchEvent.currentTarget;
    rippleX = Math.round(clientX - offsetLeft);
    rippleY = Math.round(clientY - offsetTop);
    console.log(rippleX, rippleY);
    querySelectorClientRect('.'+CLASS_PREFIX+'-root').then((res) => {
      console.log('打印demo的元素的信息', res);
      console.log('打印width', res[0].width);
      console.log('打印height', res[0].height);
    
      const sizeX =
        Math.max(Math.abs(res[0].width - rippleX), rippleX) * 2 + 2;
      const sizeY =
        Math.max(Math.abs(res[0].height - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
      console.log(sizeX, sizeY);
      console.log(rippleSize);
      // setRipples((oldRipples: any) => {
      //   if (oldRipples.length > 0) {
      //     return oldRipples.slice(1);
      //   }
      //   return oldRipples;
      // });
      startTimer.current = setTimeout(() => {
        setRipples((oldRipples: any) => [
          ...oldRipples,
          <Ripple
            key={nextKey.current}
            duration={DURATION}
            rippleX={rippleX}
            rippleY={rippleY}
            rippleSize={rippleSize}
          />
        ]);
        nextKey.current += 1;
      }, DELAY_RIPPLE);
    })
  }, []);

  const stop = React.useCallback(() => {
    // clearTimeout(startTimer.current);
    // setRipples((oldRipples: any) => {
    //   if (oldRipples.length > 0) {
    //     return oldRipples.slice(1);
    //   }
    //   return oldRipples;
    // });
    // setTimeout(() => {
    //   setRipples((oldRipples: any) => {
    //     if (oldRipples.length > 0) {
    //       return oldRipples.slice(1);
    //     }
    //     return oldRipples;
    //   });
    // }, (DELAY_RIPPLE+DURATION*2))
  }, []);

  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);

  React.useEffect(() => {
    console.log('touchEvent', touchEvent);
    if(touchEvent){
      stop();
      rippleCallback.current = start(touchEvent);
    }
  }, [JSON.stringify(touchEvent)])

  return (
    <View className={CLASS_PREFIX+'-root'}>
      {ripples}
    </View>
  )
})