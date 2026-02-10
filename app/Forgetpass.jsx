import { useState } from "react";
import { validateForgetPassword } from "../style/Validation";
import { styles } from "../style/loginstyle";
import ThemedTextInput from "../components/ThemedTextInput";
import { View, Text, TouchableOpacity } from "react-native";

export default function Forgetpass() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChangePassword = () => {
    const validationErrors = validateForgetPassword(newPassword, confirmPassword);
    setErrors(validationErrors);
     if (Object.keys(validationErrors).length === 0) {
    // متابعة عملية التسجيل
    console.log("تم التسجيل بنجاح");
  }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Text style={styles.inputlog2}>تغيير كلمة السر</Text>

      <View style={styles.box}>
        <ThemedTextInput
          placeholder="كلمة السر الجديدة"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        {errors.newPassword && (
          <Text style={styles.errorText}>{errors.newPassword}</Text>
        )}
      </View>

      <View style={styles.box}>
        <ThemedTextInput
          placeholder="تأكيد كلمة السر"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>تغيير كلمة السر</Text>
      </TouchableOpacity>
    </View>
  );
}