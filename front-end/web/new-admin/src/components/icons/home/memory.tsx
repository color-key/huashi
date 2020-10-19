import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M768 170.656v682.688H256V376.736l206.08-206.08H768m0-85.312H426.656l-256 256v512c0 46.912 38.4 85.312 85.344 85.312h512c46.944 0 85.344-38.4 85.344-85.312V170.656c0-46.912-38.4-85.312-85.344-85.312zM384 298.656h85.344v170.688H384V298.656z m128 0h85.344v170.688H512V298.656z m128 0h85.344v170.688H640V298.656z"/>
   </SvgIcon>
  )
}