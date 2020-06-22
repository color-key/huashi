import React from 'react';
import Icon,{IconProps} from '../icon';

export default ({style, ...props}: IconProps) => {

  const _style = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/%3E%3C/svg%3E")`,
    ...style
  };

  return (
    <Icon style={_style} {...props}/>
  )
}