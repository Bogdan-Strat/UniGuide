import { Flex, Text, Avatar, Pressable } from "native-base";
import { FontAwesome, Feather, Ionicons, MaterialCommunityIcons  } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { useEffect, useState } from "react";

const StudentCard = ({name, university, domain, phoneNumber, email, isLast}) => {
    const [isEmailPressed, setIsEmailPressed] = useState(false);
    const [isPhonePressed, setIsPhonePressed] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
            setIsEmailPressed(false);
        }, 4000)
    }, [isEmailPressed])

    useEffect(() => {
        setTimeout(() => {
            setIsPhonePressed(false);
        }, 4000)
    }, [isPhonePressed])

    return (
        <Flex direction={'row'} p={5} mx={5} mt={5} bgColor={'#FFFFFF'} borderWidth={1} borderColor={'#FFFFFF'} borderRadius={16} mb={isLast ? 5 : 0} shadow={1}>
            <Avatar bg="green.500" size={'sm'} mr="2" source={{
                uri: "https://bit.ly/broken-link"
            }}>
                {name.split(' ')[0][0] + name.split(' ')[1][0]}
            </Avatar>
            <Flex direction={'column'} gap={2}>
                <Text fontWeight={'bold'} fontSize={18}>{name}</Text>
                <Flex direction={'row'} alignItems={'center'} gap={1}>
                    <Ionicons name="school-outline" size={20} color="black" />
                    <Text fontSize={14} fontWeight={'semibold'}>{university}</Text>
                </Flex>
                <Flex direction={'row'} alignItems={'center'} gap={1}>
                    <MaterialCommunityIcons name="book-education-outline" size={20} color="black" />
                    <Text fontSize={14} >{domain}</Text>
                </Flex>
                <Flex direction={'row'} alignItems={'center'} gap={1}>
                    <FontAwesome name="whatsapp" size={20} color="#25D366" />
                    <Pressable
                        _pressed={{ textColor: '#3366CC' }}
                        onPress={() => { Linking.openURL(`whatsapp://send?text=Hello! I saw your profile on UniGuide. Can you help me with some answers, please?&phone=${phoneNumber}`); setIsPhonePressed(true) }}>
                        <Text fontSize={14} color={isPhonePressed ?  '#3366CC' : 'black'} underline={isPhonePressed}>{phoneNumber}</Text>
                    </Pressable>
                </Flex>
                <Flex direction={'row'} alignItems={'center'} gap={1}>
                    <Feather name="mail" size={20} color="black" />
                    <Pressable
                        onPress={() => { Linking.openURL(`mailto:${email}`); setIsEmailPressed(true) }}>
                        <Text fontSize={14} color={isEmailPressed ?  '#3366CC' : 'black'} underline={isEmailPressed}>{email}</Text>
                    </Pressable>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default StudentCard;