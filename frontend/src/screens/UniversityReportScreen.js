import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler"
import ScreenHeader from "../components/ScreenHeader"
import Routes from "../navigation/routes"
import { useEffect, useState } from "react"
import UniversityCard from "../components/UniversityCard"
import { NETWORK_IP } from "../util/constant"
import { useSelector } from "react-redux";
import { isUserAuthenticatedSelector } from "../selectors/auth";

const UniversityReportScreen = ({navigation}) => {
    const [universities, setUniversities] = useState([]);
    const token = useSelector(isUserAuthenticatedSelector);

    useEffect(() => {
        const getUniversities = async () => {
            const response = await fetch(`http://${NETWORK_IP}:7262/University/getUniversities`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
            
            if(response.ok){
                const data = await response.json();
                setUniversities(data);
            }
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
        backgroundColor: '#F0F0F0',
    },
});

export default UniversityReportScreen;