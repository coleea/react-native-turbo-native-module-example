import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  AppRegistry,
  TouchableHighlight,
  TouchableNativeFeedbackBase,
  TouchableOpacity,
} from 'react-native';

// import NativeLocalStorage from './specs/NativeLocalStorage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStorageElement} from './src/Storage.android';
// import CameraScreen from './src/CameraScreen';
// import { CameraScreen } from './src/CameraScreen';
// import {Text} from 'react-native'
// const EMPTY = '<empty>';

function App(): React.JSX.Element {
  return (
    <>
      <NativeStorageElement />
      {/* <CameraScreen /> */}
    </>
  );
  //   const [value, setValue] = React.useState<string | null>(null);

  //   const [editingValue, setEditingValue] = React.useState<
  //     string | null
  //   >(null);

  //   React.useEffect(() => {
  //     const storedValue = NativeLocalStorage?.getItem('myKey');
  //     setValue(storedValue ?? '');
  //   }, []);

  //   function saveValue() {
  //     NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
  //     setValue(editingValue);
  //   }

  //   function clearAll() {
  //     NativeLocalStorage?.clear();
  //     setValue('');
  //   }

  //   function deleteValue() {
  //     NativeLocalStorage?.removeItem('myKey');
  //     setValue('');
  //   }

  //   return (
  //     <SafeAreaView style={{flex: 1}}>
  //       {/* <Text>This is Turbo Native Module Test</Text> */}
  //       <Text style={styles.text}>
  //         Current stored value is: {value ?? 'No Value'}
  //       </Text>
  //       <TextInput
  //         placeholder="Enter the text you want to store"
  //         style={styles.textInput}
  //         onChangeText={setEditingValue}
  //       />
  //       <Button title="Save" onPress={saveValue} />
  //       <Button title="Delete" onPress={deleteValue} />
  //       <Button title="Clear" onPress={clearAll} />
  //     </SafeAreaView>
  //   );
  // }

  // const styles = StyleSheet.create({
  //   text: {
  //     margin: 10,
  //     fontSize: 20,
  //   },
  //   textInput: {
  //     margin: 10,
  //     height: 40,
  //     borderColor: 'black',
  //     borderWidth: 1,
  //     paddingLeft: 5,
  //     paddingRight: 5,
  //     borderRadius: 5,
  //   },
  // });

  // AppRegistry.registerComponent('nativelocalstorage', () => App);
}

export default App;
