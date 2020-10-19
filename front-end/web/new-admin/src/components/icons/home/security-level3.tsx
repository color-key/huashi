import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M512 42.656L128 213.344v256c0 236.8 163.84 458.24 384 512 220.16-53.76 384-275.2 384-512v-256L512 42.656z m298.656 426.688c0 192.832-127.136 370.752-298.656 423.68-171.52-52.928-298.656-230.848-298.656-423.68V268.8L512 136.096 810.656 268.8v200.544z m-494.496 25.152L256 554.656l170.656 170.688L768 384l-60.16-60.576-281.184 281.152-110.496-110.08z"/>
   </SvgIcon>
  )
}