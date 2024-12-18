import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useId } from "@/context/IdContext";
import { Link, Redirect, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";

async function getGroupByCode(Code: number) {
  const q = query(
    collection(db, "groups"),
    where("code", "==", Code),
    where("started", "==", true)
  );

  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0];
      console.log(firstDoc.data());
      return firstDoc;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching group data:", error);
    return null;
  }
}

function JoinGroup() {
  const [inputCode, setInputCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const JoinGame = async () => {
    const code = parseInt(inputCode, 10);
    if (!isNaN(code)) {
      const groupExists = await getGroupByCode(code);

      if (groupExists) {
        setErrorMessage("");
        console.log("Valid code");
        router.replace(`/(tabs)/games/${code}`);
      } else {
        setErrorMessage("No game found with that code.");
      }
    } else {
      setErrorMessage("Invalid code. Please enter a numeric value.");
    }
  };

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
      <TextInput
        style={styles.input}
        placeholder="Enter game code"
        keyboardType="numeric"
        value={inputCode}
        onChangeText={setInputCode}
      />
      <Pressable onPress={JoinGame} style={styles.button}>
        <ThemedText style={styles.buttonText}>Join Game</ThemedText>
      </Pressable>
      <Link href="/" style={styles.link}>
        <ThemedText>Back</ThemedText>
      </Link>
      {errorMessage ? (
        <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
      ) : null}
    </ParallaxScrollView>
  );
}

export default JoinGroup;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  button: {
    backgroundColor: "#007bff", // Blue background for the button
    borderRadius: 8, // Rounded corners
    padding: 10,
    marginVertical: 12,
    alignItems: "center", // Center text in button
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  link: {
    marginVertical: 10,
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});
