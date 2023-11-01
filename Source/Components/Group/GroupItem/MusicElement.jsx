import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Icon, Button, Modal, useTheme } from '@ui-kitten/components';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LikeMusicButton from '../Extras/LikeMusicButton';

function MusicElement({
	music: { _id, title, artist_name, image_url },
	moreAccessories,
	onPress,
	highlighted,
	index,
}) {
	const [modalVisible, setModalVisible] = React.useState(false);
	const theme = useTheme();

	function MusicImage() {
		return (
			<FastImage
				style={{ width: 40, height: 40 }}
				source={{
					uri: image_url,
				}}
				resizeMode={FastImage.resizeMode.contain}
			/>
		);
	}

	function MoreButton() {
		return (
			<Button
				appearance="ghost"
				status="basic"
				style={{ paddingHorizontal: 0, paddingVertical: 0 }}
				onPress={() => setModalVisible(true)}
				accessoryLeft={(evaProps) => <Icon {...evaProps} name="more-horizontal" />}
			/>
		);
	}

	return (
		<>
			<ListItem
				style={{
					paddingTop: 6,
					paddingBottom: 6,
					backgroundColor: 'transparent',
					borderColor: highlighted ? theme['color-basic-transparent-focus'] : null,
					borderWidth: highlighted ? 1 : null,
				}}
				title={title}
				description={artist_name}
				onPress={() => onPress({ _id, title, artist_name, image_url }, index)}
				accessoryLeft={() => <MusicImage />}
				accessoryRight={() => <MoreButton />}
			/>
			<Modal
				visible={modalVisible}
				backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
				onBackdropPress={() => setModalVisible(false)}
				shouldUseContainer={false}
				style={{ flexDirection: 'column', justifyContent: 'flex-end' }}
			>
				<View style={{ flex: 1 }} />
				<ListItem
					title={title}
					style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
					description={artist_name}
					accessoryLeft={() => <MusicImage />}
					accessoryRight={() => <LikeMusicButton music={{ _id }} />}
				/>
				{moreAccessories.map((Accessory, i) => (
					<Accessory
						music={{
							_id,
							title,
							artist_name,
							image_url,
						}}
						musicIndex={index}
						hideModal={() => setModalVisible(false)}
						key={i}
					/>
				))}
			</Modal>
		</>
	);
}

MusicElement.propTypes = {
	music: PropTypes.shape({
		_id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		artist_name: PropTypes.string.isRequired,
		image_url: PropTypes.string,
	}).isRequired,
	moreAccessories: PropTypes.arrayOf(PropTypes.func),
	highlighted: PropTypes.bool,
	onPress: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};

MusicElement.defaultProps = {
	moreAccessories: [],
	highlighted: false,
};

const MusicElementMemo = memo(MusicElement);

export default MusicElementMemo;
