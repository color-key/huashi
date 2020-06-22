import React from 'react';
import {FAYMDC} from '../base';
import Ripple from '../ripple';

export default React.forwardRef(({children}: any, ref: any) => {

  return (
    <Ripple ref={ref} className={FAYMDC+'-button'}>
      {children}
    </Ripple>
  )
})