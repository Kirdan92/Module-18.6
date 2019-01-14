var GIPHY_API_URL = "https://api.giphy.com";
var GIPHY_PUB_KEY = "iPjw37pT2DoEoDYgyq3ENpXiw6rv39Uv";
App = React.createClass({
	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},

	handleSearch(searchingText) {
		this.setState({
			loading: true // loading has started
		});
		this.getGif(searchingText, function(gif) { //start gif downloading
			this.setState({
				loading: false, //koniec pobierania
				gif: gif, //ustawianie pobranego gifa
				searchingText: searchingText //stand dla wyszukiwanego tekstu
			});
		}.bind(this)); // zachowanie kontekstu
	},

	getGif(searchingText, callback) { //wpisany tekst i funkcja do wywolania po pobraniu gifa
		var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // adres do API 
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function() {
			if (xhr.status === 200) {
				var data = JSON.parse(xhr.responseText).data; //rozpakowanie odpowiedzi do obiektu data
					var gif = { //tworzenie gifa z odpowiedzi z serwera
						url: data.fixed_width_downsampled_url,
						sourceUrl: data.url
					};
					callback(gif); //przekazanie parametru do callbacku
			}
		};
		xhr.send();
	},

	render: function() {
		
		var styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div style={styles}>
					<h1>Wyszukiwarka GIFów!</h1>
					<p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
					<Search 
						onSearch={this.handleSearch}
					/>
				<Gif 
					loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);		
	}
});