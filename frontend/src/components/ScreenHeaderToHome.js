import { Flex, IconButton, Heading, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import Routes from "../navigation/routes";

const ScreenHeaderToHome = ({navigation, title}) => {
    return (
        <><Flex mx={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <IconButton
                    colorScheme={'black'}
                    variant='ghost'
                    borderRadius='full'
                    onPress={(e) => navigation.navigate(Routes.HOME)}
                    _icon={{
                        as: <AntDesign name='close' />,
                    }} />
            </Flex>
            <Flex mb={2} justifyContent={'center'}>
                    <Heading textAlign={'center'}>{title}</Heading>
                </Flex>
                
            </>
        );
}

export default ScreenHeaderToHome;