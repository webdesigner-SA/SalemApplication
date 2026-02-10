import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../style/loginstyle";
import ThemedTextInput from "../components/ThemedTextInput";
import { useState, useRef } from "react";
import { Link, useRouter } from "expo-router";
import { validateOTP } from "../style/Validation";
import { Ionicons } from "@expo/vector-icons";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth, firebaseConfig } from "../firebase/firebase";
import { signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";

export default function Phone() {
  const [phone, setPhone] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [code, setCode] = useState("");
  const [otpErrors, setOtpErrors] = useState({});
  const [verificationId, setVerificationId] = useState(null);

  const recaptchaVerifier = useRef(null);
  const router = useRouter();

  // إرسال SMS
  const handleRegister = async () => {
    try {
      
      const phoneNumber = "+966" + phone.slice(1);

      const verification = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier.current
      );

      setVerificationId(verification.verificationId);
      setShowPopup(true);
    } catch (error) {
      console.log(error);
      alert("تعذر إرسال الرمز. تأكد من صحة الرقم.");
    }
  };

  // التحقق من الرمز
  const handleOTPConfirm = async () => {
    const validationErrors = validateOTP(code);
    setOtpErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const credential = PhoneAuthProvider.credential(verificationId, code);
        await signInWithCredential(auth, credential);

        router.push("/Forgetpass");
      } catch (error) {
        console.log(error);
        setOtpErrors({ code: "الرمز غير صحيح" });
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

      {/* reCAPTCHA (يظهر فقط داخل Expo Go) */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      {/* Back Arrow */}
      <TouchableOpacity
        onPress={() => router.push("/Login")}
        style={styles.backArrow}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.containerCard}>

          <Text style={styles.inputlog2}>أدخل رقم الجوال لتعيين كلمة السر</Text>
          <Text style={[styles.inputlog2, { textAlign: "center", marginTop: 8 }]}>
            الجديدة
          </Text>

          <View style={styles.box}>
            <ThemedTextInput
              placeholder="رقم الجوال"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>إرسال الرمز</Text>
          </TouchableOpacity>

          <Text style={{ textAlign: "center", fontSize: 16, color: "#00000080" }}>
            اعادة ارسال الرمز؟{" "}
            <Link href="/Phone" style={styles.forget}>
              خلال 60 ثانية
            </Link>
          </Text>

          {/* Popup */}
          {showPopup && (
            <View style={popupStyles.overlay}>
              <View style={popupStyles.popup}>
                <Text style={popupStyles.title}>أدخل رمز التحقق</Text>

                <TextInput
                  style={popupStyles.codeInput}
                  placeholder="••••••"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={code}
                  onChangeText={setCode}
                />

                {otpErrors.code && (
                  <Text style={{ color: "red", marginBottom: 10 }}>
                    {otpErrors.code}
                  </Text>
                )}

                <TouchableOpacity
                  style={popupStyles.confirmBtn}
                  onPress={handleOTPConfirm}
                >
                  <Text style={popupStyles.confirmText}>تأكيد</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowPopup(false)}>
                  <Text style={popupStyles.closeText}>إغلاق</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

        </View>
      </View>
    </View>
  );
}

const popupStyles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4B217F",
  },
  codeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "60%",
    textAlign: "center",
    fontSize: 24,
    paddingVertical: 10,
    marginBottom: 10,
  },
  confirmBtn: {
    backgroundColor: "#4B217F",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  confirmText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeText: {
    color: "#4B217F",
    fontSize: 16,
    marginTop: 10,
  },
});