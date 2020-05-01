const handleInputChange = (event, formToVal) => {

    const target = event.target;
    const value = target.value;
    const form = {...formToVal};
    const formElement = {...form[target.name]};

    formElement.value = value;
    formElement.validation.valid = checkValidity(formElement.value, formElement.validation);
    formElement.validation.touched = true;
    form[target.name] = formElement;

    let formValid=true;
    for (let input in form){
        formValid = form[input].validation.valid && formValid;
    }

    return {form, formValid};
};

const checkValidity=(value, rules)=>{
    let isValid = true;

    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
        isValid = value.trim().length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
        isValid = value.trim().length <= rules.maxLength && isValid;
    }
    return isValid;
};

export default handleInputChange;