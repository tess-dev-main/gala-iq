import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { Text, View } from '@/components/Themed';
import PhotoItem  from '@/components/Photo';
import { RootState } from "../store";
import { useAppDispatch } from "@/hooks";
import { fetchPhotosPaginated } from "@/features/photoSlice";



export default function TabThreeScreen() {

    const dispatch = useAppDispatch();

    const photos = useSelector((state: RootState) => state.photo.photos);
    const error = useSelector((state: RootState) => state.photo.error);
    const loading = useSelector((state: RootState) => state.photo.loading);

    const [page, setPage] = useState(1);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        setIsLoad(true);
        console.log(`Loading!`);
        setTimeout(() => {
            setIsLoad(false);
        }, 1000);
        dispatch(fetchPhotosPaginated(page));
    }, [page]);

    const handleEndReached = (): void => {
        setPage(prev => prev + 1);
        dispatch(fetchPhotosPaginated(page));
    };

    return( 
        <View style={{ flex: 1 }}>
            {error && <Text>Error: {error}</Text>}
            <FlatList
                data={photos}
                keyExtractor={(i, idx) => idx.toString()}
                renderItem={i => (
                    <PhotoItem photo={i.item} />
                )}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
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