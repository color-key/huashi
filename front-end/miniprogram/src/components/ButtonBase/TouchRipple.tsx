import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import clsx from 'clsx';
import Ripple from './Ripple';
import {Text} from 'remax/one';
import {querySelectorClientRect} from '../utils/querySelector';
import {FAYMDC} from '../base';

const classNamePrefix = FAYMDC+'-touch-ripple';
const DURATION = 550;
const DELAY_RIPPLE = 80;

interface Props{
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center?: boolean
  
  className?: string,
}

/**
 * @ignore - internal component.
 *
 * TODO v5: Make private
 */
const TouchRipple = React.forwardRef(function TouchRipple(props: Props, ref) {
  const { center: centerProp = false, className, ...other } = props;
  const [ripples, setRipples] = React.useState<any>([]);
  const nextKey = React.useRef(0);
  const rippleCallback = React.useRef<any>(null);

  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);

  // Used to filter out mouse emulated events on mobile.
  const ignoringMouseDown = React.useRef<any>(false);
  // We use a timer in order to only show the ripples for touch "click" like events.
  // We don't want to display the ripple for touch scroll events.
  const startTimer = React.useRef<any>(null);

  // This is the hook called once the previous timeout is ready.
  const startTimerCommit = React.useRef<any>(null);
  const container = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);

  const startCommit = React.useCallback(
    (params) => {
      const { pulsate, rippleX, rippleY, rippleSize, cb } = params;

      setRipples((oldRipples: any) => [
        ...oldRipples,
        <Ripple
          key={nextKey.current}
          // classes={classes}
          timeout={DURATION}
          pulsate={pulsate}
          rippleX={rippleX}
          rippleY={rippleY}
          rippleSize={rippleSize}
        />,
      ]);
      nextKey.current += 1;
      rippleCallback.current = cb;
    },
    [],
  );

  const start = React.useCallback(
    (event = {}, options = {}, cb?) => {
      const {
        pulsate = false,
        center = centerProp || options.pulsate,
      } = options;

      if (event.type === 'mousedown' && ignoringMouseDown.current) {
        ignoringMouseDown.current = false;
        return;
      }

      if (event.type === 'touchstart') {
        ignoringMouseDown.current = true;
      }

      // Get the size of the ripple
      let rippleX: any;
      let rippleY: any;
      let rippleSize: any;
      querySelectorClientRect('.'+classNamePrefix+'-root').then(res => {
        const rect = res ? {
          width: res[0].width,
          height: res[0].height,
          left: res[0].left,
          top: res[0].top,
        }:{
          width: 0,
          height: 0,
          left: 0,
          top: 0,
        }
        if (
          center ||
          (event.clientX === 0 && event.clientY === 0) ||
          (!event.clientX && !event.touches)
        ) {
          rippleX = Math.round(rect.width / 2);
          rippleY = Math.round(rect.height / 2);
        } else {
          const { clientX, clientY } = event.touches ? event.touches[0] : event;
          rippleX = Math.round(clientX - rect.left);
          rippleY = Math.round(clientY - rect.top);
        }
  
        if (center) {
          rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
  
          // For some reason the animation is broken on Mobile Chrome if the size if even.
          if (rippleSize % 2 === 0) {
            rippleSize += 1;
          }
        } else {
          const sizeX =
            Math.max(Math.abs(rect.width - rippleX), rippleX) * 2 + 2;
          const sizeY =
            Math.max(Math.abs(rect.height - rippleY), rippleY) * 2 + 2;
          rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
        }
  
        // Touche devices
        if (event.touches) {
          // check that this isn't another touchstart due to multitouch
          // otherwise we will only clear a single timer when unmounting while two
          // are running
          if (startTimerCommit.current === null) {
            // Prepare the ripple effect.
            startTimerCommit.current = () => {
              startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
            };
            // Delay the execution of the ripple effect.
            startTimer.current = setTimeout(() => {
              if (startTimerCommit.current) {
                startTimerCommit.current();
                startTimerCommit.current = null;
              }
            }, DELAY_RIPPLE); // We have to make a tradeoff with this value.
          }
        } else {
          startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
        }
      })
    },
    [centerProp, startCommit],
  );

  const pulsate = React.useCallback(() => {
    start({}, { pulsate: true });
  }, [start]);

  const stop = React.useCallback((event, cb) => {
    clearTimeout(startTimer.current);

    // The touch interaction occurs too quickly.
    // We still want to show ripple effect.
    if (event.type === 'touchend' && startTimerCommit.current) {
      event.persist();
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.current = setTimeout(() => {
        stop(event, cb);
      });
      return;
    }

    startTimerCommit.current = null;

    setRipples((oldRipples: any) => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
    rippleCallback.current = cb;
  }, []);

  React.useImperativeHandle(
    ref,
    () => ({
      pulsate,
      start,
      stop,
    }),
    [pulsate, start, stop],
  );

  return (
    <Text className={clsx(classNamePrefix+'-root', className)} ref={container} {...other}>
      <TransitionGroup component={null} exit>
        {ripples}
      </TransitionGroup>
    </Text>
  );
});

export default React.memo(TouchRipple);
// export default withStyles(styles, { flip: false, name: 'MuiTouchRipple' })(React.memo(TouchRipple));
