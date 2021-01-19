

export const checkValidity=(value,rules)=>{
    let validity=true

    if(rules.required){
        validity= value.trim()!=="" && validity
    }
    if(rules.length){
        validity=validity && value.length===rules.length
    }
    if(rules.minlength){
        validity=validity && value.length>=rules.minlength
    }

    return validity
}