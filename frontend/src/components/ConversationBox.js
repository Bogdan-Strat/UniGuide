import { Pressable, Flex, Avatar, Text, Heading } from 'native-base';
import { Feather } from '@expo/vector-icons';
import Routes from '../navigation/routes';

const ConversationBox = ({ threadId, isLast, navigation, title, message, date }) => {
    return (
        <Pressable
            borderWidth={1}
            borderRadius={16}
            borderColor={'#F0F8FF'}
            bgColor={'#F0F8FF'}
            shadow={1}
            mx={5}
            mt={5}
            mb={isLast ? 5 : 0}
            onPress={() => { navigation.navigate('Chat', { thread: threadId }) }}
            _pressed={{ bgColor: "#ADD8E6" }}>
            <Flex
                p={5}
                gap={1}
                direction={'row'}
                alignItems={'center'}
            >
                <Avatar bg="green.500" size={'lg'} mr="2" source={require('../../assets/chatbot_photo.png')}>
                    RS
                </Avatar>
                <Flex maxW={'80%'} mt={0}>
                    <Text fontWeight={'semibold'} fontSize={16}>{title.slice(0, 30) + "..."} </Text>
                    <Text fontSize={14}>{message.slice(0, 40) + "..."}</Text>
                    <Flex direction={'row'} alignItems={'center'} gap={2} mt={1}>
                        <Feather name="calendar" size={24} color="black" />
                        <Text>{new Date(date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Pressable>
    )
}

export default ConversationBox;