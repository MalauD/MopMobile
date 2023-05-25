import React from 'react';
import { ListItem, Icon } from '@ui-kitten/components';

const PlayAccessory = ({ music }) => {

    return <ListItem
        title={"Play"}
        accessoryLeft={(evaProps) => <Icon {...evaProps} name="play-circle-outline" />}
    />
}


const PlayNextAccessory = ({ music }) => {

    return <ListItem
        title={"Play Next"}
        accessoryLeft={(evaProps) => <Icon {...evaProps} name="arrow-forward-outline" />}
    />
}

const AddToCurrentPlaylistAccessory = ({ music }) => {

    return <ListItem
        title={"Add to Current Playlist"}
        accessoryLeft={(evaProps) => <Icon {...evaProps} name="plus-circle-outline" />}
    />
}

export { PlayAccessory, PlayNextAccessory, AddToCurrentPlaylistAccessory };