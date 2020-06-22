import React from 'react';
import { Button, View } from 'remax/one';
import {createSelectorQuery} from 'remax/wechat';
import {FAYMDC} from '../base';
import Ripple from './ripple';

const DURATION = 550;
const DELAY_RIPPLE = 80;

export default React.forwardRef(({children}: any, ref: any) => {

  const [ripples, setRipples] = React.useState<any>([]);
  const ignoringMouseDown = React.useRef(false);
  const startTimer = React.useRef<any>(null);
  const startTimerCommit = React.useRef<any>(null);
  const nextKey = React.useRef(0);
  const rippleCallback = React.useRef<any>(null);
  const container = React.useRef(null);

  const handleClick = (e: any) => {
    console.log(e);
    // start();
    start(e);
  }

  React.useEffect(() => {
    const rect = container.current;
    console.log(rect);
    const query = createSelectorQuery();
    query.select('.'+FAYMDC+'-ripple-wrapper').boundingClientRect();
    // console.log(query.select('.'+FAYMDC+'-ripple-wrapper').boundingClientRect());
    console.log(query.selectViewport().scrollOffset());
    query.exec(function (res) {
      res[0].top       // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      console.log('打印demo的元素的信息', res);
      console.log('打印高度', res[0].height);
    })
    // console.log(rect!.getBoundingClientRect());
  }, []);

  const startCommit = React.useCallback(
    (params) => {
      const { pulsate, rippleX, rippleY, rippleSize, cb } = params;

      setRipples((oldRipples: any) => [
        ...oldRipples,
        <Ripple
          key={nextKey.current}
          timeout={DURATION}
          pulsate={pulsate}
          rippleX={rippleX}
          rippleY={rippleY}
          rippleSize={rippleSize}
        />,
      ]);
      nextKey.current += 1;
      rippleCallback.current = cb;
    },
    [],
  )

  const start = React.useCallback(
    (event = {}, options = {}, cb?) => {
      if (event.type === 'mousedown' && ignoringMouseDown.current) {
        ignoringMouseDown.current = false;
        return;
      }
      if (event.type === 'touchstart') {
        ignoringMouseDown.current = true;
      }

      let rippleX: any;
      let rippleY: any;
      let rippleSize: any;
      // rippleX = Math.round(rect.width / 2);
      // rippleY = Math.round(rect.height / 2);
      const { clientX, clientY } = event.touches[0];
      const { offsetLeft, offsetTop } = event.currentTarget;
      rippleX = Math.round(clientX - offsetLeft);
      rippleY = Math.round(clientY - offsetTop);
      const query = createSelectorQuery();
      query.select('.'+FAYMDC+'-ripple-wrapper').boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec((res) => {
        // res[0].top       // #the-id节点的上边界坐标
        // res[1].scrollTop // 显示区域的竖直滚动位置
        console.log('打印demo的元素的信息', res);
        console.log('打印高度', res[0].height);
        const sizeX =
          Math.max(Math.abs(res[0].width - rippleX), rippleX) * 2 + 2;
        const sizeY =
          Math.max(Math.abs(res[0].height - rippleY), rippleY) * 2 + 2;
        rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
        console.log(sizeX, sizeY);
        console.log(rippleSize);
        if (startTimerCommit.current === null) {
          startTimerCommit.current = () => {
            startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
          };
          startTimer.current = setTimeout(() => {
            if (startTimerCommit.current) {
              startTimerCommit.current();
              startTimerCommit.current = null;
            }
          }, DELAY_RIPPLE);
        }
      })
    },
    [startCommit],
  );

  const pulsate = React.useCallback(() => {
    start({}, { pulsate: true });
  }, [start]);

  const stop = React.useCallback(
    (event = {}, cb) => {
      clearTimeout(startTimer.current);
      if (event.type === 'touchend' && startTimerCommit.current) {
        event.persist();
        startTimerCommit.current();
        startTimerCommit.current = null;
        startTimer.current = setTimeout(() => {
          stop(event, cb);
        });
        return;
      }
      startTimerCommit.current = null;
      setRipples((oldRipples) => {
        if (oldRipples.length > 0) {
          return oldRipples.slice(1);
        }
        return oldRipples;
      });
      rippleCallback.current = cb;
    },
    [],
  );

  return (
    <View className={FAYMDC+'-ripple-wrapper'} onTouchStart={handleClick}>
      <View ref={ref} className={FAYMDC+'-test'} onTouchStart={handleClick}>
        {children}
        123123123
        </View>
      <View className={FAYMDC+'-ripple-root'} ref={container}>
        {ripples}
      </View>
    </View>
    
  )
})