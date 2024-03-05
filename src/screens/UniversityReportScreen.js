import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler"
import ScreenHeader from "../components/ScreenHeader"
import Routes from "../navigation/routes"
import { useEffect, useState } from "react"
import UniversityCard from "../components/UniversityCard"

const data = [
    {
        name: 'Massachutes Institue of Technology',
        location: 'Cambridge, USA'
    },
    {
        name: 'Harvard University',
        location: 'Cambridge, USA'
    },
    {
        name: 'Stockholm University',
        location: 'Stockholm, Sweden'
    },
    {
        name: 'University of Bucharest',
        location: 'Bucharest, Romania'
    },
    {
        name: 'Oxford University',
        location: 'Oxford, UK'
    },
    {
        name: 'Oxford University',
        location: 'Oxford, UK'
    },
    {
        name: 'Oxford University',
        location: 'Oxford, UK'
    },
    {
        name: 'Oxford University',
        location: 'Oxford, UK'
    },
]

const UniversityReportScreen = ({navigation}) => {
    const [universities, setUniversities] = useState([])

    useEffect(() => {
        const getUniversities = async () => {
            setUniversities(data)
        }

        getUniversities();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScreenHeader title={'University Report'} navigation={navigation} route={Routes.HOME}></ScreenHeader>
                <ScrollView>
                    {universities.map((u, index) => {
                        return (
                            <UniversityCard key={index} name={u.name} location={u.location} isLast={index === universities.length - 1} />
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
        backgroundColor: '#FFFFFF',
    },
});

export default UniversityReportScreen;