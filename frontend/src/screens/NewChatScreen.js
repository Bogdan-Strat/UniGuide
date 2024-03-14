import { Flex, Heading, IconButton, Input, Text, Avatar } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from "react-native";
import ConversationInput from "../components/ConversationInput";
import UserConversation from "../components/UserConversation";
import BotConversation from "../components/BotConversation";
import { useEffect, useRef, useState } from "react";
import OpenAI from "openai";
import React from "react";
import LottieView from 'lottie-react-native';
import { Animated, Easing } from 'react-native';
import { OPENAI_KEY } from "../util/keys";
import { NETWORK_IP } from "../util/constant";
import { useSelector } from "react-redux";
import { isUserAuthenticatedSelector } from "../selectors/auth";
import ScreenHeaderToHome from "../components/ScreenHeaderToHome";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const emptyModel = {
    threadId: '',
    question: '',
    answer: ''
}
const NewChatScreen = ({ navigation }) => {
    const [question, setQuestion] = useState("");
    const [thread, setThread] = useState(null);
    const [chatConversation, setChatConversation] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstMessage, setIsFirstMessage] = useState(false);

    const token = useSelector(isUserAuthenticatedSelector);

    const animationProgress = useRef(new Animated.Value(0));

    const apikey = OPENAI_KEY;
    const openai = new OpenAI({
        apiKey: apikey, // This is the default and can be omitted
    });

    useEffect(() => {
        const initThread = async () => {
            const thread = await openai.beta.threads.create();
            setThread(thread);
            Animated.timing(animationProgress.current, {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();

        }

        initThread();

    }, [])

    const addQuestionToCOnversation = async () => {
        setChatConversation(chatConversation => [...chatConversation, question]);
        setQuestion("");
        setIsLoading(true);
    }
    const askBot = async () => {
        const message = await openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: question
            }
        );
        
        if(!isFirstMessage){
            emptyModel.threadId = thread.id;
            emptyModel.question = question;
        }

        await addQuestionToCOnversation();

        const run = await openai.beta.threads.runs.create(
            thread.id,
            {
                assistant_id: "asst_TAM4w0tl8bGUpb8mEdf4UNBk"
            }
        );

        while (true) {
            const run2 = await openai.beta.threads.runs.retrieve(
                thread.id,
                run.id
            );

            if (run2.completed_at) {
                const messages = await openai.beta.threads.messages.list(
                    thread.id
                );

                const answer = messages.data[0].content[0].text.value;

                let startIndex = 0, endIndex = 1, cleanedAnswer = answer;


                // Check if both '[' and ']' exist and endIndex > startIndex
                while (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                    startIndex = cleanedAnswer.indexOf("【");
                    endIndex = cleanedAnswer.indexOf("】");

                    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {

                        cleanedAnswer = cleanedAnswer.slice(0, startIndex) + cleanedAnswer.slice(endIndex + 1);
                    }
                }

                setChatConversation(chatConversation => [...chatConversation, cleanedAnswer]);
                if (!isFirstMessage) {
                    
                    emptyModel.answer = cleanedAnswer;

                    const response = await fetch(`http://${NETWORK_IP}:7262/Chat/saveChat`,
                        {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(emptyModel)
                        })

                    if(response.ok){
                        setIsFirstMessage(true);
                    }
                }
                setIsLoading(false)
                break;
            }
            else if (run2.failed_at) {
                console.log('Something wen wrong!')
                break;
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScreenHeaderToHome title={'Chat'} navigation={navigation} />
                <ScrollView style={{ height: '80%', marginBottom: 120 }}>
                    {chatConversation.length === 0
                        ? <Flex justifyContent={'center'} alignItems={'center'} my={50}>
                            <AnimatedLottieView
                                source={require('../animations/Animation2.json')}
                                autoPlay
                                style={{
                                    width: 400,
                                    height: 400,
                                    backgroundColor: '#ffffff',
                                }} />
                        </Flex>
                        : chatConversation.map((conv, index) => {
                            if (index % 2 == 0) {
                                return (
                                    <UserConversation isLoading={isLoading} isTheLastOne={chatConversation.length - index == 1} key={index} text={conv} />
                                )
                            }
                            else {
                                return (
                                    <BotConversation key={index} text={conv} />
                                )
                            }
                        })}
                </ScrollView>
                <ConversationInput question={question} setQuestion={setQuestion} askBot={askBot} />
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

export default NewChatScreen;