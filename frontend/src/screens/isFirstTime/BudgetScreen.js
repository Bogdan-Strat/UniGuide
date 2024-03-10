import { Flex, Heading, Input, Button, Text, IconButton } from "native-base";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Routes from "../../navigation/routes";
import { AntDesign } from "@expo/vector-icons";

const BudgetScreen = ({navigation, route }) => {
    const [budget, setBudget] = useState("");
    const [isError, setIsError] = useState(false);
    const {country} = route.params;

    const nextScreen = () => {
        if (budget === "") {
            setIsError(true);
        }
        else {
            navigation.navigate(Routes.GRADE, { budget: budget, country: country })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <IconButton
                    colorScheme={'black'}
                    variant='ghost'
                    borderRadius='full'
                    ml={2}
                    w={60}
                    onPress={(e) => navigation.navigate(Routes.COUNTRY)}
                    _icon={{
                        as: <AntDesign name='close' />,
                    }} />
                <Flex h={'100%'} mt={-10} mx={5} w={'90%'} alignItems={'center'} justifyContent={'center'}>
                    <Heading>What is your monthly budget (€)?</Heading>
                    <Input
                        rounded={'full'}
                        placeholder="Write your monthly budget"
                        keyboardType="numeric"
                        mt={5}
                        value={budget}
                        onChangeText={(text) => { setBudget(text); setIsError(false) }}
                        w={'90%'}
                    />
                    {isError && <Text color={'#FF0000'} ml={'-150px'} mt={2}>This field is mandatory</Text>}

                    <Button
                        rounded={'full'}
                        mt={10}
                        w={'90%'}
                        onPress={() => { nextScreen() }}
                        bgColor={'#3399ff'}
                        _pressed={{
                            bgColor: '#005fbd',
                          }}
                          >
                        Next
                    </Button>
                    <Flex justifyContent={'center'} alignItems={'center'} gap={2} position={'absolute'} bottom={10} direction={'row'}>
                        <Flex bgColor={'#808080'} w={2} h={2} rounded={'full'}>

                        </Flex>
                        <Flex bgColor={'#3399ff'} w={2} h={2} rounded={'full'}>

                        </Flex>
                        <Flex bgColor={'#808080'} w={2} h={2} rounded={'full'}>

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

export default BudgetScreen;