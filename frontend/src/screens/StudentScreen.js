import { StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../components/ScreenHeader";
import Routes from "../navigation/routes";
import { useEffect, useState, useRef } from "react";
import { Flex, Text } from "native-base";
import StudentCard from "../components/StudentCard";
import UniversityDropdown from "../components/UniversityDropdown";
import DomainDropdown from "../components/DomainDropdown";
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import { NETWORK_IP } from "../util/constant";
import { useSelector } from "react-redux";
import { isUserAuthenticatedSelector } from "../selectors/auth";

const universities = [
    { id: 1, name: 'University of Oxford' },
    { id: 2, name: 'ETH Zurich' },
    { id: 3, name: 'Technical University of Munich' },
    { id: 4, name: 'Sorbonne University' },
    { id: 5, name: 'National University of Singapore' },
    { id: 6, name: 'Fudan University' },
    { id: 7, name: 'University of Helsinki' },
    { id: 8, name: 'Massachusetts Institute of Technology' },
    { id: 9, name: 'Harvard University' },
    { id: 10, name: 'University of British Columbia' },
    { id: 11, name: 'Indian Institute of Science' },
    { id: 12, name: 'University of Amsterdam' },
    { id: 13, name: 'Stanford University' },
    { id: 14, name: 'Stockholm University' },
    { id: 15, name: 'KTH Royal Institute of Technology' },
    { id: 16, name: 'Uppsala University' },
    { id: 17, name: 'University of Melbourne' },
    { id: 18, name: 'University of São Paulo' }
]

const domains = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Law' },
    { id: 3, name: 'Medicine' },
    { id: 4, name: 'Physics' },
    { id: 5, name: 'Math' },
    { id: 6, name: 'Journalism' },
    { id: 7, name: 'Business' },
    { id: 8, name: 'Arts' },
    { id: 9, name: 'Chemistry' },
    { id: 10, name: 'Political Science' },
    { id: 11, name: 'Computer Engineering' },
    { id: 12, name: 'Electrical Engineering' },
    { id: 13, name: 'Mechanical Engineering' },
    { id: 14, name: 'Architecture' },
    { id: 15, name: 'Agriculture' }
]

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const StudentScreen = ({ navigation }) => {
    const [students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [domainId, setDomainId] = useState(null);
    const [universityId, setUniversityId] = useState(null);
    const animationProgress = useRef(new Animated.Value(0));

    const token = useSelector(isUserAuthenticatedSelector);

    useEffect(() => {
        const getStudents = async () => {
            const response = await fetch(`http://${NETWORK_IP}:7262/Student/getStudents`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
            
            if(response.ok){
                const data = await response.json();

                setStudents(data);
                setAllStudents(data);
            }
        }

        getStudents();
 
    }, [])

    useEffect(() => {
        if (domainId === null && universityId === null) {
            setStudents(allStudents);
        }
        else {
            let filteredStudents = allStudents;

            if (domainId) {
                filteredStudents = filteredStudents.filter(s => {
                    return s.domainId === domainId;
                })
            }

            if (universityId) {
                filteredStudents = filteredStudents.filter(s => {
                    return s.universityId === universityId;
                })
            }

            if (filteredStudents.length === 0) {
                Animated.timing(animationProgress.current, {
                    toValue: 1,
                    duration: 5000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }).start();
            }

            setStudents(filteredStudents);
        }

    }, [domainId, universityId])

    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScreenHeader title={'Students'} navigation={navigation} route={Routes.HOME} />
                <ScrollView>
                    <Flex bgColor={'#FFFFFF'} gap={5} mx={5} py={7} px={5} borderWidth={1} rounded={16} borderColor={'#FFFFFF'}>
                        <UniversityDropdown universities={universities} university={universityId} setUniversity={setUniversityId} />
                        <DomainDropdown domains={domains} domain={domainId} setDomain={setDomainId} />
                    </Flex>
                    {students.length === 0
                        ? <Flex bgColor={'#F0F0F0'} mx={5} mt={100} justifyContent={'center'} alignItems={'center'}>
                            <AnimatedLottieView
                            source={require('../animations/NoDataAnimation.json')}
                            autoPlay
                            style={{
                                width: 200,
                                height: 200,
                            }} />
                            <Text fontWeight={'semibold'} fontSize={18}>No matching</Text>
                            </Flex>
                        : students.map((s, index) => {
                            return (
                                <StudentCard
                                    key={index}
                                    name={s.name}
                                    university={s.university}
                                    domain={s.domain}
                                    phoneNumber={s.phoneNumber}
                                    email={s.email}
                                    isLast={index === students.length - 1}
                                />
                            )
                        })}
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