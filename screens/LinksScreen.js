import React from 'react';
import { ScrollView, StyleSheet, View, Text, ListView, FlatList, TouchableHighlight } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Moment from 'moment';
import Swipeout from 'react-native-swipeout';
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';
import { API_URL } from 'react-native-dotenv'
var Environment = require('../environment.js')

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor() {
    super();

    //ApiClient.init('API_URL');

    //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    let data = "['row 1', 'row 2', 'row 999']";

    this.state = {
      dataSource: {} //ds.cloneWithRows(data)
    };
    this.loadJSONData();
  }

  loadJSONData() {

    let apiUrl = API_URL + '/scrape';
    //this.state.dataSource.cloneWithRows({}) ;

    console.log(process.env);
    console.log(API_URL);
    fetch(apiUrl, {method: "GET"})
     .then((response) => response.json())
     .then((responseData) =>
     {
          var json = responseData;
          this.setState({ dataSource: json });
     })
     .done(() => {
     });
   }

   deleteAd(data) {
     let apiUrl = API_URL + '/ad';

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

      this.loadJSONData();
      /*
      // removing the first element in the array
      //items.splice(0, 1);

      // create a new DataSource object
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => { r1 !== r2 }});

      // update the DataSource in the component state
      this.setState({
          dataSource : ds.cloneWithRows(items),
      });
      */
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
        <Swipeout right={swipeoutBtns} autoClose>
          <View>
          <Text>{ rowData.Description} ({ rowData.Source })</Text>
          <Text>{ rowData.DateSet }</Text>
          </View>
        </Swipeout>
      )
    }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SwipeableFlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
                <View style={{ height: 48 }}><Text>{ item.Description} ({ item.Source })</Text><Text>{ item.DateSet }</Text></View>
            )}
            renderRight={({ item }) => (
                <Text style={{ width:80,height:40,backgroundColor:'red',fontWeight: 'bold',textAlign: 'center', color: 'white'   }}
                  onPress={() => this.deleteAd(item)}>DELETE</Text>
            )}
            backgroundColor={'white'}
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
    height:25
  },
  rowStyle : {
    backgroundColor : '#fff'
  },
  rowStyleAlt : {
    backgroundColor : '#d3d3d3'
  }
});
