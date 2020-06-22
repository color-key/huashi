import React from 'react';
import clsx from 'clsx';
import useEventCallback from '../utils/useEventCallback';
import {Text} from 'remax/one';
import {FAYMDC} from '../base';

const classNamePrefix = FAYMDC+'-touch-ripple';

const useEnhancedEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

export interface Props {
  pulsate?: boolean
  rippleX: number
  rippleY: number
  rippleSize: number
  in?: boolean
  onExited?: Function
  timeout: number
}

/**
 * @ignore - internal component.
 */
function Ripple(props: Props) {
  const {
    // classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited = () => {},
    timeout,
  } = props;
  const [leaving, setLeaving] = React.useState(false);

  const rippleClassName = clsx(classNamePrefix+'-ripple', classNamePrefix+'-rippleVisible', {
    [classNamePrefix+'-ripplePulsate']: pulsate,
  });

  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX,
  };

  const childClassName = clsx(classNamePrefix+'-child', {
    [classNamePrefix+'-childLeaving']: leaving,
    [classNamePrefix+'-childPulsate']: pulsate,
  });

  const handleExited = useEventCallback(onExited);
  // Ripple is used for user feedback (e.g. click or press) so we want to apply styles with the highest priority
  useEnhancedEffect(() => {
    if (!inProp) {
      // react-transition-group#onExit
      setLeaving(true);

      // react-transition-group#onExited
      const timeoutId = setTimeout(handleExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return undefined;
  }, [handleExited, inProp, timeout]);

  return (
    <Text className={rippleClassName} style={rippleStyles}>
      <Text className={childClassName} />
    </Text>
  );
}

// Ripple.propTypes = {
//   /**
//    * Override or extend the styles applied to the component.
//    * See [CSS API](#css) below for more details.
//    */
//   classes: PropTypes.object.isRequired,
//   /**
//    * @ignore - injected from TransitionGroup
//    */
//   in: PropTypes.bool,
//   /**
//    * @ignore - injected from TransitionGroup
//    */
//   onExited: PropTypes.func,
//   /**
//    * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
//    */
//   pulsate: PropTypes.bool,
//   /**
//    * Diameter of the ripple.
//    */
//   rippleSize: PropTypes.number,
//   /**
//    * Horizontal position of the ripple center.
//    */
//   rippleX: PropTypes.number,
//   /**
//    * Vertical position of the ripple center.
//    */
//   rippleY: PropTypes.number,
//   /**
//    * exit delay
//    */
//   timeout: PropTypes.number.isRequired,
// };

export default Ripple;
