import React from 'react'
import "./Alert.css" 

export const Alert = (props) => {

   

    const capitalize = (word)=>{
        if(word==='danger'){
            word='error'
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }

    return (
        <div style={{height:'50px'}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.msg)}</strong>:{props.alert.type}

                </div>}
            
        </div>
    )
}