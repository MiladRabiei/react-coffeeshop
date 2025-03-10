/* eslint-disable react/prop-types */

import React, { useEffect, useReducer } from 'react'
import validator from '../../validators/validator'
let inputReducer=(state,action)=>{
    switch(action.type){
        case "CHANGE":{
            return {
                ...state,
                value:action.value,
                isValid:validator(action.value,action.validations)
            }
        }
        default:{
                return state
            }
    }
    
}
export default function Input(props) {
    let[mainInput,dispatch]=useReducer(inputReducer,{
        value:props.value?props.value:"",
        isValid:props.value?validator(props.value,props.validations):false
    })
    console.log(props.pathname);
    useEffect(() => {
        if(props?.pathname){
            dispatch({
                type: 'CHANGE',
                value:'',
                validations:props.validations,
                isValid:false
              })
        }
      }, [props.value,props.pathname])

    let {value,isValid}=mainInput
    let {onInputHandler,id}=props
    useEffect(()=>{
        onInputHandler(id,value,isValid)
    },[value,id,isValid])
    
    let changeHandler=(event)=>{
        dispatch({
            type:'CHANGE',
            value:event.target.value,
            validations:props.validations,
            isValid:true
        })
    }
    let element=props.elem==="input"?(
        <input
         type={props.type}
         name={props.id}
         placeholder={props.placeholder}
         className={`${props.className+" text-zinc-700"} ${mainInput.value.length===0?"border-transparent":mainInput.isValid?" border-emerald-500":" border-red-500"}`}
         value={mainInput.value}
         onChange={(event)=>{
            if(props.type==="password"){
                props.onchange(event.target.value?true:false);
            }
            changeHandler(event)
         }}
         />
    ):(
        <textarea
        placeholder={props.placeholder}
        className={props.className}
        onChange={(event)=>changeHandler(event)}
        value={mainInput.value}
        name={props.id}
        >
        </textarea>
    )
  return (
    <>
    {element}
    </>
    
  )
}
