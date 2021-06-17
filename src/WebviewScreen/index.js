import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
const WebviewScreen = ({ navigation, route }) => {
  const webView = useRef();
  const weburl = 'http://192.168.1.30/webview.php'
  
  // handle message from webpage
  const onBridgeMessage = (event) => {
    const { data } = event.nativeEvent;
    console.log(data);
    Alert.alert('PocWeb', data);
  }

  // button handler to send message to webpage
  const onPressedSend = () => {
    const message = JSON.stringify('This is message from mobile app.');
    // you can add any javascript code to inject in the webpage.
    const javascriptCodeToSend = `
      window.postMessage(${message}, "*");
      true;
    `;
    webView.current.injectJavaScript(javascriptCodeToSend);
  }

  return (
      <View style={styles.container}>
          <WebView
            ref={webView}
            source={{
              uri: weburl,
            }}
            onMessage={onBridgeMessage}
            javaScriptEnabled={true}
          />
          <TouchableOpacity        
            style={styles.buttonContainer}
            onPress={onPressedSend}>
            <Text
                style={styles.textView}>
                Send to webpage
            </Text>
          </TouchableOpacity>
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
      width: 100,
      height: 44,
      position: 'absolute',
      bottom: 16,
      right: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: '#006efe'
  }
});

export default WebviewScreen;