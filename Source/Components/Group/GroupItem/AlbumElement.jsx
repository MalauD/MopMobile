import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Icon, Button, Modal } from '@ui-kitten/components';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

function AlbumElement({ album: { _id, name, cover }, moreAccessories, onPress, index }) {
	const [modalVisible, setModalVisible] = React.useState(false);

	function AlbumImage() {
		return (
			<FastImage
				style={{ width: 40, height: 40, borderRadius: 10 }}
				source={cover ? { uri: cover } : require('../../../Assets/nomusic.jpg')}
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
				}}
				title={name}
				onPress={() => onPress({ _id, name, cover }, index)}
				accessoryLeft={() => <AlbumImage />}
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
				<ListItem title={name} accessoryLeft={() => <AlbumImage />} />
				{moreAccessories.map((Accessory, i) => (
					<Accessory
						album={{
							_id,
							name,
							cover,
						}}
						hideModal={() => setModalVisible(false)}
						key={i}
					/>
				))}
			</Modal>
		</>
	);
}

AlbumElement.propTypes = {
	album: PropTypes.shape({
		_id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		cover: PropTypes.string,
	}).isRequired,
	moreAccessories: PropTypes.arrayOf(PropTypes.func),
	onPress: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};

AlbumElement.defaultProps = {
	moreAccessories: [],
};

const AlbumElementMemo = memo(AlbumElement);

export default AlbumElementMemo;
