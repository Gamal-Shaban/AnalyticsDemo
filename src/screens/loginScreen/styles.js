import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 25,
  },
  logo: {
    height: 120,
    width: 120,
    marginTop: 100,
    marginBottom: 40,
  },
  loginButton: {
    height: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    marginTop: 30,
  },
  loginText: {
    fontSize: 20,
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
});
