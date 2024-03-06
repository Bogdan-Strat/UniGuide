import { Flex, Text } from "native-base";
import { FontAwesome, FontAwesome6  } from '@expo/vector-icons';

const UniversityCard = ({ name, location, isLast }) => {
    return (
        <Flex mt={5} direction={'column'} mx={5} mb={isLast ? 5 : 0} p={5} borderWidth={1} rounded={16} shadow={1} borderColor={'#FFFFFF'} bgColor={'#FFFFFF'}>
            <Flex direction={'row'} alignItems={'center'} gap={3}>
                <Flex bgColor={'#F0F0F0'} rounded={'full'} p={3}>
                    <FontAwesome name="university" size={24} color="#3983ca" />
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <Text fontWeight={'semibold'} fontSize={18}>{name.length > 25 ? name.slice(0,25) + "..." : name}</Text>
                    <Flex direction={'row'} alignItems={'center'} gap={1}>
                        <FontAwesome6 name="location-dot" size={20} color="black" />
                        <Text fontSize={14}>{location}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default UniversityCard;