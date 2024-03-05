import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import OpenAI from "openai";
import ScreenHeader from "../components/ScreenHeader";
import ConversationInput from "../components/ConversationInput";
import Routes from "../navigation/routes";
import BotConversation from "../components/BotConversation";
import UserConversation from "../components/UserConversation";
import { Spinner, Flex, Heading, HStack } from "native-base";
import { OPENAI_KEY } from "../util/keys";

const ChatScreen = ({ route, navigation }) => {
    const [question, setQuestion] = useState("");
    const [chatConversation, setChatConversation] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const apikey = OPENAI_KEY;
    console.log(apikey);
    const openai = new OpenAI({
        apiKey: apikey, // This is the default and can be omitted
    });
    const { thread } = route.params;

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: undefined
        });
    }, [navigation]);

    useEffect(() => {
        const getConversationByThreadId = async () => {
            const messages = await openai.beta.threads.messages.list(
                thread
            );


            for (let i = messages.data.length - 1; i >= 0; i--) {
                console.log(messages.data[i].content)
                console.log(2)

                const answer = messages.data[i].content[0].text.value;

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
                setIsLoading(false)
            }
        }
        getConversationByThreadId();
    }, [])

    const addQuestionToCOnversation = async () => {
        setChatConversation(chatConversation => [...chatConversation, question]);
        setQuestion("");
        setIsLoading(true);
    }
    const askBot = async () => {
        const message = await openai.beta.threads.messages.create(
            thread,
            {
                role: "user",
                content: question
            }
        );

        await addQuestionToCOnversation();

        const run = await openai.beta.threads.runs.create(
            thread,
            {
                assistant_id: "asst_TAM4w0tl8bGUpb8mEdf4UNBk"
            }
        );

        while (true) {
            const run2 = await openai.beta.threads.runs.retrieve(
                thread,
                run.id
            );

            if (run2.completed_at) {
                const messages = await openai.beta.threads.messages.list(
                    thread
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
                <ScreenHeader title={'Chat'} navigation={navigation} route={Routes.HOME} />
                <ScrollView style={{ height: '80%', marginBottom: 120 }}>
                    {chatConversation.length === 0
                        ?  <Flex direction={'row'} mt={'60%'} space={8} justifyContent="center" alignItems="center">
                            <Spinner size={'lg'} color="#ADD8E6" accessibilityLabel="Loading posts" />
                            {/* <Heading color="cyan.500" fontSize="md">
                                Loading
                            </Heading> */}
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


export default ChatScreen;