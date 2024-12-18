import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useId } from "@/context/IdContext";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Platform, Pressable, Button } from "react-native";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

// Function to get a document by docID
async function getDocumentByID(collectionName: string, docID: string) {
  try {
    const docRef = doc(db, collectionName, docID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
}

// Component to display the NewGroup page
function NewGroup() {
  const { id } = useId();
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const documentData = await getDocumentByID("groups", id);
          if (documentData) {
            setCode(documentData.code);
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      }
    };

    fetchData();
  }, [id]);

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
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{code ? code : "Lager kode..."}</ThemedText>
      </ThemedView>
      <Link href="/" style={styles.button}>
        tilbake
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

export default NewGroup;
