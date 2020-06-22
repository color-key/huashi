import React, { Children } from 'react';
import {View} from 'remax/one';
import {FAYMDC} from '../base';
import clsx from 'clsx';
// import './ripple.scss';

const CLASS_PREFIX = FAYMDC+'-paper';

export default ({elevation=1, square, className, style, children, ...props}: any) => {

  return (
    <View
      className={clsx(CLASS_PREFIX+'-root', CLASS_PREFIX+'-elevation'+elevation, {[CLASS_PREFIX+'-rounded']: !square}, className)}
      style={style}
      {...props}
    >
      {children}
    </View>
  )
}