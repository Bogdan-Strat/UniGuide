import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Flex } from "native-base";

const CreateUniversityReportScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView>
                <Flex style={{flex: 1}}>
                    Create report
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

export default CreateUniversityReportScreen;