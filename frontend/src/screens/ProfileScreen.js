import { Flex, Button, Text, Pressable } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import ScreenHeader from "../components/ScreenHeader";
import Routes from "../navigation/routes";
import ProfileCard from "../components/ProfileCard";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import PayModal from "../components/PayModal";

const ProfileScreen = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScreenHeader title={'Hello, Bogdan'} navigation={navigation} route={Routes.HOME} isProfileScreen={true} />
                <ScrollView>
                    <Flex direction={'row'} w={'90%'} alignItems={'center'} mx={5} mt={5} justifyContent={'space-between'}>
                        <Text fontWeight={'semibold'} fontSize={20}>My profile</Text>
                        
                    </Flex>
                    <Flex direction={'row'} w={'90%'} alignItems={'center'} mx={5} mt={5} justifyContent={'space-between'}>
                        <ProfileCard title={'Home country'} content={'Romania'} />
                        <ProfileCard title={'Budget / month'} content={'1000 €'} />
                    </Flex>
                    <Flex direction={'row'} alignItems={'center'} mx={5} mt={5} justifyContent={'space-between'}>
                        <ProfileCard title={'Avg. grade'} content={'9.16 / 10'} />
                        <ProfileCard title={'Balance'} content={'5.25 €'} />
                    </Flex>
                    <Flex w={'90%'} alignItems={'center'} mx={5} mt={5} bgColor={'#FFFFFF'} rounded={16} p={5}>
                        <Text fontWeight={'semibold'} fontSize={18}>Do you want to talk with the UniGuide chatbot more?</Text>
                        <Button 
                        size={'lg'} 
                        rounded={'full'}
                        w={'90%'}
                        mt={5}
                        onPress={() => setShowModal(true)}>
                        Add balance
                    </Button>
                    <Text my={5}>or</Text>
                    <Button 
                        size={'lg'} 
                        rounded={'full'}
                        w={'90%'}
                        onPress={() => setShowModal(true)}>
                        Add infinite balance
                    </Button>
                    </Flex>
                    <Pressable p={5} mb={5} w={'90%'} mx={5} mt={5} rounded={16} bgColor={'#FFFFFF'} _pressed={{ bgColor: '#A9A9A9' }}>
                        <Flex direction={'row'} alignItems={'center'} gap={3}>
                            <MaterialIcons name="logout" size={24} color="black" />
                            <Text>Sign out</Text>
                        </Flex>
                    </Pressable>
                </ScrollView>
                <PayModal showModal={showModal} setShowModal={setShowModal} />
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

export default ProfileScreen;