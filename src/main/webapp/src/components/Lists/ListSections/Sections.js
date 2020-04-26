import React  from "react";
import Section from "./Section";
import classes from '../Lists.module.css'

const Sections =(props)=>{

    const sections = props.sections.map((section, index) => {
        return <Section
            name={section.name}
            size={section.sizeOfSection}
            topic={section.topic.name}
            subject={section.topic.subject.name}
            semester={section.semester.semester}
            state={section.isOpen}
            key={section.id}
            edit={() =>props.edit(index)}
            delete={() => props.delete(index)}
        />
    });

    return(
        <div className={classes.List}>
            {sections}
        </div>
    )
};

export default Sections;