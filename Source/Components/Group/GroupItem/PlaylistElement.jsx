import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Avatar, Icon, Button, Modal, useTheme } from '@ui-kitten/components';
import { ImageBackground, View } from 'react-native';

const PlaylistElement = memo(
	({
		playlist: { _id, name, creator, public: isPublic, musics },
		moreAccessories,
		onPress,
		highlighted,
		index,
	}) => {
		const [modalVisible, setModalVisible] = React.useState(false);
		const theme = useTheme();
		const image_url = musics[0]?.image_url;

		function PlaylistImage() {
			return (
				<Avatar
					ImageComponent={ImageBackground}
					shape="rounded"
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
					title={name}
					description={creator.username}
					onPress={() => onPress({ _id, name, creator, image_url }, index)}
					accessoryLeft={() => <PlaylistImage />}
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
						title={name}
						description={creator.username}
						accessoryLeft={() => <PlaylistImage />}
					/>
					{moreAccessories.map((Accessory, i) => (
						<Accessory
							playlist={{
								_id,
								name,
								creator,
								isPublic,
								musics,
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

PlaylistElement.propTypes = {
	playlist: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		creator: PropTypes.string.isRequired,
		public: PropTypes.bool.isRequired,
		musics: PropTypes.arrayOf(
			PropTypes.shape({
				_id: PropTypes.number.isRequired,
				title: PropTypes.string.isRequired,
				artist_name: PropTypes.string.isRequired,
				image_url: PropTypes.string,
			})
		).isRequired,
	}).isRequired,
	moreAccessories: PropTypes.arrayOf(PropTypes.func),
	onPress: PropTypes.func.isRequired,
	highlighted: PropTypes.bool,
	index: PropTypes.number.isRequired,
};

PlaylistElement.defaultProps = {
	moreAccessories: [],
	highlighted: false,
};

export default PlaylistElement;
