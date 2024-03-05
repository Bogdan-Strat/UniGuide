import { Avatar, Flex, Text } from "native-base";
import { TypingAnimation } from "react-native-typing-animation";

const UserConversation = ({ text, isLoading, isTheLastOne }) => {
    return (
        <>

            <Flex mt={5} mb={2} p={2} mr={5} rounded={'16px'} borderColor={'#808080'} borderWidth={1} ml={'30%'} direction="row" >
                <Avatar bg="green.500" size={'sm'} mr="2" source={{
                    uri: "https://bit.ly/broken-link"
                }}>
                    RS
                </Avatar>
                <Text textAlign={'justify'} maxW={'80%'} mt={0}>{text} </Text>
            </Flex>
            {isLoading && isTheLastOne && <Flex mb={2} mt={5} p={2} ml={3} rounded={'16px'} mr={'70%'} direction="row" alignItems={'center'}>
                <Avatar bg="green.500" size={'sm'} mr="2" source={require('../../assets/chatbot_photo.png')}>
                    RS
                </Avatar>
                <TypingAnimation
                    dotColor="#87CEFA"
                    dotMargin={5}
                    dotAmplitude={3}
                    dotSpeed={0.15}
                    dotRadius={2.5}
                    dotX={12}
                    dotY={8}
                />

            </Flex>}
        </>
    )
}

export default UserConversation;