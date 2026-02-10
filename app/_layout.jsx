import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#FFFFFF",
        headerStyle: {
          backgroundColor: "#4B217F",
        },
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false, // إخفاء الهيدر العام فوق التابات
        }}
      />

      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // إخفاء الهيدر العام فوق التابات
        }}
      />

      <Stack.Screen
        name="Login"
        options={{
        headerTitle: "", // This hides the text in the header
        headerShown: false,
        }}
      />

      <Stack.Screen
        name="Register"
        options={{
        headerTitle: "", // This hides the text in the header
        headerShown: false,
        }}
      />

      <Stack.Screen
        name="Phone"
        options={{
        headerTitle: "", // This hides the text in the header
        headerShown: false,
        }}
      />

    </Stack>
  );
}