import { Box, Flex, IconButton, Input, TextArea } from "native-base";
import { Ionicons } from '@expo/vector-icons';

const ConversationInput = ({question, setQuestion, askBot}) => {
    return (
        <Flex bgColor={'white'}  position={'absolute'} alignItems={'center'} w={'100%'} bottom={0} pl={5} py={5} direction={'row'} gap={2}>
                    <TextArea size={'lg'}
                           w={'75%'} 
                           placeholder="Ask me anything" 
                           //rounded={'full'}
                           borderRadius={16}
                           borderColor={'#808080'}
                           value={question}
                           onChangeText={(text) => setQuestion(text)}
                           _focus={{
                               backgroundColor: '#ffffff',
                               borderColor: '#808080'
                            }}
                           />
                    <IconButton
                        colorScheme={'black'}
                        w={'15%'}
                        variant='outline'
                        borderRadius='full'
                        borderColor={'#808080'}
                        _pressed={{
                            backgroundColor: '#000000'
                        }}
                        onPress={() => askBot()}
                        _icon={{
                            as:<Ionicons name="send" _pressed={'black'} />,
                        }} />
                </Flex>
    )
}

export default ConversationInput;