import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
	ListItem, Avatar, Icon, Button, Modal, ButtonGroup,
} from '@ui-kitten/components';
import { ImageBackground, View } from 'react-native';
import { LikeMusic } from '../../../../../MopRs/static/Js/Actions/Action';
import { LikeMusicButton } from '../Extras/LikeMusicButton';

const MusicElement = memo(function MusicElement({
	music: {
		_id, title, artist_name, image_url,
	},
	moreAccessories,
}) {
	const [modalVisible, setModalVisible] = React.useState(false);

	const MusicImage = () => (
		<Avatar
			ImageComponent={ImageBackground}
			shape="square"
			source={image_url ? { uri: image_url } : require('../../../Assets/nomusic.jpg')}
		/>
	);

	const MoreButton = (props) => (
		<Button
			appearance="ghost"
			status='basic'
			style={{ paddingHorizontal: 0, paddingVertical: 0 }}
			onPress={() => setModalVisible(true)}
			accessoryLeft={(evaProps) => <Icon {...evaProps} name="more-horizontal" />}
		/>
	);

	return (
		<>
			<ListItem
				style={{ backgroundColor: 'transparent', paddingTop: 12, paddingBottom: 0 }}
				level="2"
				title={title}
				description={artist_name}
				accessoryLeft={MusicImage}
				accessoryRight={moreAccessories.length > 0 ? MoreButton : undefined}
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
					accessoryLeft={MusicImage}
					accessoryRight={() => <LikeMusicButton />}
				/>
				{moreAccessories.map((Accessory) => <Accessory music={{
					_id, title, artist_name, image_url,
				}} />)}

			</Modal>
		</>
	);
});

MusicElement.propTypes = {
	music: PropTypes.shape({
		_id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		artist_name: PropTypes.string.isRequired,
		image_url: PropTypes.string,
	}).isRequired,
	moreAccessories: PropTypes.arrayOf(PropTypes.element),
};

MusicElement.defaultProps = {
	moreAccessories: [],
};

export default MusicElement;