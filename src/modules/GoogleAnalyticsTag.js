import React from 'react';

class ModuleGoogleAnalyticsTag extends React.Component {
  constructor(props){
    super(props);
    this.state = { tag: props.tag };
  }

  componentDidMount(){
    const rtag = document.createElement("script");
    rtag.src = "https://www.googletagmanager.com/gtag/js?id=" + this.state.tag;
    
    document.querySelector("#gtag").appendChild(rtag);

    const ltag = document.createElement("script");
    ltag.innerHTML = `window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', '${this.state.tag.trim()}');`;

    document.querySelector("#gtag").appendChild(ltag);
  }

  render(){
    return (
      <div id="gtag">
      </div>
    );
  }
}

export default ModuleGoogleAnalyticsTag;