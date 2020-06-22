import React from "react";

interface Props{
  submit: boolean
  onChange: any
}

export default ({submit, onChange}: Props) => {
  const iframeRef = React.createRef<any>();
  const [loadOAuth2, setLoadOAuth2] = React.useState(false);
  const [iframeSrc, setIframeSrc] = React.useState<string|null>(null);
  const [key, setKey] = React.useState<number>(1);

  const receiveMessage = (event: any) => {
    // if (event.origin !== window.location.origin && event.origin.indexOf('localhost') < 0)
    // return;
    const data: any = event.data || {};
    if(data.load){
      setLoadOAuth2(true);
    }
    if(data.loginSuccess){
      console.log("login", true);
      document.cookie = "OAUTH2SESSION="+data.data["OAUTH2SESSION"]+"; expires=; path=/;";
      onChange(true);
      setKey(key+1);
    }
    if(data.loginFailed){
      console.log("login", false)
      onChange(false);
      setKey(key+1);
    }
  }

  React.useEffect(() => {
    window.addEventListener("message", receiveMessage, false);
    setIframeSrc(`https://www.keypool.com/oauth2/login/`);
  }, []);

  React.useEffect(() => {
    if(submit && loadOAuth2){
      console.log(document.cookie);
      iframeRef.current.contentWindow.postMessage({login: true, cookie: document.cookie}, "*");
    }
  }, [submit, loadOAuth2]);

  return (
    iframeSrc ? <iframe key={key} src={iframeSrc} ref={iframeRef} id="fay-iframe" name="fay-iframe" style={{display: "none"}}/> : <div/>
  )
}