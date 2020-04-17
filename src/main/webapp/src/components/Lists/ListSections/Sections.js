import React , {useContext} from "react";
import Section from "./Section";
//import PersonsContext from "../../../context/listPersonsContext";

const Sections =()=>{

    const sectionsContext = useContext();

    return(
        sectionsContext.sections.map((section, index) => {
            return <Section
                name={section.name}
                size={section.size}
                topic={section.topic}
                semester={section.semester}
                key={section.id}
                edit={() =>sectionsContext.edit(index)}
                delete={() => sectionsContext.delete(index)}
            />
        })
    )
};

export default Sections;