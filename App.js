/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect } from 'react';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 
 import RootNavigator from './src/RootNavigator';
 
 const App = () => {
   return (
     <>      
       <SafeAreaProvider>
          <RootNavigator/>
       </SafeAreaProvider>        
     </>
   );
 };
 
 export default App;
 
 