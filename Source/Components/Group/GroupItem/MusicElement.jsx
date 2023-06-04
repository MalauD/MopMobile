import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Avatar, Icon, Button, Modal, useTheme } from '@ui-kitten/components';
import { ImageBackground, View } from 'react-native';
import LikeMusicButton from '../Extras/LikeMusicButton';

const MusicElement = memo(
	({
		music: { _id, title, artist_name, image_url },
		moreAccessories,
		onPress,
		highlighted,
		index,
	}) => {
		const [modalVisible, setModalVisible] = React.useState(false);
		const theme = useTheme();

		function MusicImage() {
			return (
				<Avatar
					ImageComponent={ImageBackground}
					shape="square"
					source={image_url ? { uri: image_url } : require('../../../Assets/nomusic.jpg')}
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
						description={artist_name}
						accessoryLeft={() => <MusicImage />}
						accessoryRight={() => <LikeMusicButton />}
					/>
					{moreAccessories.map((Accessory, i) => (
						<Accessory
							music={{
								_id,
								title,
								artist_name,
								image_url,
							}}
							hideModal={() => setModalVisible(false)}
							key={i}
						/>
					))}
				</Modal>
			</>
		);
	}
);

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

export default MusicElement;
