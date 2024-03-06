import React, { useEffect } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, View, TouchableOpacity } from "react-native";

import { Text } from '@/components/Themed';
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchUserAlbums, fetchUsers, archiveAlbumById } from "@/features/userSlice";
import { ArchiveAlbumByIdDTO, User } from "@/interfaces";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function AgentsScreen() {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.user.users);
    const error = useAppSelector((state) => state.user.error);
    const loading = useAppSelector((state) => state.user.loading);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (users.length > 0 && !users[0].albums) {
            dispatch(fetchUserAlbums(users));
        }
    }, [loading]);

    const renderAlbumItem = ({ album, UUID }: ArchiveAlbumByIdDTO) => {

        let _hide = false;

        let handleOnPress = () => {
            _hide = true;
            dispatch(archiveAlbumById({ album, UUID }));
        };

        return (
            <View style={_hide ? {display: 'none'} : styles.albumItemContainer}>
                <Link
                    style={styles.albumItemText}
                    href={{
                        pathname: "/album/[id]",
                        params: { id: album.id }
                    }}
                >
                    {album.title}
                </Link>
                <TouchableOpacity
                    onPress={() => handleOnPress()}
                >
                    <Feather name="trash-2" size={24} />
                </TouchableOpacity>
            </View>
    )
    };

    const renderItem = (agent: User) => (
        <View style={styles.agentContainer}>
            <Text style={styles.agentName}>{agent.name}</Text>
            {agent.albums && (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={agent.albums.filter(each => !!each.isArchived == false)}
                    keyExtractor={(album) => album.id.toString()}
                    renderItem={({ item: album }) => renderAlbumItem({album, UUID: agent.id})}
                    
                />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {error && <Text>Error: {error}</Text>}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={i => renderItem(i.item)}
            />
            {loading && <ActivityIndicator size="large" color="#808080" />}
        </View>
    );
}

const _WIDTH = Dimensions.get("window").width * .5;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    agentContainer: {
        marginBottom: 60,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        alignSelf: "center"
    },
    agentName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333333",
        alignSelf: "flex-start"
    },
    albumItemContainer: {
        flex: 1,
        display: "flex",
        flexDirection: 'row',
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
        justifyContent: "space-between",
        minWidth: _WIDTH,
        width: _WIDTH,
    },
    albumItemText: {
        fontSize: 16,
        color: "#666666",
    },
});
