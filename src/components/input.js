import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

export const Input = ({password, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={password && !showPassword}
        style={styles.input}
        {...props}
      />
      {password && (
        <Text onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? 'hide' : 'show'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    color: 'black',
  },
});
