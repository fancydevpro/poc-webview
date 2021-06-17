import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = ({ navigation, route }) => {

    const onPressedWebView = () => {
        navigation.navigate('Webview');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity        
                style={styles.buttonContainer}
                onPress={onPressedWebView}>
                <Text
                    style={styles.textView}>
                    Goto WebView
                </Text>
            </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

export default HomeScreen;