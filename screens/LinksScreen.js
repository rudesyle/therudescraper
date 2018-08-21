import React from 'react';
import { observer } from 'mobx-react/native';
import { ScrollView, StyleSheet, View, Text, ListView, FlatList, TouchableHighlight,Observer } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Moment from 'moment';
import Swipeout from 'react-native-swipeout';
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';
import { API_URL } from 'react-native-dotenv'
import ScraperStore from '../ScraperStore'
import { trace } from "mobx"

@observer export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor() {
    super();
    this.loadJSONData();
  }

  loadJSONData() {
    ScraperStore.fetchProjects();
   }

   deleteAd(data) {
     ScraperStore.deleteAd(data);
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
        <Text onPress={() => ScraperStore.fetchProjects()}>REFRESH : {ScraperStore.state}</Text>
        <SwipeableFlatList
            data={ScraperStore.ads}
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
