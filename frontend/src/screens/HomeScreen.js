import React, { useEffect, useState } from "react";
import { Flex, Text, Avatar, Heading, Pressable } from "native-base";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import ScreenHeader from "../components/ScreenHeader";
import ConversationBox from "../components/ConversationBox";

const data = [
    {
        threadId: 'thread_4xSN2VKhdsiCKCAnQaebtBta',
        title: "What is the best university in the world",
        message: "The best university in the world is MIT",
        date: "22/4/2024"
    },
    {
        threadId: 'thread_Dau0RXqDlPFyBSzPWOHeVEel',
        title: "Tell me top 3 universitie in Gemany",
        message: "The best 3 universities in Germany are: Munchen, Berlin, Koln",
        date: "6/1/2023"
    },
    {
        threadId: 5,
        title: "Tell me top 3 universitie in Gemany",
        message: "The best 3 universities in Germany are: Munchen, Berlin, Koln",
        date: "6/1/2023"
    },
    {
        threadId: 4,
        title: "Tell me top 3 universitie in Gemany",
        message: "The best 3 universities in Germany are: Munchen, Berlin, Koln",
        date: "6/1/2023"
    },
    {
        threadId: 20,
        title: "Tell me top 3 universitie in Gemany",
        message: "The best 3 universities in Germany are: Munchen, Berlin, Koln",
        date: "6/1/2023"
    },
]

const HomeScreen = ({ navigation }) => {
    //conversation: threadId, title(firstQuestion), message(firstMessage), date 
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const getConversations = async () => {
            setConversations(data)
        }

        getConversations();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScreenHeader title={'Home'} isHomeScreen={true} />
                <ScrollView>
                   {conversations.map((c, index) => {
                    return (
                        <ConversationBox 
                            key={c.threadId} 
                            threadId={c.threadId}
                            title={c.title}
                            message={c.message}
                            date={c.date}
                            isLast={index == conversations.length - 1} 
                            navigation={navigation} />
                    )
                   })}
                </ScrollView>
            </GestureHandlerRootView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export default HomeScreen;