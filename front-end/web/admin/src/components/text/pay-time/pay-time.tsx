import React from 'react';

interface Props{
  remainingTime: number
  onTimeout?: Function
}

const handlePayTime = (time: number) => {
  if(time === 0 || time === 900) return '--';
  const min = Number.parseInt(time / 60 + '');
  if(min === 0) return time % 60 + 's';
  return min + 'min ' + time % 60 + 's';
}

export default ({remainingTime=0, onTimeout}: Props) => {
  const [time, setTime] = React.useState(900);
  const [createTime, setCreateTime] = React.useState(0);

  React.useEffect(() => {
    setCreateTime(new Date().getTime() - remainingTime);
  }, [remainingTime]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const diff = remainingTime - Number(((currentTime - createTime)/1000).toFixed(0));
      setTime(diff > 0 ? diff : 0);
        if(diff <= 0){
          onTimeout && onTimeout();
          clearInterval(interval);
        }
      }, 1000)
      return () => {
        clearInterval(interval);
      }
  }, [createTime]);
  
  return <>{handlePayTime(time)}</>;
}