import { View, Text, Button } from 'react-native'
import { Link } from 'expo-router'

export default function Index() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>这里是登录页面</Text>
			<Link href="/details" style={{ marginTop: 40 }}>
				跳转到详情页
			</Link>
			<Link href="/example" style={{ marginTop: 40 }}>
				跳转到example
			</Link>
			<Link href="/details">
				<Button title="跳转到详情页（使用按钮）" />
			</Link>
		</View>
	)
}
