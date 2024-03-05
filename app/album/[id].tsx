import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";

import { Text, View } from '@/components/Themed';
import PhotoItem  from '@/components/Photo';
import { RootState } from "../store";
import { useAppDispatch } from "@/hooks";
import { fetchAlbumById } from "@/features/photoSlice";



export default function AlbumView() {

    const dispatch = useAppDispatch();

    const photos = useSelector((state: RootState) => state.photo.photos);
    const error = useSelector((state: RootState) => state.photo.error);
    const loading = useSelector((state: RootState) => state.photo.loading);

    const { id } = useLocalSearchParams<{ id: string}>();

    useEffect(() => {
        dispatch(fetchAlbumById(parseInt(id)));
        console.log("Triggered!")
    }, []);



    return( 
        <View style={{ flex: 1 }}>
            {error && <Text>Error: {error}</Text>}
            <FlatList
                data={photos}
                keyExtractor={(i, idx) => idx.toString()}
                renderItem={i => (
                    <PhotoItem photo={i.item} />
                )}
                numColumns={3}
                scrollEnabled={!loading}
                maxToRenderPerBatch={50}
                removeClippedSubviews={true}
                initialNumToRender={25}
                updateCellsBatchingPeriod={150}
                windowSize={42}

            />
            {loading && <ActivityIndicator size="large" color="#808080"/>}
        </View>
    )

}