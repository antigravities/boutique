import React from 'react';

class ModuleDisqus extends React.Component {
  constructor(props){
    super(props);

    this.state = { dqtag: props.dqtag };
  }

  componentDidMount(){
    let script = document.createElement("script");
    script.innerHTML = `var disqus_config = function () {
      this.page.url = '${window.location.href}';
      this.page.identifier = '${window.location.pathname}';
    };

    (function() {
      var d = document, s = d.createElement('script');
      s.src = 'https://${this.state.dqtag}.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();`;
    
    document.querySelector("#disqus").appendChild(script);
  }

  render(){
    return (
      <div id="disqus">
        <div id="disqus_thread"></div>
      </div>
    )
  }
}

export default ModuleDisqus;