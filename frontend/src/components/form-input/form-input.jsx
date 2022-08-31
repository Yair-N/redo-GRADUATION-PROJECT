import { React } from 'react';
import {InputGroup,
    Input,
    FormInputLabel,
    
} from './form-input.styles'



const FormInput = ( { label, ...otherProps }) => {



    return (

        <InputGroup>
            <Input {...otherProps} />
            {label && <FormInputLabel shrink = {otherProps.value.length > 0 && true} >
                {label}</FormInputLabel>}

        </InputGroup>
    )
}

export default FormInput
