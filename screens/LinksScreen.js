import React from 'react';
import { ScrollView, StyleSheet, View, Text, ListView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Moment from 'moment';
import Swipeout from 'react-native-swipeout';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = "['row 1', 'row 2', 'row 999']";

    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 999']),
    };
    this.loadJSONData();
  }

  loadJSONData() {
    let apiUrl = 'https://fast-bastion-78079.herokuapp.com/scrape';
    //let apiUrl = 'http://localhost:3000/scrape';

     fetch(apiUrl, {method: "GET"})
     .then((response) => response.json())
     .then((responseData) =>
     {
          var json = responseData;
          console.log('response object:',responseData)
          this.setState({ dataSource: this.state.dataSource.cloneWithRows(json) });
     })
     .done(() => {
     });
   }

   deleteAd(data) {
     //console.log('Deleting an poop' + data.description);

     let apiUrl = 'https://fast-bastion-78079.herokuapp.com/ad';
     //let apiUrl = 'http://localhost:3000/ad';

     fetch(apiUrl, {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         "dateSet": data.dateTime,
         "source": data.source,
         "status": 1
       })
      });
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
          <Text>{ rowData.description} ({ rowData.source })</Text>
          <Text>{ rowData.dateTime }</Text>
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
