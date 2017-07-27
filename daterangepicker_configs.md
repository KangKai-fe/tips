## date range picker configuration and localization based on metronic template

### import scripts and styles

``` html
...
<link rel="stylesheet" type="text/css" href="../assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css"/>

...
<script type="text/javascript" src="../assets/global/plugins/bootstrap-daterangepicker/moment.min.js"></script>
<script type="text/javascript" src="../assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
```

### html structure

``` html
 <div class="form-group">
	<label class="col-xs-2 control-label">date range</label>
	<div class="input-group date-picker input-daterange col-xs-10">
		<input type="text" class="form-control" name="from">
		<span class="input-group-addon">-</span>
		<input type="text" class="form-control" name="to">
	</div>
</div>
```

### configs

``` javascript
if ($('.date-picker') && $('.date-picker').daterangepicker) {
  $('.date-picker').daterangepicker({
    format: 'YYYY-MM-DD HH:mm',
    startDate: moment().subtract(30, 'days'),
    endDate: moment(),
    minDate: '2012-01-01',
    maxDate: '2018-12-31',
    timePicker: true,
    timePicker24Hour: true,
    timePicker12Hour: false,
    timePickerIncrement: 5,
    locale: {
      // format: 'YYYY-MM-DD HH:mm',
      applyLabel: '确定',
      cancelLabel: '取消',
      fromLabel: '起始时间',
      toLabel: '结束时间',
      customRangeLabel: '自定义',
      daysOfWeek : ["日", "一", "二", "三", "四", "五", "六"],
      monthNames : ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月 "],
      firstDay : 1
    },
    ranges: {
      '今天': [moment().startOf('day'), moment().endOf('day')],
      '昨天': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
      '近7天': [moment().subtract(7, 'days').startOf('day'), moment().endOf('day')],
      '本月': [moment().startOf('month').startOf('day'), moment().endOf('day')],
    }

  },
  function (start, end) {
    $('.date-picker input[name="from"]').val(start.format('YYYY-MM-DD HH:mm'));
    $('.date-picker input[name="to"]').val(end.format('YYYY-MM-DD HH:mm'));
  });
}
```
