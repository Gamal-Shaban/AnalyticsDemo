import {createClient} from '@segment/analytics-react-native';
import {mixpanel} from '../..';

const segmentClient = createClient({
  writeKey: 'TgRJo3qCLYet9GdNXioJKCttUNoThkGM',
  trackAppLifecycleEvents: true,
  //additional config options
});

export const trackEvent = (eventName, eventProperties = {}) => {
  try {
    // Use Mixpanel's track method to create and send the event
    mixpanel.track(eventName, eventProperties);
    segmentClient.track(eventName, eventProperties);
    console.log(
      `Event: ${eventName} tracked with properties:`,
      eventProperties,
    );
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
