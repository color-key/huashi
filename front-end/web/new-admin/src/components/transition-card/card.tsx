import React from 'react';
import Card, {CardProps} from "@material-ui/core/Card";
import Slide from "@material-ui/core/Slide";

export default ({children, ...props}: CardProps) => {

  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 600);
    return () => {
      clearTimeout(timeout);
    }
  }, []);

  return (
    <Slide
      direction={"up"}
      in={show}
      timeout={500}
    >
      <Card {...props}>
        {children}
      </Card>
    </Slide>
  )
}