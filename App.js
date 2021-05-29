// import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { StyleSheet, ScrollView, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

export default function App() {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    axios.get('https://reqres.in/api/users?per_page=12').then((response) => setContact(response.data.data));
  }, []);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <Image source={{ uri: item.avatar }} style={{ width: 100, height: 100, margin: 0 }}></Image>
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
          }}>
          <Text style={[styles.title, textColor]}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={[styles.subtitle, textColor]}>{item.email}</Text>
        </View>

        {item.id === selectedId ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 40,
              marginRight: 20,
              justifyContent: 'space-around',
            }}>
            <Icon size={20} reverseColor name='phone-alt' type='font-awesome-5' color='#fff' />
            <Icon size={20} reverseColor name='comment-alt' type='font-awesome-5' color='#fff' />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 40,
              marginRight: 30,
              justifyContent: 'flex-end',
            }}>
            <Icon solid size={12} name='circle' style='solid' type='font-awesome-5' color='green' />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const defaultColor = item.id % 2 == 0 ? '#fff' : '#E8E8E8';
    const backgroundColor = item.id === selectedId ? '#CC99FF' : defaultColor;
    const color = item.id === selectedId ? 'white' : 'black';
    // const view =

    return <Item item={item} onPress={() => setSelectedId(item.id)} backgroundColor={{ backgroundColor }} textColor={{ color }} />;
  };

  return (
    <SafeAreaProvider>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'CONTACTS', style: { color: 'white', fontSize: 15 } }}
        containerStyle={{
          backgroundColor: 'mediumseagreen',
          justifyContent: 'space-around',
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          <FlatList data={contact} renderItem={renderItem} keyExtractor={(item) => item.id} extraData={selectedId} />
        </View>
      </ScrollView>
      <ActionButton buttonColor='mediumseagreen'></ActionButton>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 25,
  },
  subtitle: {
    fontSize: 15,
    paddingLeft: 25,
  },
});
