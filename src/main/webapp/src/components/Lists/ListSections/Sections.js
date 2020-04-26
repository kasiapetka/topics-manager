import React  from "react";
import Section from "./Section";
import classes from '../Lists.module.css'

const Sections =(props)=>{

    let sections;
    if(props.sections.length !== 0) {
        sections = props.sections.map((section, index) => {
            return <Section
                name={section.name}
                size={section.sizeOfSection}
                topic={section.topic.name}
                subject={section.topic.subject.name}
                semester={section.semester.semester}
                state={section.isOpen}
                key={section.id}
                edit={() => props.edit(index)}
                delete={() => props.delete(index)}
            />
        });
    } else{
        sections = <h4 className="mt-4 text-center">No sections on this semester yet.</h4>
    }


    return(
        <div className={classes.List}>
            {sections}
        </div>
    )
};

export default Sections;