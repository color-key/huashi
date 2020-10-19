import React from 'react';
import Grow, { GrowProps } from "@material-ui/core/Grow";
import {isInViewPortOfTwo} from '@/lib/is-in-view';

export default ({children, ...props}: GrowProps) => {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log(123123);
      console.log(show);
      console.log(ref.current);
      console.log(ref.current && isInViewPortOfTwo(ref.current));
      if(!show && ref.current && isInViewPortOfTwo(ref.current)){
        clearInterval(interval);
        setShow(true);
      }
    }, 500)
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <Grow
      in={show}
      timeout={2000}
      ref={ref}
      {...props}
    >
      {children}
    </Grow>
  )
}