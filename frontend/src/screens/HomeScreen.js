import React, { useEffect, useState } from "react";
import { Flex, Text, Avatar, Heading, Pressable } from "native-base";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import ScreenHeader from "../components/ScreenHeader";
import ConversationBox from "../components/ConversationBox";
import { NETWORK_IP } from "../util/constant";
import { useSelector } from "react-redux";
import { isUserAuthenticatedSelector } from "../selectors/auth";
import { useRef } from "react";
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

// const data = [
//     {
//         threadId: 'thread_4xSN2VKhdsiCKCAnQaebtBta',
//         title: "Tell me top 3 universities in the world",
//         message: `The top 3 universities in the world according to the 2024 QS World University Rankings are:

//         Massachusetts Institute of Technology (MIT) - United States
//         University of Cambridge - United Kingdom
//         University of Oxford - United Kingdom`,
//         date: "6/3/2024"
//     },
//     {
//         threadId: 'thread_Dau0RXqDlPFyBSzPWOHeVEel',
//         title: "Tell me the top universities in Sweden",
//         message: "The top university in Sweden, according to the 2024 QS World University Rankings, is Lund University, ranking at position 95",
//         date: "2/3/2024"
//     },
// ]

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const HomeScreen = ({ navigation, route }) => {
    //conversation: threadId, title(firstQuestion), message(firstMessage), date 
    const [conversations, setConversations] = useState([]);
    const token = useSelector(isUserAuthenticatedSelector);
    const animationProgress = useRef(new Animated.Value(0));

    useEffect(() => {
        const getConversations = async () => {
            Animated.timing(animationProgress.current, {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();

            const response = await fetch(`http://${NETWORK_IP}:7262/Chat/getChats`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
            
            if(response.ok){
                const data = await response.json();

                setConversations(data);
            }            
        }

        getConversations();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScreenHeader title={'Home'} isHomeScreen={true} />
                <ScrollView>
                    {conversations.length === 0 
                    ? <Flex bgColor={'#FFFFFF'} mx={5} mt={200} justifyContent={'center'} alignItems={'center'}>
                    <AnimatedLottieView
                    source={require('../animations/Discussion2.json')}
                    autoPlay
                    style={{
                        width: 200,
                        height: 200,
                    }} />
                    <Text fontWeight={'semibold'} fontSize={18}>No conversation yet</Text>
                    </Flex>
                    : conversations.map((c, index) => {
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