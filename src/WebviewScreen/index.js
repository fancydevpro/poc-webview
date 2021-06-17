import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
const WebviewScreen = ({ navigation, route }) => {

  const weburl = 'https://loadster.app/'
  const onBridgeMessage = (event) => {

  }
  return (
      <View style={styles.container}>
          {/* <TouchableOpacity        
              style={styles.buttonContainer}
              onPress={onPressedWebView}>
              <Text
                  style={styles.textView}>
                  Test
              </Text>
          </TouchableOpacity> */}
          <WebView
            source={{
              uri: weburl,
            }}
            onMessage={onBridgeMessage}
            javaScriptEnabled={true}
          />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textView: {
      color: 'white'
  },
  buttonContainer: {
      width: 200,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: '#006efe'
  }
});

export default WebviewScreen;