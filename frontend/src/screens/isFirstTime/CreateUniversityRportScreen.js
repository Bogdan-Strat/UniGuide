import { StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Flex, IconButton, Heading, Text, useSafeArea, Button } from "native-base";
import Routes from "../../navigation/routes";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import CreateUniversityReportCard from "../../components/CreateUniversityReportCard";
import { connect, useSelector } from 'react-redux';
import { isUserAuthenticatedSelector } from "../../selectors/auth";
import { NETWORK_IP } from "../../util/constant";
import { tokenActionCreators as  actionCreators} from '../../store/actions/actionCreator';

const CreateUniversityReportScreen = ({ navigation, route, setIsFirstTime }) => {
    const { country, budget, grade } = route.params;
    const token = useSelector(isUserAuthenticatedSelector);

    const [universities, setUniversities] = useState([]);

    const model = {
        grade, budget, country
    }
    useEffect(() => {
        const getUniversities = async () => {
            const response = await fetch(`http://${NETWORK_IP}:7262/User/getUniversitiesForCreateUniversityReport`,
                {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(model) 
                })
            
            const data = await response.json();

            setUniversities(data);
        }

        getUniversities();
    }, [])


    const check2 = (id) => {
        const indexToUpdate = universities.findIndex(item => item.id === id);

        // If the object with id equal to 5 is found
        if (indexToUpdate !== -1) {
            // Update the isChecked property of the found object
            const updatedUniversities = [
                ...universities.slice(0, indexToUpdate),
                { ...universities[indexToUpdate], isChecked: !universities[indexToUpdate].isChecked },  // Update isChecked property
                ...universities.slice(indexToUpdate + 1)
            ];

            // Update the state with the modified list
            setUniversities(updatedUniversities);
        }
    }

    const save = async () => {
            const response = await fetch(`http://${NETWORK_IP}:7262/User/saveUniversityReport`,
                {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(universities) 
                })
            
            if(response.ok){
                setIsFirstTime(false);
            }

    }


    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Flex mx={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <IconButton
                        colorScheme={'black'}
                        variant='ghost'
                        borderRadius='full'
                        onPress={(e) => navigation.navigate(Routes.GRADE, { country, budget })}
                        _icon={{
                            as: <AntDesign name='close' />,
                        }} />
                </Flex>
                <Flex mb={2} justifyContent={'center'}>
                    <Heading textAlign={'center'}>University Report</Heading>
                </Flex>
                <ScrollView>
                    <Flex mx={5} mt={5} mb={120} gap={5}>
                        {universities.map(u => {
                            return (
                                <CreateUniversityReportCard
                                 key={u.id}
                                 id={u.id}
                                 university={u.university}
                                 isChecked={u.isChecked}
                                 check2={check2}
                                 />
                            )
                        })}
                    </Flex>
                </ScrollView>
                <Flex position={'absolute'} mx={5} bottom={10} justifyContent={'center'} alignItems={'center'} w={'90%'} >
                    <Button 
                        w={'100%'}
                        size={'lg'} 
                        rounded={'full'}
                        bgColor={'#3399ff'}
                        _pressed={{
                            bgColor: '#005fbd',
                          }}
                          onPress={() => save()}
                        >
                       {`Save (${universities.filter(u => u.isChecked).length} universities)`}
                    </Button>
                </Flex>
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

const mapDispatchToProps = (dispatch) => {
    return {
      dispatch,
      setIsFirstTime: (value) => {
        dispatch(actionCreators.setIsFirstTime(value));
      },
    };
  };

export default connect(null, mapDispatchToProps)(CreateUniversityReportScreen);