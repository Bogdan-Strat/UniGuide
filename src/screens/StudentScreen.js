import { Avatar, Flex, Text } from "native-base";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../components/ScreenHeader";
import Routes from "../navigation/routes";
import { FontAwesome } from '@expo/vector-icons';

const StudentScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScreenHeader title={'Students'} navigation={navigation} route={Routes.HOME} />
                <ScrollView>
                    <Flex direction={'row'} p={5} mx={5} mt={5} bgColor={'#FFFFFF'} borderWidth={1} borderColor={'#FFFFFF'} borderRadius={16}>
                            <Avatar bg="green.500" size={'sm'} mr="2" source={{
                                uri: "https://bit.ly/broken-link"
                            }}>
                                RS
                            </Avatar>
                        <Flex direction={'column'} alignItems={'center'} gap={1}>
                            <Text fontWeight={'semibold'} fontSize={18}>Miruna Avram</Text>
                            <Flex direction={'row'} alignItems={'center'} gap={2}>
                                <FontAwesome name="phone" size={20} color="black" />
                                <Text fontSize={14}>0754456778</Text>
                            </Flex>
                            <Flex direction={'row'} alignItems={'center'}>
                                
                            </Flex>
                        </Flex>
                    </Flex>
                </ScrollView>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
});

export default StudentScreen;