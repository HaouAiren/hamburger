var Format = {
  dollar: function(price) {
    var formatString = '$#';
    var decimal = 2;
    var separator = ' ';
    var decpoint = '.';

    var r = parseFloat(price);

    var exp10 = Math.pow(10, decimal);// приводим к правильному множителю
    r = Math.round(r * exp10) / exp10;// округляем до необходимого числа знаков после запятой

    var rr = Number(r).toFixed(decimal).toString().split('.');

    var b = rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '1' + separator);

    r = (rr[1] ? b + decpoint + rr[1] : b);
    return formatString.replace('#', r);
  }
};
