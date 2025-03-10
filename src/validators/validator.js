import React from 'react'
import rules from './rules';

export default function validator(value,validations) {
    // console.log(rules);
    console.log(value,validations);
    let validationResult=[]
    for(let validator of validations){
        if(validator.value===rules.requiredValue){
            value.trim().length===0 && validationResult.push(false)
        }
        if(validator.value===rules.minValue){
            value.trim().length < validator.min && validationResult.push(false)
        }
        if(validator.value===rules.maxValue){
            value.trim().length > validator.max && validationResult.push(false)
        }
        if(validator.value===rules.emailValue){
            let emailTest=/^\w+([\.-]?\w)*@\w{3,6}\.\w{3,5}$/
            !emailTest.test(value) && validationResult.push(false)
        }

        
    }
    if(validationResult.length){
        return false
    }else{
        return true
    }
}
