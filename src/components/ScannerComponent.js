import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ScannerComponent({ navigation }) {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [state, setState] = useState({});
	// const [scanned, setScan] = useState(false);
	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const route = (info) => {
		console.log(info, 'route');
		navigation.navigate('Profile', { ...info });
	};
	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		const info = JSON.parse(data);
		// setState(info);
		route(info);

		// alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};
	// console.log(state, 'scanner component');
	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.parentContainer}>
			<View style={styles.container}>
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>

				{/* {scanned && (
					<TouchableOpacity
						onPress={() => setScanned(false)}
						style={styles.btnnContainer}
					>
						<Text style={styles.btnnTxt}>Tap to Scan Again</Text>
					</TouchableOpacity>
				)} */}
			</View>

			<View style={styles.bottom}>
				<View style={styles.bottomContainer}>
					<Text style={styles.noticeText}>Want to share your contact?</Text>
					<TouchableOpacity
						style={styles.btnContainer}
						onPress={() => {
							navigation.navigate('Scanner');
						}}
					>
						<Text style={styles.btnText}>Scan QR</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	parentContainer: {
		flex: 1,
		backgroundColor: 'white',
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		// backgroundColor: 'yellow',
	},
	bottom: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 70,
		justifyContent: 'center',
	},
	bottomContainer: {
		marginHorizontal: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	btnContainer: {
		borderColor: 'red',
		borderWidth: 1,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 4,
	},
	btnText: {
		color: 'red',
		fontSize: 15,
	},
	noticeText: {
		fontSize: 15,
	},
	btnnContainer: {
		backgroundColor: 'red',
		position: 'absolute',
		bottom: 70,
		left: 0,
		right: 0,
		height: 40,
	},
	btnnTxt: {
		color: 'white',
		flex: 1,
		alignSelf: 'center',
		marginTop: 7,
		fontSize: 16,
	},
});
