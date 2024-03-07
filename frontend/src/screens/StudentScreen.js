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

const data = [
    {
        name: 'Bogdan Strat',
        university: 'University of Bucharest',
        universityId: 1,
        domain: 'Computer Science',
        domainId: 1,
        phoneNumber: '+40754456778',
        email: 'bogdan.strat@s.unibuc.ro'
    },
    {
        name: 'Ion-Marian Anghelina',
        university: 'University of Bucharest',
        universityId: 1,
        domain: 'Computer Science',
        domainId: 1,
        phoneNumber: '+40754456778',
        email: 'ion.anghelina@s.unibuc.ro'
    },
    {
        name: 'Miruna-Alexandra Avram',
        university: 'University of Bucharest',
        universityId: 1,
        domain: 'Computer Science',
        domainId: 1,
        phoneNumber: '+40754456778',
        email: 'mriuna.avram@s.unibuc.ro'
    },
    {
        name: 'Alex Enache',
        university: 'University of Bucharest',
        universityId: 1,
        domain: 'Medicine',
        domainId: 4,
        phoneNumber: '+40754456778',
        email: 'alex.enache@s.unibuc.ro'
    },
    {
        name: 'Alexandra Florea',
        university: 'University of Stockholm',
        universityId: 5,
        domain: 'Law',
        domainId: 2,
        phoneNumber: '+40754456778',
        email: 'alexandra.florea@dsv.su.se'
    },
]

const universities = [
    {
        id: 1,
        name: "University of Bucharest"
    },
    {
        id: 2,
        name: "Harvard University"
    },
    {
        id: 3,
        name: "Massachuttes Institue of Techonology"
    },
    {
        id: 4,
        name: "Oxford University"
    },
    {
        id: 5,
        name: "University of Stockholm"
    },
]

const domains = [
    {
        id: 1,
        name: 'Computer Science'
    },
    {
        id: 2,
        name: 'Law'
    },
    {
        id: 3,
        name: 'Biology'
    },
    {
        id: 4,
        name: 'Medicine'
    },
    {
        id: 5,
        name: 'Physics'
    },
    {
        id: 6,
        name: 'Math'
    },
]

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const StudentScreen = ({ navigation }) => {
    const [students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [domainId, setDomainId] = useState(null);
    const [universityId, setUniversityId] = useState(null);
    const animationProgress = useRef(new Animated.Value(0));

    useEffect(() => {
        setStudents(data);
        setAllStudents(data);
    }, [])

    useEffect(() => {
        if (domainId === null && universityId === null) {
            setStudents(data);
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