import React from 'react';

class ModuleAdsense extends React.Component {
  constructor(props){
    super(props);
    this.state = { meta: props.meta }
  }

  componentDidMount(){
    if( ! this.state.meta.adsense ) return;

    if( document.querySelectorAll("script#b-adsense").length < 1 ){
      let script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.id = "b-adsense";

      let adsbygoogle;

      script.addEventListener("load", () => {
        (adsbygoogle = window.adsbygoogle || []).push({});
      });

      document.querySelector(".b-ad").appendChild(script);
    }
  }

  render(){
    if( ! this.state.meta.adsense ) return null;

    return (
      <div class="b-ad" style={{"text-align": "center"}}>
        <ins class="adsbygoogle" style={{"display": "inline-block", "width": "728px", "height": "90px"}} data-ad-client={this.state.meta.adsense} />
      </div>
    )
  }
}

export default ModuleAdsense;