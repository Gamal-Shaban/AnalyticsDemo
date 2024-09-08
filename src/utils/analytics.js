import {mixpanel} from '../..';

export const trackEvent = (eventName, eventProperties = {}) => {
  try {
    // Use Mixpanel's track method to create and send the event
    mixpanel.track(eventName, eventProperties);
    console.log(
      `Event: ${eventName} tracked with properties:`,
      eventProperties,
    );
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
