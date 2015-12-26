'use strict';

var React = require('react-native');
var URL = 'http://api.randomuser.me/?results=100';
var {
	AppRegistry,
	Image,
	StyleSheet,
	Text,
	View,
	ListView
	} = React;

var starterApp = React.createClass({

	getInitialState: function () {
		return {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 != row2
			}),
			isLoading: false
		}
	},

	componentDidMount: function () {
		this.fetchDataFromServer();
	},

	fetchDataFromServer: function () {
		fetch(URL)
			.then((res) => res.json())
			.then((responseData) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData.results),
					isLoading: true
				})
			})
		.done();
	},

	render: function () {
		if (!this.state.isLoading) {
			return this.renderLoadingView();
		}

		return this.renderListOfRandomUsers();
	},

	renderLoadingView: function () {
		return (
			<View style={styles.container}>
				<Text>Loading ...</Text>
			</View>
		)
	},

	renderListOfRandomUsers: function () {
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderUserRow}
				style={styles.listView}>
			</ListView>
		)
	},

	renderUserRow: function (row) {
		return (
			<View style={styles.container}>
				<Image
					source={{uri: row.user.picture.thumbnail}}
					style={styles.thumbnail}>
				</Image>
				<View style={styles.containerRight}>
					<Text>{row.user.username}</Text>
					<Text>{row.user.email}</Text>
				</View>
			</View>
		)
	}
});

var styles = React.StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		marginLeft: 10,
		marginRight: 10,
		paddingLeft: 20,
		paddingTop: 6,
		paddingBottom: 6,
		backgroundColor: '#EFEFEF'
	},
	containerRight: {
		flex: 1,
		paddingLeft: 20
	},
	thumbnail: {
		width: 60,
		height: 60
	},
	listView: {
		paddingTop: 20
	}
});

AppRegistry.registerComponent('starterApp', () => starterApp);