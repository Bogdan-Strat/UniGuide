import { Flex, Text } from "native-base";

const ProfileCard = ({title, content}) => {
    return (
        <Flex bgColor={'#FFFFFF'} w={'48%'} direction={'column'} p={5} rounded={16} alignItems={'center'}>
            <Text fontWeight={'semibold'} fontSize={18}>{title}</Text>
            <Text mt={5} fontSize={16}>{content}</Text>
        </Flex>
    )
}

export default ProfileCard;