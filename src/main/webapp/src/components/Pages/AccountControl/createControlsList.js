const createObjectsList=(links, labels)=>{
    const objects = [];
    let object;

    for (let i = 0; i < links.length; i++) {
        object={link: links[i], label: labels[i]};
        objects.push(object);
    }
    return objects;
};

const addControlToList=(list, links, labels)=>{
    let objects = createObjectsList(links,labels);
    objects.forEach(object => list.push(object));
};

export default addControlToList;