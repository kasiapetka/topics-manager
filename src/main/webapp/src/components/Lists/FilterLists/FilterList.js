const handleChange = (event, condition, list) => {
    const target = event.target;
    const value = target.value;
    let newList;
    newList = filterList(value, condition, list);
    return {newList, value};
};

const filterList =(value,condition,list)=>{
    let currentList = [];

    if (value !== "") {
        currentList = list;

        return currentList.filter(item => {
            let lc = '';
            if (condition === 'Email' && item.user)
                lc = item.user.email.toLowerCase();
            if (condition === 'Surname')
                lc = item.surname.toLowerCase();
            if (condition === 'Name')
                lc = item.name.toLowerCase();
            if (condition === 'Album')
                lc = item.album.toString();

            const filter = value.toLowerCase();
            return lc.includes(filter);
        });
    } else {
       return list;
    }
};

export default handleChange;