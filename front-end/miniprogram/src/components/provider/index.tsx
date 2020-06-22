import React from 'react';
import {View} from 'remax/one';
// import './provider.scss';

interface Props{
  children?: React.ReactNode,
  style?: object
  className?: string
  zoom?: number
}

export default ({style, children, zoom=1, ...props}: Props) => {
  return (
    <View style={{zoom, ...style}} {...props}>{children}</View>
  )
}