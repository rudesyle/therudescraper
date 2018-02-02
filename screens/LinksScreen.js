import React from 'react';
import { ScrollView, StyleSheet, View, Text, ListView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Moment from 'moment';
import Swipeout from 'react-native-swipeout';
import { API_URL } from 'react-native-dotenv'
var Environment = require('../environment.js')

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor() {
    super();

    //ApiClient.init('API_URL');

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = "['row 1', 'row 2', 'row 999']";

    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 999']),
    };
    this.loadJSONData();
  }

  loadJSONData() {

    let apiUrl = 'http://localhost:3000/scrape';//API_URL + '/scrape';
    console.log(process.env);
    console.log('peeks');
    fetch(apiUrl, {method: "GET"})
     .then((response) => response.json())
     .then((responseData) =>
     {
          var json = responseData;
          this.setState({ dataSource: this.state.dataSource.cloneWithRows(json) });
     })
     .done(() => {
     });
   }

   deleteAd(data) {
     //console.log('Deleting an poop' + data.description);

     //let apiUrl = 'https://fast-bastion-78079.herokuapp.com/ad';
     let apiUrl = 'http://localhost:3000/ad';

     fetch(apiUrl, {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         "source": data.Source,
         "description": data.Description
       })
      });
      return;
  }

  renderRow(rowData) {
    // Buttons
    var swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: '#ff0000',
        onPress: () => { this.deleteAd(rowData); }
      }
    ]
    Moment.locale('en');
      return (

        <Swipeout right={swipeoutBtns}>
          <View>
          <Text>{ API_URL }</Text>
          <Text>{ rowData.Description} ({ rowData.Source })</Text>
          <Text>{ rowData.DateSet }</Text>
          </View>
        </Swipeout>
      )
    }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={ this.renderRow.bind(this) }
        />
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  rowStyle : {
    backgroundColor : '#fff'
  },
  rowStyleAlt : {
    backgroundColor : '#d3d3d3'
  }
});
