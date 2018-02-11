$(document).ready(function(){
    for(i = new Date().getFullYear(); i > 1900; i--) {
        $('#yearpicker').append($('<option />').val(i).text(i));
    }
    for(j = 1; j < 13; j++) {
        $('#monthpicker').append($('<option />').val(j).text(j));
    }
    for(k = 1; k < 32; k++) {
        $('#daypicker').append($('<option />').val(k).text(k));
    }
    var entries = ["Fraction", "Factorial", "Days", "Hours", "Minutes", "Seconds"];
    for(h = 0; h < entries.length; h++) {
      $('<option/>').val(entries[h]).text(entries[h]).appendTo('#formatpicker');
    }
    $("button").click(function() {
        var inp = $('#daypicker').val() + "/" + $('#monthpicker').val() + "/" + $('#yearpicker').val();
        var s_diff = getSecDiff(inp); //in milliseconds
        if(s_diff < 0) {
            $('#result').text("Error");
        }
        else if(s_diff == 0) {
            $('#result').text("Error");
        }
        else {
            var selection = $('#formatpicker').val();
            var spResult = '';
            switch(selection) {
                case 'Fraction':
                    spResult = getFractionFormat(s_diff);
                    break;
                case 'Factorial':
                    spResult = getFactorialFormat(s_diff);
                    break;
                case 'Days':
                    spResult = getDaysFormat(s_diff);
                    break;
                case 'Hours':
                    spResult = getHoursFormat(s_diff);
                    break;
                case 'Minutes':
                    spResult = getMinutesFormat(s_diff);
                    break;
                case 'Seconds':
                    spResult = ((s_diff/1000).toString() + ' seconds');
                    break;
            }
            $('#result').text("Age: " + spResult);
        }

    });

    function getFractionFormat(secs) {
        var d = Math.round(secs/(1000*60*60*24));
        var y = Math.floor(d/365);
        if((d % 365) > 0) {
            var m = Math.round((d % 365)/(365/12));
            return (y.toString() + ' ' + (new Fraction(m,12)).toString());
        }
        else {
            return (y.toString());
        }
    }

    function getFactorialFormat(secs) {
        var d = Math.round(secs/(1000*60*60*24));
        var y = Math.floor(d/365);
        var y_tmp = getBiggestFactorial(y);
        var str1 = ' years and ';
        var str2 = ' days';
        var y_str = y_tmp[0].toString() + '! (+' + y_tmp[1].toString() + ')';
        if((d % 365) > 0) {
            var d_rem = d % 365;
            var d_rem_tmp = getBiggestFactorial(d_rem);

            return (y_str + str1 + d_rem_tmp[0].toString() + '! (+' + d_rem_tmp[1].toString() + ') days');
        }
        else {
            return (y_str + ' years');
        }
    }

    function getDaysFormat(secs) {
        var daysform = Math.round(secs/(1000*60*60*24));
        return (daysform.toString() + ' days');
    }

    function getHoursFormat(secs) {
        var hoursform = Math.round(secs/(1000*60*60));
        return (hoursform.toString() + ' hours');
    }

    function getMinutesFormat(secs) {
        var minutesform = Math.round(secs/(1000*60));
        return (minutesform.toString() + ' minutes');
    }

    function parseDate(str) {
        //dd/mm/yyyy is parsed to yyyy/mm/dd
        var my_d = str.split('/');
        return new Date(my_d[2], my_d[1]-1, my_d[0]);
    }

    function getBiggestFactorial(nbr) {
        var factorial = [1, 2, 6, 24, 120, 720];
        var retval = 1;
        for(var i = 0; i<factorial.length; i++) {
            if(nbr >= factorial[i]) {
                retval = i;
            }
        }
        return [(retval+1), factorial[retval]];
    }

    function getSecDiff(inp_date) {
        var now = new Date();
        var utc_now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
        var usr_date = parseDate(inp_date);
        var dt = (utc_now - usr_date);
        return Math.round(dt);
    }
});
