import React from 'react';
import {View} from 'remax/one';
import {FAYMDC} from '../base';
import clsx from 'clsx';

const _FAYMDC = FAYMDC+'-ripple';

export default ({pulsate = false, rippleX, rippleY, rippleSize, in: inProp, onExited = () => {}, timeout}: any) => {
  const [leaving, setLeaving] = React.useState(false);

  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX,
  };

  const rippleClassName = clsx(_FAYMDC, _FAYMDC+'-rippleVisible', {
    [_FAYMDC+'-ripplePulsate']: pulsate,
  });

  const childClassName = clsx(_FAYMDC+'-child', {
    [_FAYMDC+'-childLeaving']: leaving,
    [_FAYMDC+'-childPulsate']: pulsate,
  });

  // const handleExited = useEventCallback(onExited);

  // React.useEffect(() => {
  //   if (!inProp) {
  //     setLeaving(true);

  //     const timeoutId = setTimeout(handleExited, timeout);
  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }
  //   return undefined;
  // }, [handleExited, inProp, timeout]);

  return (
    <View className={rippleClassName} style={rippleStyles}>
      <View className={childClassName} ></View>
    </View>
  )
}