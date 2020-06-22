import React from 'react';
import {Text} from 'remax/one';
import {FAYMDC} from '../base';
import clsx from 'clsx';
// import {getSystemInfoSync} from 'remax/wechat';

const CLASS_PREFIX = FAYMDC+'-icon';

export interface IconProps {
  className?: string
  size?: number
  style?: object
  color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error'
}

export default ({className, size=24, style,  color, ...props}: IconProps) => {
  // const {pixelRatio} = getSystemInfoSync();
  const pixelRatio = 2;
  const [state, setState] = React.useState({width: size*pixelRatio, height: size*pixelRatio});

  React.useEffect(() => {
    setState({width: size*pixelRatio, height: size*pixelRatio});
  }, [size])

  return (
    <Text
      className={clsx(
        CLASS_PREFIX+'-root',
        {[CLASS_PREFIX+'-color-'+color]: color},
        className
      )}
      style={{width: state.width, height: state.height, ...style}}
      {...props}>
    </Text>
  )
}