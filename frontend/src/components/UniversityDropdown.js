import { Select } from "native-base";
import { useState } from "react";

const UniversityDropdown = ({universities, university, setUniversity}) => {
    return (
        <Select 
            selectedValue={university} 
            rounded={8}
            variant={'filled'}
             placeholder="Select university"
             _selectedItem={{
            bg: "#ADD8E6",
            rounded: 8
        }} 
         onValueChange={itemValue => {setUniversity(itemValue)}}>
            {universities.map((u, index) => {
                return (
                    <Select.Item key={index} label={u.name} value={u.id} />
                )
            })}
        </Select>
    )
}

export default UniversityDropdown;