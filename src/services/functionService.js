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

const formatDateLTS = (data) => {
    // input: Sat Jun 03 2023 07:00:00 GMT+0700 (Indochina Time)
    // output: 2023-06-03
    const [date, month, day, year, hour, gmt, region] = data.split(' ');
    var newmonth = '';
    switch (month) {
        case 'Jan':
            newmonth = '01';
            break;
        case 'Feb':
            newmonth = '02';
            break;
        case 'Mar':
            newmonth = '03';
            break;
        case 'Apr':
            newmonth = '04';
            break;
        case 'May':
            newmonth = '05';
            break;
        case 'Jun':
            newmonth = '06';
            break;
        case 'Jul':
            newmonth = '07';
            break;
        case 'Aug':
            newmonth = '08';
            break;
        case 'Sep':
            newmonth = '09';
            break;
        case 'Oct':
            newmonth = '10';
            break;
        case 'Nov':
            newmonth = '11';
            break;
        case 'Dec':
            newmonth = '12';
            break;
        default:
            break;
    }
    return `${year}-${newmonth}-${day}`;
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

const formatToPascalCase = (str) => {
    return str.replace(/\w+/g, function (w) {
        return w[0].toUpperCase() + w.slice(1).toLowerCase();
    });
};

const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const compareDateToNow = (date) => {
    const now = new Date();
    const compare = new Date(date);
    if (now < compare) {
        return true;
    } else {
        return false;
    }
};

// calculate needed date follow today date
const caculateFLDateMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const firstDateOfMonth = new Date(year, month - 1, 1);
    const lastDateOfMonth = new Date(year, month, 0);
    const firstMomentOfDay = new Date(year, month - 1, date, 0, 0, 0);
    const lastMomentOfDay = new Date(year, month - 1, date, 23, 59, 59);

    return {
        firstDateOfMonth: formatDateLTS(firstDateOfMonth + ''),
        lastDateOfMonth: formatDateLTS(lastDateOfMonth + ''),
        firstMomentOfDay: formatDateLTS(firstMomentOfDay + ''),
        lastMomentOfDay: formatDateLTS(lastMomentOfDay + ''),
    };
};

export {
    connectDate,
    formatMoney,
    formatDate,
    formatDateLTS,
    FormatDateTime,
    validateEmail,
    formatAccountType,
    formatToPascalCase,
    addDays,
    compareDateToNow,
    caculateFLDateMonth,
};
