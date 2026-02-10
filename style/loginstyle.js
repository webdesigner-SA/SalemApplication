import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // نص تسجيل الدخول  
  inputlog: {
        fontSize: 24,
        //fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        position: 'absolute',
        top: 80,
        left: 0,
        right: 0,
        zIndex: 1,
  },

      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4B217F',
    },

    containerCard: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 24,
        paddingTop: 40,
        marginTop: 135,
        borderTopLeftRadius: 150,
        backgroundColor: '#fff',
    },

    containerCardLogin: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 24,
        paddingTop: 150,
        marginTop: 135,
        borderTopLeftRadius: 150,
        backgroundColor: '#fff',
    },    

    inputlog2: {
        marginTop:155,
        marginLeft: 30,
        color: '#CE3756',
        justifyContent: "center",
        alignItems: "center",
        fontSize:23,
      // fontWeight: "bold",
      },

      //  حقول الادخال
      box: {
      marginTop: 25,
      width: "100%",
      paddingHorizontal: 25,
    },

      // نص نسيت كلمة المرور
      forget: {
        marginLeft: 200, 
        marginTop: 25, 
        color: '#CE3756',
        fontSize:16,
      },

      // زر تذكرني
      rememberRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        width:'90',
        marginBottom: 5,
        marginTop: 20,
        marginLeft: 240,
      },

      rememberText: {
        marginRight: 5,
        fontSize: 20,
        color: '#00000080',
        marginLeft: 12,
      },

      rememberSwitch: {
      transform: [{ scale: 0.9 }],
      marginRight: 10, 
    },

    // زر انشاء حساب (تسجيل الدخول) 
    button: {
      backgroundColor: "#4B217F",
      marginTop:40,
      marginLeft:30,
      width:'285',
      height: '56',
      borderRadius: 20,
      alignItems: "center",
      marginBottom: 15,
    },

    buttonText: {
      color: "#fff",
      fontSize: 20,
      alignItems: "center",
      marginTop: 12,

    },
      // نص الخطأ
    errorText: {
      color: "red",
      textAlign: "right",
      fontSize: 12,
      marginTop: 4,
    },

    backArrow: {
      position: "absolute",
      top: 70,
      left: 20,
      zIndex: 10,
    }
});