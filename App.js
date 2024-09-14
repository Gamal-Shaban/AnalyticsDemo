/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {AnalyticsProvider, createClient} from '@segment/analytics-react-native';
import {Provider} from 'react-redux';
import {Navigation} from './src/navigation';
import store from './src/redux/store';
export const segmentClient = createClient({
  writeKey: 'TgRJo3qCLYet9GdNXioJKCttUNoThkGM',
  trackAppLifecycleEvents: true,
  //additional config options
});

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <AnalyticsProvider client={segmentClient}>
      <Provider store={store}>
        <View style={styles.container}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={'large'} color={'black'} />
            </View>
          ) : (
            <Navigation />
          )}
        </View>
      </Provider>
    </AnalyticsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
