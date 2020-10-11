import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export const saveFileAsync = async (content, fileName, folderName) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
        const fileURI = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.writeAsStringAsync(fileURI, content, { encoding: FileSystem.EncodingType.UTF8 });

        const asset = await MediaLibrary.createAssetAsync(fileURI);
        await MediaLibrary.createAlbumAsync(folderName, asset, false);
    };
};

export const loadFileAsync = async (fileName) => {
    const asset = await MediaLibrary.createAssetAsync(`${FileSystem.documentDirectory}${fileName}`);
    const result = await FileSystem.readAsStringAsync(asset.uri);

    const resultData = JSON.parse(result);
    return resultData;
};
