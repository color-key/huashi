import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M316.16 529.504l153.184-152.768v604.608h85.312V376.736l153.184 153.184L768 469.344l-256-256-256 256 60.16 60.16zM256 170.656h512V85.344H256v85.312z"/>
   </SvgIcon>
  )
}