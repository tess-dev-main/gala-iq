import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Image } from 'expo-image';

import { Photo } from "@/interfaces";
import { BLUR_HASH } from "@/constants/Strings";

interface PhotoItemProps {
    photo: Photo;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo }) => {
    const { width } = Dimensions.get("window");
    const imageWidth = (width - 32 ) / 3;

    return (
        <View style={styles.container}>
            <Image 
                style={[styles.image, { width: imageWidth, height: imageWidth }]}
                source={photo.thumbnailUrl}
                contentFit="cover"
                placeholder={BLUR_HASH}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 4
    },
    image: {
        borderRadius: 8
    },
});

export default PhotoItem;
