import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Tooltip, {TooltipProps} from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

interface Props extends TooltipProps{
  buttonProps?: ButtonProps
}

export default ({buttonProps, children, ...props}: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          arrow
          {...props}
        >
          <Button onClick={handleTooltipOpen} {...buttonProps}>{children}</Button>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
}
