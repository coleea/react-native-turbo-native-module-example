// import {
//   Camera,
//   useCameraDevice,
//   useCameraDevices,
// } from 'react-native-vision-camera';
// import React, {useCallback, useEffect, useRef, useState} from 'react';
// import {Button, StyleSheet, Text, View, PermissionsAndroid, Alert} from 'react-native';

// export default function CameraScreen() {
//   const device = useCameraDevice('back');

//   useEffect(() => {
// 	(async () => {
// 		const permissionGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
// 			title: '<your title here>',
// 			message:
// 			  '<your message here>',
// 			buttonNegative: 'Deny',
// 			buttonPositive: 'Allow',
// 		  });

// 		        // then access permission status
// 				if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
// 					// permissons have been accepted - update a useState() here or whatever your usecase is :)
// 					Alert.alert('Permission granted');
// 				  } else {
// 					Alert.alert('Permission denied');


// 				  }
			
// 	})() ;     
//   }, []);
//   if (device == null) return <View>no camera</View>;
//   return (
//     <View>
//       <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
//     </View>
//   );
// }
