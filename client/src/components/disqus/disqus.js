import React from 'react';

class Disqus extends React.Component {

	disqus_config() {
		// this.page.url = "http://jits-app.herokuapp.com"
		// this.page.identifier = "fakeIdentifier"
		this.page.url = this.props.url;
		this.page.identifier = this.props.identifier;
	}

	componentDidMount() {
		var d = document, s = d.createElement('script');
		s.src = 'https://jitstube.disqus.com/embed.js';
		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
	}

	render() {
		return (
			<div>
				{this.props.idInDatabase && <div id="disqus_thread" style={{marginTop: '30px'}}></div>}
			</div>
		)
	}
}
export default Disqus;


// <div id="disqus_thread"></div>
// <script>

// /**
// *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
// *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
// /*
// var disqus_config = function () {
// this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
// this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
// };
// */
// (function() { // DON'T EDIT BELOW THIS LINE
// var d = document, s = d.createElement('script');
// s.src = 'https://jitstube.disqus.com/embed.js';
// s.setAttribute('data-timestamp', +new Date());
// (d.head || d.body).appendChild(s);
// })();
// </script>
// <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
//                             