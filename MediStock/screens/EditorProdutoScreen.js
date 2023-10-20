import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Camera } from "expo-camera";

const EditorProdutoScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      console.log("Photo taken:", uri);
      setPhoto(uri);
      setCameraVisible(false);
    }
  };


  return (
    <View style={styles.container}>
      <Text>Editor de Produto Screen</Text>
      <TouchableOpacity onPress={() => setCameraVisible(true)} style={styles.cameraButton}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.profileImage} />
        ) : (
          <View style={styles.iconContainer}>
            <Text>
              <Icon name="camera" size={50} color="white" />
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={cameraVisible}
          onRequestClose={() => setCameraVisible(false)}
        >
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ratio="16:9"
          >
            <TouchableOpacity
              style={styles.captureButton}
              onPress={() => handleCapture()}
            >
              <View style={styles.captureButtonInner}>
                <View style={styles.captureButtonCircle}>
                  <View style={styles.captureButtonCenter} />
                </View>
              </View>
            </TouchableOpacity>
          </Camera>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 50,
    marginTop: 20,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  captureButton: {
    alignSelf: "center",
    marginBottom: 20,
  },
  captureButtonInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonCenter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "gray",
  },
});

export default EditorProdutoScreen;