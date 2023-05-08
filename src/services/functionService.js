const formatMoney = (amount, decimalCount = 2, decimal = '.', thousands = ',') => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? '-' : '';

        let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
            (decimalCount
                ? decimal +
                  Math.abs(amount - i)
                      .toFixed(decimalCount)
                      .slice(2)
                : '')
        );
    } catch (e) {
        console.log(e);
    }
};

const formatDate = (date, inputType = 'yyyy-MM-dd', outputType = 'dd/MM/yyyy') => {
    const [year, month, day] = date.split('-');
    return outputType.replace('yyyy', year).replace('MM', month).replace('dd', day);
};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};

const connectDate = (date, month, year) => {
    return `${year}-${month}-${date}`;
};

const FormatDateTime = (datetime) => {
    const [date, time] = datetime.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');
    const newhour = parseInt(hour) + 7;
    return `${newhour}:${minute}:${second} ${day}/${month}/${year}`;
};

const formatAccountType = (type) => {
    switch (type) {
        case '1':
            return 'Admin';
        case '0':
            return 'User';
        default:
            return 'Unknown';
    }
};

export { connectDate, formatMoney, formatDate, FormatDateTime, validateEmail, formatAccountType };
