import React, { useRef } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import ImageViewer from '@/components/base/ImageViewer'
import Button from '@/components/base/Button'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import IconButton from '@/components/base/IconButton'
import CircleButton from '@/components/base/CircleButton'
import EmojiPicker from '@/components/base/EmojiPicker'
import EmojiList from '@/components/base/EmojiList'
import EmojiSticker from '@/components/base/EmojiSticker'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot'
import domtoimage from 'dom-to-image'

const PlaceholderImage = require('@/assets/images/background-image.png')

export default function Index() {
	const imageRef = useRef<any>()

	const [status, requestPermission] = MediaLibrary.usePermissions()

	const [selectedImage, setSelectedImage] = useState<string | null>(null)
	const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [pickedEmoji, setPickedEmoji] = useState(null)

	if (status === null) {
		requestPermission()
	}

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		})

		if (!result.canceled) {
			console.log(result)
			setSelectedImage(result.assets[0].uri)
			setShowAppOptions(true)
		} else {
			alert('You did not select any image.')
		}
	}

	const onReset = () => {
		setShowAppOptions(false)
	}

	const onAddSticker = () => {
		setIsModalVisible(true)
	}

	const onModalClose = () => {
		setIsModalVisible(false)
	}

	const onSaveImageAsync = async () => {
		if (Platform.OS !== 'web') {
			try {
				const localUri = await captureRef(imageRef, {
					height: 440,
					quality: 1,
				})
				await MediaLibrary.saveToLibraryAsync(localUri)
				if (localUri) {
					alert('Saved!')
				}
			} catch (e) {
				console.log(e)
			}
		} else {
			try {
				const dataUrl = await domtoimage.toJpeg(imageRef.current, {
					quality: 0.95,
					width: 320,
					height: 440,
				})

				let link = document.createElement('a')
				link.download = 'sticker-smash.jpeg'
				link.href = dataUrl
				link.click()
			} catch (e) {
				console.log(e)
			}
		}
	}

	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.imageContainer}>
				<View ref={imageRef} collapsable={false}>
					<ImageViewer
						selectedImage={selectedImage!}
						placeholderImageSource={PlaceholderImage}
					/>
					{pickedEmoji && (
						<EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
					)}
				</View>
			</View>
			<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
				<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
			</EmojiPicker>

			{showAppOptions ? (
				<View style={styles.optionsContainer}>
					<View style={styles.optionsRow}>
						<IconButton icon="refresh" label="Reset" onPress={onReset} />
						<CircleButton onPress={onAddSticker} />
						<IconButton
							icon="save-alt"
							label="Save"
							onPress={onSaveImageAsync}
						/>
					</View>
				</View>
			) : (
				<View style={styles.footerContainer}>
					<Button theme="primary" onPress={pickImageAsync}>
						Choose a photo
					</Button>
					<Button onPress={() => setShowAppOptions(true)}>
						Use this photo
					</Button>
				</View>
			)}
			<StatusBar style="auto" />
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
	},
	imageContainer: {
		flex: 1,
		paddingTop: 58,
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: 'center',
	},
	optionsContainer: {
		position: 'absolute',
		bottom: 80,
	},
	optionsRow: {
		alignItems: 'center',
		flexDirection: 'row',
	},
})
