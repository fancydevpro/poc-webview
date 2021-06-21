import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { WithLocalSvg } from 'react-native-svg';
import { WebView } from 'react-native-webview';

const BackArrow = require('../../assets/images/NavigationBackDk.svg');
const ForwardArrow = require('../../assets/images/NavigationForwardDk.svg');
const SocialAttacheIcon = require('../../assets/images/CompanySocialAttacheClr.svg');
const FacebookIcon = require('../../assets/images/CompanyFacebookDk.svg');
const InstagramIcon = require('../../assets/images/CompanyInstagramDk.svg');
const LinkedInIcon = require('../../assets/images/CompanyLinkedInDk.svg');

const SocialAttachUrl = 'https://socialattache.com/';
const FacebookUrl = 'https://www.facebook.com/';
const TiktokUrl = 'https://www.tiktok.com/';

const SocialAttacheScreen = ({ navigation, route }) => {
  const webView = useRef();
  const cookieRef = useRef({value: ''});
  //const weburl = 'http://192.168.1.30/webview.php'
  //const weburl = 'https://tiktok.com/'
  //const weburl = 'https://www.facebook.com/'  

  const [weburl, setWebUrl] = useState(SocialAttachUrl)

  // handle message from webpage
  const onBridgeMessage = (event) => {
    const { data } = event.nativeEvent;    
    const jsonData = JSON.parse(data);
    console.log(jsonData);    
    if(jsonData.type == 'message') {
      Alert.alert('PocWeb', jsonData.value);
    } else if(jsonData.type == 'cookie'){   
      cookieRef.current.value = jsonData.value;
      //Alert.alert('Cookie from the webview', jsonData.value);
    }
  }

  // get cookie 
  const getCookie = () => {
    const javascriptCodeToSend = `
      window.ReactNativeWebView.postMessage(JSON.stringify({type: 'cookie', value: document.cookie}));
      true;
    `;
    webView.current.injectJavaScript(javascriptCodeToSend);
  }
  // button handler to show cookie
  const onPressedShowCookie = () => {
    getCookie();
  }

  const requestAjaxCallWithCookie = async (cookie) => {
    const response = await fetch('http://192.168.1.30/login.php', {
      headers: {
        'cookie': cookie
      }
    });
    const jsonData = await response.json();
    console.log(jsonData);
    Alert.alert('Ajax response', JSON.stringify(jsonData));
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

  const onPressedSocialAttache = () => {
    setWebUrl(SocialAttachUrl);
  }

  const onPressedFacebook = () => {
    setWebUrl(FacebookUrl);
  }

  const onNavigationStateChange = (navState) => {
    console.log('NavState', navState.url);
  }

  return (
      <SafeAreaView style={styles.container}>
        <View
          style={styles.headerView}>
          <View
            style={styles.headerLeftView}>
            <TouchableOpacity
              style={styles.headerButton}>
              <WithLocalSvg
                width={24}
                height={24}
                asset={BackArrow}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}>
              <WithLocalSvg
                width={24}
                height={24}
                asset={ForwardArrow}/>
            </TouchableOpacity>
          </View>
          <View
            style={styles.headerLeftView}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={onPressedSocialAttache}>
              <WithLocalSvg
                width={24}
                height={24}
                asset={SocialAttacheIcon}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={onPressedFacebook}>
              <WithLocalSvg
                width={24}
                height={24}
                asset={FacebookIcon}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}>
              <WithLocalSvg
                width={24}
                height={24}
                asset={InstagramIcon}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}>
              <WithLocalSvg
                width={24}
                height={24}
                asset={LinkedInIcon}/>
            </TouchableOpacity>
          </View>
        </View>
        <WebView
          ref={webView}
          onLoad={() => getCookie()}
          source={{
            uri: weburl,
            // headers: {
            //   Cookie: 'user=john; password=123456',
            // },
          }}            
          allowsInlineMediaPlayback="true"
          onMessage={onBridgeMessage}
          javaScriptEnabled={true}
          sharedCookiesEnabled={true} 
          thirdPartyCookiesEnabled={true}
          onNavigationStateChange={onNavigationStateChange}
        />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textView: {
      color: 'white'
  },
  headerView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',    
    paddingHorizontal: 8
  },
  headerLeftView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerButton: {
    marginHorizontal: 8
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

export default SocialAttacheScreen;