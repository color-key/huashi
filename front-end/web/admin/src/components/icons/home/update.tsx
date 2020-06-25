import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M170.656 256h768V170.656h-768A85.6 85.6 0 0 0 85.344 256v469.344H0v128h597.344v-128H170.656V256z m810.688 85.344h-256c-23.488 0-42.688 19.2-42.688 42.656v426.656c0 23.488 19.2 42.688 42.688 42.688h256c23.456 0 42.656-19.2 42.656-42.688V384c0-23.456-19.2-42.656-42.656-42.656z m-42.688 384H768v-298.688h170.656v298.688z"/>
   </SvgIcon>
  )
}