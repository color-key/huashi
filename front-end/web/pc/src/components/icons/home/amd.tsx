import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M896 128v768l-211.072-211.008V339.008H338.816L128 128h768z m-554.72 256v298.56H640L426.72 896H128v-298.784L341.28 384z" />
   </SvgIcon>
  )
}