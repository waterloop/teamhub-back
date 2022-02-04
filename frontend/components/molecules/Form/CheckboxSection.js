import React, { useState, useContext, useEffect, useRef } from 'react';
import { SystemComponent, SystemSpan } from '../../atoms/SystemComponents';
import Checkbox from '../../atoms/Checkbox';

const CheckboxSection = ({options}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleOption = (value) => {
        if (selectedOptions.includes(value)) {
            let idx = selectedOptions.indexOf(value);
            setSelectedOptions([
                ...selectedOptions.slice(0, idx),
                ...selectedOptions.slice(idx + 1)
            ]);
        } else {
            setSelectedOptions([
                ...selectedOptions,
                value
            ]);
        }
    }

    return (
        <>
            {
                options.map(opt => 
                    <SystemComponent height="40px" >
                        <Checkbox checked={selectedOptions.includes(opt)} handleClick={toggleOption} value={opt} />
                        <SystemComponent ml="45px" fontSize="16px" pt="2px">{opt}</SystemComponent>
                    </SystemComponent>
                )
            }
        </>
    );

}
export default CheckboxSection;