import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { Text, View } from '@/components/Themed';
import PhotoItem  from '@/components/Photo';
import { RootState } from "../store";
import { useAppDispatch } from "@/hooks";
import { fetchUsers } from "@/features/userSlice";



export default function AgentsScreen() {

    const dispatch = useAppDispatch();

    const users = useSelector((state: RootState) => state.user.users);
    const error = useSelector((state: RootState) => state.user.error);
    const loading = useSelector((state: RootState) => state.user.loading);

    useEffect(() => {
        dispatch(fetchUsers())        
    }, [dispatch]);

    return( 
        <View style={{ flex: 1 }}>
            {error && <Text>Error: {error}</Text>}
            <FlatList
                data={users}
                keyExtractor={i => i.id.toString()}
                renderItem={i => (
                    <Text>{i.item.name}</Text>
                )}                                
            />
            {loading && <ActivityIndicator size="large" color="#808080"/>}
        </View>
    )

}