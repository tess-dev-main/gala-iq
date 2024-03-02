import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { Text } from '@/components/Themed';
import { RootState } from "../store";
import { useAppDispatch } from "@/hooks";
import { fetchUserAlbums, fetchUsers } from "@/features/userSlice";
import { Album, User } from "@/interfaces";

export default function AgentsScreen() {
    const dispatch = useAppDispatch();
    const users = useSelector((state: RootState) => state.user.users);
    const error = useSelector((state: RootState) => state.user.error);
    const loading = useSelector((state: RootState) => state.user.loading);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (users.length > 0) {
            dispatch(fetchUserAlbums(users));
        }
    }, [dispatch]);

    const renderAlbumItem = (album: Album) => (
        <TouchableOpacity style={styles.albumItemContainer}>
            <Text style={styles.albumItemText}>{album.title}</Text>
        </TouchableOpacity>
    );

    const renderItem = (agent: User) => (
        <View style={styles.agentContainer}>
            <Text style={styles.agentName}>{agent.name}</Text>
            {agent.albums && (
                <FlatList
                    data={agent.albums}
                    keyExtractor={(album) => album.id.toString()}
                    renderItem={({ item: album }) => renderAlbumItem(album)}
                />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {error && <Text>Error: {error}</Text>}
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={i => renderItem(i.item)}
            />
            {loading && <ActivityIndicator size="large" color="#808080" />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    agentContainer: {
        marginBottom: 20,
    },
    agentName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333333",
    },
    albumItemContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 8,
        elevation: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    albumItemText: {
        fontSize: 16,
        color: "#666666",
    },
});
