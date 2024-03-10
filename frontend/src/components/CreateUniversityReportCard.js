import { Flex, Text, Pressable } from "native-base";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const CreateUniversityReportCard = ({ isChecked, id, check2, university }) => {

    return (
        <Pressable
            p={5}
            bgColor={'#FFFFFF'}
            rounded={16}
            onPress={() => {check2(id) }}
            _pressed={{ bgColor: '#A9A9A9' }}
        >
            <Flex direction={'row'} alignItems={'center'} gap={2}>
                {isChecked
                    ? <AntDesign name="checkcircle" size={24} color="green" />
                    : <MaterialIcons name="radio-button-unchecked" size={24} color="black" />
                }
                <Text fontWeight={isChecked ? 'semibold' : 'normal'} fontSize={16}>{university}</Text>
            </Flex>
        </Pressable>
    )
}

export default CreateUniversityReportCard;