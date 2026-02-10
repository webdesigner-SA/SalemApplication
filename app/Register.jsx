import { Text, View, TouchableOpacity, Switch } from "react-native";
import { styles } from "../style/loginstyle";
import ThemedTextInput from "../components/ThemedTextInput";
import { useState } from "react";
import { Link, router } from "expo-router";
import { validateRegister } from "../style/Validation";

import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [remember, setRemember] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    const validationErrors = validateRegister(name, phone, username, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const email = `${username}@example.com`;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          name,
          phone,
          username,
          createdAt: new Date(),
        });

        router.replace("/(tabs)/home");
      } catch (error) {
        alert("خطأ: " + error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.container}>
        <Text style={styles.inputlog}>سجل الآن !!</Text>

        <View style={styles.containerCard}>
          <View style={styles.box}>
            <ThemedTextInput
              placeholder="الاسم"
              value={name}
              onChangeText={setName}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={styles.box}>
            <ThemedTextInput
              placeholder="رقم الجوال"
              value={phone}
              onChangeText={setPhone}
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          <View style={styles.box}>
            <ThemedTextInput
              placeholder="اسم المستخدم"
              value={username}
              onChangeText={setUsername}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
          </View>

          <View style={styles.box}>
            <ThemedTextInput
              placeholder="كلمة السر"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <View style={styles.rememberRow}>
            <Switch
              value={remember}
              onValueChange={setRemember}
              style={styles.rememberSwitch}
              trackColor={{ false: "#ccc", true: "#4B217F" }}
              thumbColor={remember ? "#fff" : "#f4f3f4"}
            />
            <Text style={styles.rememberText}>تذكرني</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>إنشاء حساب</Text>
          </TouchableOpacity>

          <Text style={{ textAlign: "center", fontSize: 16, color: "#00000080" }}>
            لديك حساب؟{" "}
            <Link href="/Login" style={styles.forget}>
              تسجيل الدخول
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}