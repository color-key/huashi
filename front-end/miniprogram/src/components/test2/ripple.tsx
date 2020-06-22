import React from 'react';
import {View, Button, Text} from 'remax/one';
import {FAYMDC} from '../base';
import clsx from 'clsx';
import TouchRipple from '../ripple/touch-ripple';

const CLASS_PREFIX = FAYMDC+'-ripple';

export default () => {
  const [touchEvent, setTouchEvent] = React.useState(null);
  const ref = React.useRef();

  const handleTouchStart = (e: any) => {
    console.log(e);
    setTouchEvent(e);
  }

  return (
    <View style={{color: "red", position: 'relative', background: '#FFFFFF'}} onTouchStart={handleTouchStart}>
      123123
      <TouchRipple touchEvent={touchEvent}/>
    </View>
    
  )
}
