import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M426.656 341.344h-85.312V512H170.656v85.344h170.688V768h85.312v-170.656h170.688V512h-170.688v-170.656z m192-81.92v77.632l106.688-21.312V768h85.312V213.344l-192 46.08z" />
   </SvgIcon>
  )
}