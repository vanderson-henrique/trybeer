const convertDate = (obj) => {
    const strDate = obj.sale_date.toString();
    const newObj = obj;
    const values = Object.values(obj);
    const keys = Object.keys(obj);
    const date = new Date(strDate);
    // const month = date.getMonth() + 1;
    const month = (`0${(date.getMonth() + 1)}`).slice(-2);
    const day = strDate.split(' ')[2];
    const newDate = `${day}/${month}`;
    values[1] = newDate;
    keys.forEach((key, index) => {
        newObj[key] = values[index];
    });

    return newObj;
};

module.exports = convertDate;