import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M256 938.656h512l-256-256z"/>
      <path d="M896 128H128a85.6 85.6 0 0 0-85.344 85.344v512c0 46.912 38.4 85.312 85.344 85.312h170.656v-85.312H128v-512h768v512h-170.656v85.312H896c46.944 0 85.344-38.4 85.344-85.312v-512C981.344 166.4 942.944 128 896 128z"/>
   </SvgIcon>
  )
}