import { StyleSheet, View, Pressable, Text, ViewProps } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

interface TProps extends ViewProps {
	theme?: 'primary'
	onPress?: () => void
	iconName?: string
}

export default function Button({
	children,
	theme,
	iconName,
	onPress,
	...args
}: TProps) {
	if (theme === 'primary') {
		return (
			<View
				style={[
					styles.buttonContainer,
					{ borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
				]}
				{...args}
			>
				<Pressable
					style={[styles.button, { backgroundColor: '#fff' }]}
					onPress={onPress}
				>
					{iconName && (
						<FontAwesome
							name={iconName as any}
							size={18}
							color="#25292e"
							style={styles.buttonIcon}
						/>
					)}
					<Text style={[styles.buttonLabel, { color: '#25292e' }]}>
						{children}
					</Text>
				</Pressable>
			</View>
		)
	}

	return (
		<View style={styles.buttonContainer} {...args}>
			<Pressable style={styles.button} onPress={onPress}>
				<Text style={styles.buttonLabel}>{children}</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: 320,
		height: 68,
		marginHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 3,
	},
	button: {
		borderRadius: 10,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	buttonIcon: {
		paddingRight: 8,
	},
	buttonLabel: {
		color: '#fff',
		fontSize: 16,
	},
})
