import { Avatar, Flex, Text } from "native-base";

const BotConversation = ({text}) => {
    return (
        <Flex mb={2} shadow={"1"} bgColor={'#F0F8FF'} borderColor={'#F0F8FF'} mt={5} p={2} ml={5} rounded={'16px'} borderWidth={1} mr={'30%'} direction="row" >
            <Avatar bg="green.500" size={'sm'} mr="2" source={require('../../assets/chatbot_photo.png')}>
                RS
            </Avatar>
            <Text textAlign={'justify'} maxW={'80%'} mt={0}>{text} </Text>
        </Flex>
    )
}

export default BotConversation;