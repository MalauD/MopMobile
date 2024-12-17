import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Icon, Button, Modal } from '@ui-kitten/components';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

function ArtistElement({ artist: { _id, name, picture }, moreAccessories, onPress, index }) {
	const [modalVisible, setModalVisible] = React.useState(false);

	function ArtistImage() {
		return (
			<FastImage
				style={{ width: 40, height: 40, borderRadius: 20 }}
				source={picture ? { uri: picture } : require('../../../Assets/defaultavatar.jpg')}
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
				onPress={() => onPress({ _id, name, picture }, index)}
				accessoryLeft={() => <ArtistImage />}
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
				<ListItem title={name} accessoryLeft={() => <ArtistImage />} />
				{moreAccessories.map((Accessory, i) => (
					<Accessory
						artist={{
							_id,
							name,
							picture,
						}}
						hideModal={() => setModalVisible(false)}
						key={i}
					/>
				))}
			</Modal>
		</>
	);
}

ArtistElement.propTypes = {
	artist: PropTypes.shape({
		_id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		picture: PropTypes.string,
	}).isRequired,
	moreAccessories: PropTypes.arrayOf(PropTypes.func),
	onPress: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};

ArtistElement.defaultProps = {
	moreAccessories: [],
};

const ArtistElementMemo = memo(ArtistElement);

export default ArtistElementMemo;
