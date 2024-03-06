import { useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";

import { Text, View } from '@/components/Themed';
import PhotoItem  from '@/components/Photo';
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchAlbumById } from "@/features/photoSlice";



export default function AlbumView() {

    const dispatch = useAppDispatch();

    const photos = useAppSelector((state) => state.photo.photos);
    const error = useAppSelector((state) => state.photo.error);
    const loading = useAppSelector((state) => state.photo.loading);

    const { id } = useLocalSearchParams<{ id: string}>();

    useEffect(() => {
        dispatch(fetchAlbumById(parseInt(id)));
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