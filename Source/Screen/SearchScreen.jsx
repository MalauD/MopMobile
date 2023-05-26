import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Layout, TabView, Tab } from '@ui-kitten/components';
import { TopBar } from '../Navigator/TopBar';
import { CONTEXT_SEARCH } from '../Components/Group/Extras/Constants';
import { SearchMusic, SearchAlbum, SearchArtist } from '../Api/Music/Search';

import MusicGroup from '../Components/Group/MusicGroup';
import AlbumGroup from '../Components/Group/AlbumGroup';
import ArtistGroup from '../Components/Group/ArtistGroup';

const SearchIcon = (props) => <Icon {...props} name="search" />;

export class SearchScreen extends React.Component {
	static propTypes = {
		navigation: PropTypes.shape({}).isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			SearchValue: '',
			MusicIds: undefined,
			AlbumIds: undefined,
			ArtistIds: undefined,

			IsFetchingMusics: false,
			IsFetchingAlbums: false,
			IsFetchingArtists: false,

			selectedIndex: 0,
		};
	}

	SetSearchValue = (value) => {
		this.setState({
			SearchValue: value,
		});
	};

	OnSearchSubmit = () => {
		const { SearchValue } = this.state;

		this.setState({
			MusicIds: undefined,
			AlbumIds: undefined,
			ArtistIds: undefined,
			IsFetchingMusics: true,
			IsFetchingAlbums: true,
			IsFetchingArtists: true,
		});

		SearchMusic(SearchValue)
			.then((MusicIds) => {
				this.setState({ MusicIds, IsFetchingMusics: false });
			})
			.catch();
		SearchAlbum(SearchValue)
			.then((AlbumIds) => {
				this.setState({ AlbumIds, IsFetchingAlbums: false });
			})
			.catch();
		SearchArtist(SearchValue)
			.then((ArtistIds) => {
				this.setState({ ArtistIds, IsFetchingArtists: false });
			})
			.catch();
	};

	render() {
		const {
			MusicIds,
			AlbumIds,
			ArtistIds,
			IsFetchingMusics,
			IsFetchingAlbums,
			IsFetchingArtists,
			SearchValue,
			selectedIndex,
		} = this.state;
		const { navigation } = this.props;

		return (
			<>
				<TopBar subtitle="Search" />

				<Layout style={{ height: '100%' }} level="1">
					<Input
						value={SearchValue}
						style={{ padding: '2%' }}
						placeholder="Search for musics"
						accessoryLeft={SearchIcon}
						onChangeText={this.SetSearchValue}
						onSubmitEditing={this.OnSearchSubmit}
						returnKeyType="search"
					/>
					<Layout level="2" style={{ height: '100%' }}>
						<TabView
							selectedIndex={selectedIndex}
							onSelect={(index) => this.setState({ selectedIndex: index })}
						>
							<Tab title="Musics">
								{/* <MusicGroup
									DetailType="Musics"
									ContextType={CONTEXT_SEARCH}
									MusicIds={MusicIds}
									IsFetching={IsFetchingMusics}
								/> */}
							</Tab>
							<Tab title="Albums">
								<AlbumGroup
									DetailType="Albums"
									AlbumIds={AlbumIds}
									IsFetching={IsFetchingAlbums}
									navigation={navigation}
								/>
							</Tab>
							<Tab title="Artists">
								<ArtistGroup
									DetailType="Artists"
									ArtistIds={ArtistIds}
									IsFetching={IsFetchingArtists}
									navigation={navigation}
								/>
							</Tab>
						</TabView>
					</Layout>
				</Layout>
			</>
		);
	}
}
