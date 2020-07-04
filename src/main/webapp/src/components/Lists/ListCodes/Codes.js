import React  from "react";
import classes from '../Lists.module.css'
import Code from "./Code";

const Codes =(props)=>{

    let codes;
    if(props.codes.length !== 0) {
        codes = props.codes.map(code => {
            return <Code
                name={code.name}
                surname={code.surname}
                code={code.code}
                album={code.album}
                key={code.album}
            />
        });
    } else{
        codes = <h4 className="mt-4 text-center">No codes to display yet.</h4>
    }

    return(
        <div className={classes.List}>
            {codes}
        </div>
    )
};

export default Codes;
