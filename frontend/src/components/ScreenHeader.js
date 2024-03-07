import { Flex, IconButton, Heading, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import Routes from '../navigation/routes';
import { TypingAnimation } from "react-native-typing-animation";

const ScreenHeader = ({ title, navigation, route, isHomeScreen, isProfileScreen }) => {
    return (
    <><Flex mx={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            {!isHomeScreen && <IconButton
                colorScheme={'black'}
                variant='ghost'
                borderRadius='full'
                onPress={(e) => navigation.navigate(route)}
                _icon={{
                    as: <AntDesign name='close' />,
                }} />}
                {isProfileScreen && <Flex direction={'row'} alignItems={'center'}>
                    <IconButton
                colorScheme={'black'}
                variant='ghost'
                borderRadius='full'
                //onPress={(e) => navigation.navigate(route)}
                _icon={{
                    as: <AntDesign name='edit' />,
                }} /> <Text fontSize={16}>Edit</Text> </Flex>
                }
        </Flex>
        <Flex mb={2} mt={isHomeScreen ? 5 : 0} justifyContent={'center'}>
                <Heading textAlign={'center'}>{title}</Heading>
            </Flex>
            
        </>
    );
}

export default ScreenHeader;