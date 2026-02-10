import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../style/loginstyle";
import ThemedTextInput from "../components/ThemedTextInput";
import { Link } from "expo-router";
import { useState } from "react";
import { validateLogin } from "../style/Validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { router } from "expo-router";


export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    const validationErrors = validateLogin(username, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // البيانات تنحفظ في الداتا بيس كايميل ورمز سري لذلك نستخدم اسم المستخدم مع @example.com لتوليد إيميل وهمي
        const email = `${username}@example.com`;

      await signInWithEmailAndPassword(auth, email, password);


        // نجاح تسجيل الدخول → الانتقال مباشرة
  router.replace("/(tabs)/home");

      } catch (error) {
        // فقط الخطأ يظهر
        alert("خطأ: " + error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.container}>

        <Text style={styles.inputlog}>تسجيل الدخول</Text>

        <View style={styles.containerCardLogin}>

          <View style={styles.box}>
            <ThemedTextInput
              placeholder="اسم المستخدم"
              value={username}
              onChangeText={setUsername}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          </View>

          <View style={styles.box}>
            <ThemedTextInput
              placeholder="كلمة السر"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <Text style={styles.forget}>
            <Link href="/Phone">نسيت كلمة السر؟</Link>
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>تسجيل الدخول</Text>
          </TouchableOpacity>

          <Text style={{ textAlign: "center", fontSize: 16, color: "#00000080" }}>
            ليس لديك حساب؟{" "}
            <Link href="/Register" style={styles.forget}>
              سجل الآن
            </Link>
          </Text>

        </View>
      </View>
    </View>
  );
}