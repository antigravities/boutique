import React from 'react';
import ModuleGoogleAnalyticsTag from './GoogleAnalyticsTag';
import ModuleIcon from './Icon';

class ModuleFooter extends React.Component {
  constructor(props){
    super(props);

    this.state = { meta: props.meta }
  }

  render(){
    let gtag = "";

    if( this.state.meta.gtag && this.state.meta.gtag.length > 0 ){
      gtag = <ModuleGoogleAnalyticsTag tag={this.state.meta.gtag} />
    }
    
    return (
      <div className="text-center">
        <hr />
        <ModuleIcon awesome="fa-flag"></ModuleIcon> &copy; 2019 {this.state.meta.name} &middot; Powered by <a href="https://github.com/antigravities/boutique">Boutique</a>
        <br />
        {gtag}
      </div>
    )
  }
}

export default ModuleFooter;