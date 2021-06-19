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
  //const weburl = 'https://socialattache.com/'
  
  // handle message from webpage
  const onBridgeMessage = (event) => {
    const { data } = event.nativeEvent;
    console.log(data);
    Alert.alert('PocWeb', data);
  }

  // button handler to show cookie
  const onPressedShowCookie = () => {
    const data = { type: 'get_cookie'};
    sendMessage(data);
  }
  // button handler to ajax call
  const onPressedAjaxCall = () => {
    const data = { type: 'ajax_call'};
    sendMessage(data);
  }
  // button handler to send message to webpage
  const onPressedSend = () => {
    const data = { type: 'message', text: 'This is message from mobile app.'};
    sendMessage(data);
  }

  const sendMessage = (data) => {
    const message = JSON.stringify(data);
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
              // headers: {
              //   Cookie: 'user=john; password=123456',
              // },
            }}            
            onMessage={onBridgeMessage}
            javaScriptEnabled={true}
          />
          <View
            style={styles.buttonContainer}>
            <TouchableOpacity        
              style={styles.button}
              onPress={onPressedShowCookie}>
              <Text
                  style={styles.textView}>
                  Show cookie
              </Text>
            </TouchableOpacity>
            <TouchableOpacity        
              style={styles.button}
              onPress={onPressedAjaxCall}>
              <Text
                  style={styles.textView}>
                  Ajax call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity        
              style={styles.button}
              onPress={onPressedSend}>
              <Text
                  style={styles.textView}>
                  Send to webpage
              </Text>
            </TouchableOpacity>
          </View>
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
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: 16,
    left: 16,
    right: 16,
  },
  button: {
      width: 100,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: '#006efe'
  }
});

export default WebviewScreen;