import { Image, StyleSheet, Platform, Pressable } from "react-native";
import { addDoc, collection } from "firebase/firestore";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Button from "@/components/Button";
import { db } from "@/firebaseConfig";
import { Link } from "expo-router";
import { createContext, useContext } from "react";
import { useId } from "@/context/IdContext";

export default function HomeScreen() {
  const { id, setId } = useId();

  async function addGroup() {
    try {
      const docRef = await addDoc(collection(db, "groups"), {
        code: Math.floor(1000 + Math.random() * 9000),
        started: true,
      });
      setId(docRef.id);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hei!</ThemedText>
        <HelloWave />
      </ThemedView>
      <Link href="/NewGroup" onPress={addGroup} style={styles.button}>
        Lag ny gruppe
      </Link>
      <Link href="/JoinGroup" style={styles.button}>
        Bli med i gruppe
      </Link>
      <Link href="/Login" style={styles.button}>
        login
      </Link>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  button: {
    fontSize: 20,
    color: "#fff",
    backgroundColor: "#007bff", // Blue background for the button
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 8, // Rounded corners
    textAlign: "center", // Center text
    textDecorationLine: "none", // Remove underline
  },
});
