import { Avatar, Flex, Pressable, Text } from "native-base";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../components/ScreenHeader";
import Routes from "../navigation/routes";
import { useEffect, useState } from "react";
import StudentCard from "../components/StudentCard";

const data = [
    {
        name: 'Bogdan Strat',
        university: 'University of Bucharest',
        phoneNumber: '+40754456778',
        email: 'bogdan.strat@s.unibuc.ro'
    },
    {
        name: 'Bogdan-Valentin Strat',
        university: 'University of Bucharest',
        phoneNumber: '+40754456778',
        email: 'bogdan.strat@s.unibuc.ro'
    },
    {
        name: 'Miruna-Alexandra Avram',
        university: 'University of Bucharest',
        phoneNumber: '+40754456778',
        email: 'mriuna.avram@s.unibuc.ro'
    },
    {
        name: 'Alex Enache',
        university: 'University of Bucharest',
        phoneNumber: '+40754456778',
        email: 'alex.enache@s.unibuc.ro'
    },
    {
        name: 'Alexandra Florea',
        university: 'University of Stockholm',
        phoneNumber: '+40754456778',
        email: 'alexandra.florea@dsv.su.se'
    },
]

const StudentScreen = ({ navigation }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        setStudents(data);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScreenHeader title={'Students'} navigation={navigation} route={Routes.HOME} />
                <ScrollView>
                    {students.map((s, index) => {
                        return (
                            <StudentCard 
                                key={index}
                                name={s.name}
                                university={s.university}
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