import React from 'react';
import Icon,{IconProps} from '../icon';

export default ({style, ...props}: IconProps) => {

  const _style = {
    backgroundImage: `url("data:image/svg+xml, %3Csvg height='24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z'/%3E%3C/svg%3E")`,
    ...style
  };

  return (
    <Icon style={_style} {...props}/>
  )
}