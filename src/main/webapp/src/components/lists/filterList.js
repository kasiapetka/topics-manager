const filterList =(value,condition,list)=>{
    let currentList = [];

    if (value !== "") {
        currentList = list;

        return currentList.filter(person => {
            let lc = '';
            if (condition === 'Email' && person.user)
                lc = person.user.email.toLowerCase();
            if (condition === 'Surname')
                lc = person.surname.toLowerCase();
            if (condition === 'Name')
                lc = person.name.toLowerCase();
            if (condition === 'Album')
                lc = person.album.toString();

            const filter = value.toLowerCase();
            return lc.includes(filter);
        });
    } else {
       return list;
    }
};

export default filterList;