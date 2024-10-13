import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button , FlatList} from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState, useEffect } from 'react';




export default function App() {

  const [contact, setContact] = useState({});
  const[ permission, setPermission] = useState(false);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      setPermission(true);
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      if (data.length > 0) {
        setContact(data);
        // console.log(data[0]["phoneNumbers"]);
      }
    }
  }


  return (
    <View style={styles.container}>
      {permission && ( <FlatList
        data={contact}
        renderItem={({item}) => 
        <Text>{item.name}  {!isNaN(parseInt(item["phoneNumbers"][0]["number"][0])) ? item["phoneNumbers"][0]["number"][0] : item["phoneNumbers"][0]["number"][1]}  {item["phoneNumbers"][0]["number"]}</Text>}
        keyExtractor={item => item.id}
      />)}
      <Button title="Get Contact" onPress={getContacts} />
      {/* <Button title="reset" onPress={() => setPermission(false)} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
