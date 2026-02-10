import { TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";

export default function ThemedTextInput({ style, ...props }) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ width: "100%" }}>
      <TextInput
        {...props}
        style={[
          styles.input,
          style,
          focused && {
            borderColor: "#4B217F",
            borderWidth: 1.5,
            shadowColor: "#4B217F",
            shadowOpacity: 0.12,
            shadowRadius: 4,
            elevation: 2,
          }
        ]}
        placeholderTextColor="#00000080"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        textAlign="right"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    height: 54,
    borderRadius: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    backgroundColor: "#rgba(78, 4, 109, 0.1)",
    borderWidth: 1,
    borderColor: "#E0CCE9",
  },
});