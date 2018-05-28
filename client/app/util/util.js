    /**
     * To Format date in UTC Format
     * @param date
     * @returns {DateInUTCFormat}
     */
    export function generateUTCDateTime(date) {
        var d = new Date(date);
        return [d.getUTCFullYear(), utils.twoDigitDateFromat(parseInt(d.getUTCMonth(), 10) + 1), utils.twoDigitDateFromat(d.getUTCDate())].join("-");
    };

    /**
     * Formats date object in either of the following string formats:
     *      1. 2017-05-29 (if no or unsupported format argument is supplied)
     *      2. 29 May 2017 10:50 AM (if format argument 'dateTime' is supplied)
     * @param {Date or Date String} date if nothing is specified defaults to today's date, could also be ISO formatted Date string
     * @param {string} format specifies how to format the date string
     * @returns {string} formatted date string according to the format argument supplied
     */
    export function formatDate(date, format) {
        var d,month,day,year,dArr,time, translatedDate, options;
        d = date && new Date(date) || new Date();

        if (format === 'dateTime') {
            options = {day: '2-digit', month: 'short', year: 'numeric'};
            dArr = d.toString().split(' ');
            time = utils.get12HourTime(dArr[4]);
            translatedDate = utils.getLocaleTranslatedDate(d, options);
            if (translatedDate) {
                return translatedDate + ' ' + time;
            }
            else {
                return [dArr[2],dArr[1],dArr[3],time].join(' ');
            }
        }
            month = '' + (d.getMonth() + 1);
            day = '' + d.getDate();
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };


    /**
     * @ngdoc method
     * @name dateCorrectiontoUTC
     * @methodOf payUtilities
     * @description
     * This method will convert the date into date Object. 
     * It will also nullify the time offset and give a GMT zone for safari
     * @param (String) Date
     * @returns Date Object
     */

    export function dateCorrectiontoUTC(date) {
        var dateObject = new Date(date);
        if (browserDetectionService.browser == "safari") { 
            dateObject = (dateObject.getTime() ? new Date(dateObject.getTime() + dateObject.getTimezoneOffset() * 60000): false);
        }
        return dateObject;
        };

    export function get12HourTime(time) {
        if (!time) return;
        if (typeof time === 'string') {
            time = {
                value: time,
                separator: ':',
                showSeconds: false
            };
        }
        if (!time.value) { return; }
        if (!time.separator) { time.separator = ':'; }
        if (!time.showSeconds) { time.showSeconds = false; }
        var parts = (time.value.split(time.separator)).map(function(part) { return parseInt(part, 10); });
        var ampm = (parts[0] >= 12) ? 'PM' : 'AM' ;
        if (isNaN(parts[0]) || isNaN(parts[1]) || (time.showSeconds && isNaN(parts[2]))) { return; }
        parts[0] = (parts[0]%12 == 0) ? 12 : parts[0]%12;
        parts[2] = (parts.length > 2 && !isNaN(parts[2])) ? parts[2] : 0;
        parts = parts.map(function(part) {
            return ('0'+part).slice(-2);
        });
        return  '' +
                parts[0] + ':' +
                parts[1] +
                ( (time.showSeconds) ? (':' + parts[2]) : '' ) + ' ' +
                ampm;
    };
    /**
     * Creates a date Object from date String.
     *
     * @param {string} dateString can be of following formats MM/DD/YYYY, YYYY-MM-DDTHH:mm:ss
     * @return {Date} The date object.
     */
    export function getDateObj(dateString){
        var dateArray = dateString.split('/');
        if(dateArray.length ==1){
            dateArray = dateString.split('-');
            return new Date(dateArray[0],dateArray[1]-1,dateArray[2].replace(/(\d+)\D.*/, "$1"));
        }
        return new Date(dateArray[2],dateArray[0]-1,dateArray[1]);
    };

    /**
     * Returns locale translated Date string.
     *
     * @param {string} dateString can be of following formats MM/DD/YYYY, YYYY-MM-DDTHH:mm:ss
     * @param {string} format possible values are 'short' and 'long'; specifies long or short name of the weekday
     * @return {string} The locale translated date string is returned.
     */
    export function displayTranslatedDate(dateString, format, options) {
        var date, locale, options, weekName, translatedDate;
        date = utils.getDateObj(dateString);
        options = {weekday: 'long', month: 'short', day: '2-digit', year: 'numeric'};
        options.weekday = (format && ['short', 'default'].indexOf(format.toLowerCase())) ? 'short' : 'long';
        translatedDate = utils.getLocaleTranslatedDate(date, options);
        if(format === "default") {
            return translatedDate;
        }
        else if (format === 'short') {
            return date.toDateString().toUpperCase();
        } else if (format === 'basic') {
            if(translatedDate) {
                return utils.getLocaleTranslatedDate(date, {});  
            } else {
                return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/");
            }
        }
        else if (translatedDate) {
            return translatedDate.toUpperCase();
        }
        else {
            weekName = {
                "MON": "MONDAY",
                "TUE": "TUESDAY",
                "WED": "WEDNESDAY",
                "THU": "THURSDAY",
                "FRI": "FRIDAY",
                "SAT": "SATURDAY",
                "SUN": "SUNDAY"
            };
            return date.toDateString().toUpperCase().replace(/^([a-z]{3})\s+/i, function (match, p1) {
                return weekName[p1] + ' ';
            });
        }
    };

    /**
     * Returns locale translated date string if the Intl api is supported by the browser else it returns false indicating
     * date is not translatable
     *
     * @param {Date} date object which requires translation
     * @param {Object} options specifying what needs to be included in the string; Possible
     *                  format is {weekday:'', era:'', year:'',month:'',day:'',hour:'',minute:'',second:'',timeZoneName:''}
     *
     * @returns {String} locale translated date string
     * @returns {boolean} false if Intl api is not supported  by the browser
     */
    export function getLocaleTranslatedDate(date, options) {
        var locale;
        options = options || {weekday: 'long', month: 'short', day: '2-digit', year: 'numeric'};
        if ('Intl' in $window) {
            locale = appConfig.locale.language + '-' + appConfig.locale.country;
            return new Intl.DateTimeFormat(locale, options).format(date).replace(/,/g, '');
        }
        else {
            return false;
        }
    };

