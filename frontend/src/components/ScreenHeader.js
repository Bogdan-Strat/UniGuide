import { Flex, IconButton, Heading } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import Routes from '../navigation/routes';
import { TypingAnimation } from "react-native-typing-animation";

const ScreenHeader = ({ title, navigation, route, isHomeScreen }) => {
    return (
    <><Flex mx={2} direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
            {!isHomeScreen && <IconButton
                colorScheme={'black'}
                variant='ghost'
                borderRadius='full'
                onPress={(e) => navigation.navigate(route)}
                _icon={{
                    as: <AntDesign name='close' />,
                }} />}
        </Flex>
        <Flex mb={2} mt={isHomeScreen ? 5 : 0} justifyContent={'center'}>
                <Heading textAlign={'center'}>{title}</Heading>
            </Flex>
            
        </>
    );
}

export default ScreenHeader;