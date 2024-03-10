import { Button, Flex, Heading, Image, Pressable, Text, View } from "native-base";
import { default as React } from "react";
import { StyleSheet } from "react-native";
import Routes from "../../navigation/routes";

const LandingScreen = ({ navigation }) => {
    return (
        <View style={styles.container} position={"relative"}>
            <Image
                source={require("../../../assets/landing-photo.png")}
                style={styles.backgroundImage}
                alt="background-image"
            />
            <Flex w={"100%"} style={styles.content} position={"absolute"} bottom={0} bgColor={"transparent"}>
                <Flex px={10} pt={8} style={styles.blurImg}>
                    <Flex w={"70%"}>
                        <Heading fontSize={24} color={"rgba(255, 255, 255, 1)"}>
                            Plan unforgettable trips
                        </Heading>
                        <Text color={"rgba(255, 255, 255, 1)"} fontSize={16} mt={3}>
                            Use Traveller to discover and schedule stunning trips.
                        </Text>
                    </Flex>
                    <Flex style={styles.buttons} mt={10}>
                        <Button
                            w="100%"
                            bgColor="light.100"
                            variant={"filled"}
                            rounded={12}
                            _text={{
                                color: "black",
                                fontSize: 16,
                            }}
                            _pressed={{
                                bgColor: "rgba(120, 120, 120, 1)",
                            }}
                            size={"lg"}
                            onPress={() => navigation.navigate(Routes.SIGN_UP)}
                        >
                            Get started
                        </Button>
                        <Flex direction={"row"} mt={5} justifyContent={"center"}>
                            <Text color={"rgba(151, 148, 148, 1)"} fontSize={16}>
                                Already have an account?{" "}
                            </Text>
                            <Pressable onPress={() => navigation.navigate(Routes.SIGN_IN)}>
                                {({ isPressed }) => {
                                    console.log(isPressed);
                                    return (
                                        <Text
                                            color={"rgba(151, 148, 148, 1)"}
                                            fontSize={16}
                                            fontWeight="bold"
                                            underline={isPressed ? true : false}
                                        >
                                            Sign in
                                        </Text>
                                    );
                                }}
                            </Pressable>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </View>
    );
};

export default LandingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    blurImg: {
        backgroundColor: "rgba(220,220,220, 0)",
        backdropFilter: "blur(2px)",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        position: "relative",
        //h: 'auto',
        width: "100%",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        //flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 50,
    },
    titleContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttons: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "light.100",
    },
    buttonText: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
    },
});