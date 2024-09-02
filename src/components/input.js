import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

export const Input = ({password}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={password && !showPassword}
        style={styles.input}
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
    height: 45,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.07)',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    color: 'black',
  },
});
