import { Flex, Heading, Input, Button, Text } from "native-base";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Routes from "../../navigation/routes";

const HomeCountryScreen = ({navigation}) => {
    const [country, setCountry] = useState("");
    const [isError, setIsError] = useState(false);

    const nextScreen = () => {
        if(country === ""){
            setIsError(true);
        }
        else{
            navigation.navigate(Routes.BUDGET, {country: country})
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Flex h={'100%'} mx={5} w={'90%'} alignItems={'center'} justifyContent={'center'}>
                    <Heading>From which country are you from?</Heading>
                        <Input
                            rounded={'full'}
                            placeholder="Write your home country" 
                            mt={5}
                            value={country}
                            onChangeText={(text) => {setCountry(text); setIsError(false)}}
                            w={'90%'}
                        />
                        {isError && <Text color={'#FF0000'} ml={'-150px'} mt={2}>This field is mandatory</Text>}
                        
                    <Button
                        rounded={'full'}
                        mt={10}
                        w={'90%'}
                        bgColor={'#3399ff'}
                        _pressed={{
                            bgColor: '#005fbd',
                          }}
                        onPress={() => {nextScreen()}}>
                        Next
                    </Button>
                    <Flex justifyContent={'center'} alignItems={'center'} gap={2} position={'absolute'} bottom={10} direction={'row'}>
                        <Flex  bgColor={'#3399ff'} w={2} h={2} rounded={'full'}>


                        </Flex>
                        <Flex  bgColor={'#808080'} w={2} h={2} rounded={'full'}>

                        </Flex>
                        <Flex  bgColor={'#808080'} w={2} h={2} rounded={'full'}>

                        </Flex>
                    </Flex>
                </Flex>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export default HomeCountryScreen;