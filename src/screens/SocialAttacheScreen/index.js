import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { WithLocalSvg } from 'react-native-svg';
import { WebView } from 'react-native-webview';

const BackArrow = require('../../assets/images/NavigationBackDk.svg');
const ForwardArrow = require('../../assets/images/NavigationForwardDk.svg');
const SocialAttacheIcon = require('../../assets/images/CompanySocialAttacheClr.svg');
const FacebookIcon = require('../../assets/images/CompanyFacebookDk.svg');
const InstagramIcon = require('../../assets/images/CompanyInstagramDk.svg');
const LinkedInIcon = require('../../assets/images/CompanyLinkedInDk.svg');
const PinterestIcon = require('../../assets/images/CompanyPinterestDk.svg');
const TikTokIcon = require('../../assets/images/CompanyTikTokDk.svg');
const TwitterIcon = require('../../assets/images/CompanyTwitterDk.svg');

const SocialAttachUrl = 'https://socialattache.com/';
const FacebookUrl = 'https://www.facebook.com/';
const InstagramUrl = 'https://www.instagram.com/';
const LinkedInUrl = 'https://www.linkedin.com/';
const PinterestUrl = 'https://www.pinterest.com/';
const TiktokUrl = 'https://www.tiktok.com/';
const Twitterurl = 'https://www.twitter.com/';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');

const SocialAttacheScreen = ({ navigation, route }) => {
  const [canGoBackMain, setCanGoBackMain] = useState(false);
  const [canGoForwardMain, setCanGoForwardMain] = useState(false);
  const [canGoBackSocial, setCanGoBackSocial] = useState(false);
  const [canGoForwardSocial, setCanGoForwardSocial] = useState(false);

  const [loading, setLoading] = useState(false);
  const [webviewMode, setWebviewMode] = useState(0); // 0: SocialAttache, 1: Social site

  const mainWebView = useRef(null);
  const socialWebView = useRef(null);

  const mainCookieRef = useRef({value: ''});
  const socialCookieRef = useRef({value: ''});
  
  //const weburl = 'http://192.168.1.30/webview.php'
  //const weburl = 'https://tiktok.com/'
  //const weburl = 'https://www.facebook.com/'  

  const [mainWebviewUrl, setMainWebviewUrl] = useState(SocialAttachUrl);
  const [lastMainWebviweUrl, setLastMainWebviewUrl] = useState(SocialAttachUrl);
  
  const [socialWebviewurl, setSocialWebviewurl] = useState(FacebookUrl);
  const [lastSocialWebviweUrl, setLastSocialWebviewUrl] = useState(SocialAttachUrl);
  // social attache
  const onPressedSocialAttache = () => {
    setWebviewMode(0);
    if(webviewMode == 1)
      setMainWebviewUrl(lastMainWebviweUrl);
  };
  // facebook
  const onPressedFacebook = () => {
    setWebviewMode(1);
    if(!lastSocialWebviweUrl.includes('facebook.'))
      setSocialWebviewurl(FacebookUrl);
    // switching from SA
    if(webviewMode == 0) {
      setSocialWebviewurl(lastSocialWebviweUrl);
    }
  };
  // instagram
  const onPressedInstagram = () => {
    setWebviewMode(1);
    if(!lastSocialWebviweUrl.includes('instagram.'))
      setSocialWebviewurl(InstagramUrl);
    // switching from SA
    if(webviewMode == 0) {
      setSocialWebviewurl(lastSocialWebviweUrl);
    }
  }
  // linkedin
  const onPressedLinkedIn = () => {
    setWebviewMode(1);
    if(!lastSocialWebviweUrl.includes('linkedin.'))
      setSocialWebviewurl(LinkedInUrl);
    // switching from SA
    if(webviewMode == 0) {
      setSocialWebviewurl(lastSocialWebviweUrl);
    }
  }
  // pinterest
  const onPressedPinterest = () => {
    setWebviewMode(1);
    if(!lastSocialWebviweUrl.includes('pinterest.'))
      setSocialWebviewurl(PinterestUrl);
    // switching from SA
    if(webviewMode == 0) {
      setSocialWebviewurl(lastSocialWebviweUrl);
    }

  }
  // tiktok
  const onPressedTiktok = () => {
    setWebviewMode(1);
    if(!lastSocialWebviweUrl.includes('tiktok.'))
      setSocialWebviewurl(TiktokUrl);
    // switching from SA
    if(webviewMode == 0) {
      setSocialWebviewurl(lastSocialWebviweUrl);
    }    
  }
  // twitter
  const onPressedTwitter = () => {
    setWebviewMode(1);
    if(!lastSocialWebviweUrl.includes('twitter.'))
      setSocialWebviewurl(Twitterurl);
    // switching from SA
    if(webviewMode == 0) {
      setSocialWebviewurl(lastSocialWebviweUrl);
    }

  }
  // forwards
  const onBackwardPressed = useCallback(() => {
    if(webviewMode == 0) {
      if(canGoBackMain) {
        console.log('main can go back')
        mainWebView.current.goBack();
      } else{        
        console.log('main can not go back');        
      }
    } else {
      if(canGoBackSocial) {
        socialWebView.current.goBack();
      } 
    }
  }, [webviewMode, mainWebView, socialWebView, canGoBackMain, canGoBackSocial]);
  // backwards
  const onForwardPressed = useCallback(() => {
    if(webviewMode == 0) {
      if(canGoForwardMain) {
        mainWebView.current.goForward();
      }
    } else {
      if(canGoForwardSocial) {
        socialWebView.current.goForward();
      }
    }
  }, [webviewMode, mainWebView, socialWebView, canGoForwardMain, canGoForwardSocial]);
  // main navigation state changed
  const onMainNavigationStateChange = (navState) => {
    if(!navState.url.includes('http') && !navState.url.includes('https')) {
      Linking.openURL(navState.url);
      mainWebView.current.stopLoading();
      return;
    }
    setCanGoBackMain(navState.canGoBack);
    setCanGoForwardMain(navState.canGoForward);
    if(navState.url != null)
      setLastMainWebviewUrl(navState.url);
    console.log('Main NavState', navState.url, navState.canGoBack, navState.canGoForward);
  }
  // social navigation state changed
  const onSocialNavigationStateChange = (navState) => {
    // open defulat browser
    if(!navState.url.includes('http') && !navState.url.includes('https')) {
      socialWebView.current.stopLoading();
      Linking.openURL(navState.url);      
      return;
    }
    // open defulat browser
    if(navState.url.includes('pinterest') && navState.url.includes('#imgViewer')) {
      socialWebView.current.stopLoading();
      Linking.openURL(navState.url);      
      return;
    }
    setCanGoBackSocial(navState.canGoBack);
    setCanGoForwardSocial(navState.url);
    if(navState.url != null)
      setLastSocialWebviewUrl(navState.url);
    console.log('Social NavState', navState.url, navState.canGoBack, navState.canGoForward);
  }

  // handle message from main webpage
  const onMainWebviewBridgeMessage = (event) => {
    const { data } = event.nativeEvent;    
    const jsonData = JSON.parse(data);
    console.log(jsonData);    
    if(jsonData.type == 'message') {
      Alert.alert('PocWeb', jsonData.value);
    } else if(jsonData.type == 'cookie'){   
      mainCookieRef.current.value = jsonData.value;
      //Alert.alert('Cookie from the webview', jsonData.value);
    }
  }

  // handle message from main webpage
  const onSocialWebviewBridgeMessage = (event) => {
    const { data } = event.nativeEvent;    
    const jsonData = JSON.parse(data);
    console.log(jsonData);    
    if(jsonData.type == 'message') {
      Alert.alert('PocWeb', jsonData.value);
    } else if(jsonData.type == 'cookie'){   
      socialCookieRef.current.value = jsonData.value;
      //Alert.alert('Cookie from the webview', jsonData.value);
    }
  }

  // get cookie for main webview
  const getMainWebviewCookie = () => {
    const javascriptCodeToSend = `
      window.ReactNativeWebView.postMessage(JSON.stringify({type: 'cookie', value: document.cookie}));
      true;
    `;
    mainWebView.current.injectJavaScript(javascriptCodeToSend);
  }

  // get cookie for social webview
  const getSocialWebviewCookie = () => {
    const javascriptCodeToSend = `
      window.ReactNativeWebView.postMessage(JSON.stringify({type: 'cookie', value: document.cookie}));
      true;
    `;
    socialWebView.current.injectJavaScript(javascriptCodeToSend);
  }
  // button handler to show cookie
  const onPressedShowCookie = () => {
    getMainWebviewCookie();
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
  return (
      <SafeAreaView style={styles.container}>
        <View
          style={styles.headerView}>
          <View
            style={styles.headerLeftView}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={onBackwardPressed}>
              <WithLocalSvg
                width={24}
                height={24}
                asset={BackArrow}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={onForwardPressed}>
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
              style={styles.headerButton}
              onPress={onPressedInstagram}>
              <WithLocalSvg
                width={24}
                height={24}
                asset={InstagramIcon}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={onPressedLinkedIn}>
              <WithLocalSvg
                width={24}
                height={24}
                asset={LinkedInIcon}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={onPressedPinterest}>
              <WithLocalSvg
                width={24}
                height={24}
                asset={PinterestIcon}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={onPressedTiktok}>
              <WithLocalSvg
                width={24}
                height={24}
                asset={TikTokIcon}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={onPressedTwitter}>
              <WithLocalSvg
                width={24}
                height={24}
                asset={TwitterIcon}/>
            </TouchableOpacity>
          </View>
        </View>
        {loading && <ActivityIndicator
            style={{
                flex: 1,
                width: '10%',
                height: '10%',
                position: 'absolute',
                top: SCREEN_HEIGHT / 2 - 100,
                zIndex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            animating={loading}
            size="large"            
        />}
        {
          webviewMode === 0 ?
          <View
            style={{flex: 1}}>
            <WebView
              ref={mainWebView}
              onLoad={() => getMainWebviewCookie()}
              onLoadEnd={() => setLoading(false)}
              onLoadStart={() => setLoading(true)}
              source={{
                uri: mainWebviewUrl,
              }}
              allowsInlineMediaPlayback="true"
              onMessage={onMainWebviewBridgeMessage}
              javaScriptEnabled={true}
              sharedCookiesEnabled={true} 
              thirdPartyCookiesEnabled={true}
              onNavigationStateChange={onMainNavigationStateChange}
            />
          </View> :
          <View
            style={{flex: 1}}>
            <WebView
              ref={socialWebView}
              onLoad={() => getSocialWebviewCookie()}
              onLoadEnd={() => setLoading(false)}
              onLoadStart={() => setLoading(true)}
              source={{
                uri: socialWebviewurl,
                // headers: {
                //   Cookie: 'user=john; password=123456',
                // },
              }}
              // userAgent={Platform.OS == 'ios' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1' :
              // 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36'}
              allowsInlineMediaPlayback="true"
              onMessage={onSocialWebviewBridgeMessage}
              javaScriptEnabled={true}
              sharedCookiesEnabled={true} 
              thirdPartyCookiesEnabled={true}
              onNavigationStateChange={onSocialNavigationStateChange}
            />
          </View>
        }

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