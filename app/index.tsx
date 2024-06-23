import { View } from 'react-native'
import Button from '@/components/base/Button'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

export default function Index() {
	return (
		<View
			className=" w-screen h-screen bg-[#25292e]"
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			<Button
				theme="primary"
				iconName="picture-o"
				onPress={() => {
					router.push('/drawer')
				}}
			>
				Start Vlog
			</Button>
			<Button
				className="mt-4"
				theme="primary"
				iconName="angellist"
				onPress={() => {
					console.log('GGGG')
					Toast.show({
						type: 'info',
						text1: 'This is an info message',
					})
					// let toast = Toast.show('Request failed to send.', {
					// 	duration: Toast.durations.LONG,
					// })
					// // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
					// setTimeout(function hideToast() {
					// 	Toast.hide(toast)
					// }, 500)
					// alert('Coming soon!')
				}}
			>
				Exciting Moments~~
			</Button>
			{/* <Toast visible={true}>Thanks for subscribing!</Toast> */}
		</View>
	)
}
