import { Flex, Button, Text, Pressable } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import ScreenHeader from "../components/ScreenHeader";
import Routes from "../navigation/routes";
import ProfileCard from "../components/ProfileCard";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import PayModal from "../components/PayModal";
import { NETWORK_IP } from "../util/constant";
import { useSelector } from "react-redux";
import * as Linking from 'expo-linking';
import { isUserAuthenticatedSelector, nameSelector } from "../selectors/auth";


const ProfileScreen = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState(null)
    const [balance, setBalance] = useState(0);

    const token = useSelector(isUserAuthenticatedSelector);
    const name = useSelector(nameSelector);

    useEffect(() => {
        const getProfile = async () => {
            const response = await fetch(`http://${NETWORK_IP}:7262/User/getProfile`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
            
            if(response.ok){
                const data = await response.json();
                setProfile(data)
                setBalance(data.balance);
            }

            
        }

        getProfile();
    }, [])

    const addInifiniteBalance = async () => {
        Linking.openURL('https://buy.stripe.com/test_eVa2c6eMegMofpSbIJ')
        

        const response = await fetch(`http://${NETWORK_IP}:7262/User/addBalance?balance=${1000}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
    
        if(response.ok){
            setBalance(balance + 1000)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScreenHeader title={`Hello, ${name.split(' ')[0]}`} navigation={navigation} route={Routes.HOME} isProfileScreen={true} />
                <ScrollView>
                    <Flex direction={'row'} w={'90%'} alignItems={'center'} mx={5} mt={5} justifyContent={'space-between'}>
                        <Text fontWeight={'semibold'} fontSize={20}>My profile</Text>
                        
                    </Flex>
                    {profile && <>
                        <Flex direction={'row'} w={'90%'} alignItems={'center'} mx={5} mt={5} justifyContent={'space-between'}>
                            <ProfileCard title={'Home country'} content={profile.country} />
                            <ProfileCard title={'Budget / month'} content={`${profile.budget} €`} />
                        </Flex>
                        <Flex direction={'row'} alignItems={'center'} mx={5} mt={5} justifyContent={'space-between'}>
                            <ProfileCard title={'Avg. grade'} content={`${profile.grade} / 10`} />
                            <ProfileCard title={'Balance'} content={balance >= 900 ? '∞' : `${balance} €`} />
                        </Flex>
                        {balance < 900 && <Flex w={'90%'} alignItems={'center'} mx={5} mt={5} bgColor={'#FFFFFF'} rounded={16} p={5}>
                            <Text fontWeight={'semibold'} fontSize={18}>Do you want to talk with the UniGuide chatbot more?</Text>
                            <Button 
                            size={'lg'} 
                            rounded={'full'}
                            w={'90%'}
                            mt={5}
                            onPress={() => setShowModal(true)}
                            bgColor={'#3399ff'}
                            _pressed={{
                                bgColor: '#005fbd',
                            }}>
                            Add balance
                        </Button>
                        <Text my={5}>or</Text>
                        <Button 
                            size={'lg'} 
                            rounded={'full'}
                            w={'90%'}
                            bgColor={'#3399ff'}
                            _pressed={{
                                bgColor: '#005fbd',
                            
                            }}
                            onPress={() => addInifiniteBalance()}>
                            Buy infinite balance
                        </Button>
                        </Flex>}
                        <Pressable p={5} mb={5} w={'90%'} mx={5} mt={5} rounded={16} bgColor={'#FFFFFF'} _pressed={{ bgColor: '#A9A9A9' }}>
                            <Flex direction={'row'} alignItems={'center'} gap={3}>
                                <MaterialIcons name="logout" size={24} color="black" />
                                <Text>Sign out</Text>
                            </Flex>
                        </Pressable>
                    </>
                        }
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