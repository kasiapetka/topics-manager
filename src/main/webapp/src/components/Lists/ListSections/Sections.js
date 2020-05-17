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
                state={section.state}
                key={section.id}
                id={section.id}
                view={()=>props.viewSection(section)}
                edit={() => props.edit(section)}
                modify={() => props.modify(section)}
                delete={() => props.delete(section)}
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