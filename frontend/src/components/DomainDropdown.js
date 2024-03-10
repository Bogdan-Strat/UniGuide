import { Select } from "native-base";
import { useState } from "react";

const DomainDropdown = ({domains, domain, setDomain}) => {
    return (
        <Select 
            selectedValue={domain} 
            rounded={8}
            variant={'filled'}
             placeholder="Select domain"
             _selectedItem={{
            bg: "#ADD8E6",
            rounded: 8
        }} 
         onValueChange={itemValue => {setDomain(itemValue);}}>
            {domains.map((u, index) => {
                return (
                    <Select.Item key={index} label={u.name} value={u.id} />
                )
            })}
        </Select>
    )
}

export default DomainDropdown;