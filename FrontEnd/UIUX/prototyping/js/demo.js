"use strict";

// 
// demo用: 調用url的param
// 
function parse_query_string(query) {
  if (query[0] === '?') {
    query = query.slice(1);
  }
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

function parse_url_filename() {
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/') + 1);

  return filename;
}

$.fn.getSize = function () {
  var $wrap = $(this).clone();
  $wrap.css({
    "position": "absolute !important",
    "visibility": "hidden !important",
    "display": "block !important",
    "bottom": '0 !important"'
  });

  var $clone = $(this).after($wrap);

  var sizes = {
    "width": $clone.width(),
    "height": $clone.height()
  };

  $wrap.remove();

  return sizes;
};

// function customerDataTab() {
//   // var query_string = "a=1&b=3&c=m2-m3-m4-m5"; // location.search
//   // var parsed_qs = parse_query_string(query_string);
//   // console.log(parsed_qs.c);
//   var query = parse_query_string(location.search);
//   // console.log(query.tab)
//   if (query.tab === 'asset') {
//     $('[id="toggle-asset-tab"]').tab('show');
//     $('[name="toggle-asset-tab"]').addClass('active');
//   }
// }
function fnSelectpicker() {
  $('.selectpicker').selectpicker({
    style: 'inputstyleSelect'
  });
}

function datePickers() {
  // clockpicker
  $('input[name=clockpicker]').clockpicker({
    autoclose: true
  });

  // daterange 
  var year = new Date().getFullYear() + 100;

  $('input[name="daterange"]').daterangepicker({
    "locale": {
      "format": "YYYY/MM/DD",
      "separator": " - ",
      "applyLabel": "確認",
      "cancelLabel": "清除",
      "fromLabel": "From",
      "toLabel": "To",
      "customRangeLabel": "Custom",
      "weekLabel": "W",
      "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
      "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      "firstDay": 0
    },
    autoUpdateInput: false,
    showDropdowns: true
    // maxDate: '12/31/' + year
  });
  $('input[name="daterange"]').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('YYYY/MM/DD') + ' - ' + picker.endDate.format('YYYY/MM/DD'));
  });
  $('input[name="daterange"]').on('cancel.daterangepicker', function (ev, picker) {
    $(this).val('');
  });
  /**/
  // singedate
  $('input[name="singledate"]').daterangepicker({
    "locale": {
      "format": "YYYY/MM/DD",
      "separator": " - ",
      "applyLabel": "確認",
      "cancelLabel": "清除",
      "fromLabel": "From",
      "toLabel": "To",
      "customRangeLabel": "Custom",
      "weekLabel": "W",
      "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
      "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      "firstDay": 0
    },
    singleDatePicker: true,
    autoUpdateInput: false,
    showDropdowns: true
    // maxDate: '12/31/' + year
  });
  $('input[name="singledate"]').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('YYYY/MM/DD'));
  });
  $('input[name="singledate"]').on('cancel.daterangepicker', function (ev, picker) {
    $(this).val('');
  });
}

function modalBodyClass() {
  // fix two step modal problem
  $(document).on('shown.bs.modal', '.modal', function () {
    $(document.body).addClass('modal-open');
  });
  $(document).on('hidden.bs.modal', '.modal', function () {
    $(document.body).removeClass('modal-open');
  });
}

function selectChange() {
  $("select").on("changed.bs.select", function (e, clickedIndex, newValue, oldValue) {
    if (this.value == '其他保險(非儲蓄險、房貸壽險)') {
      $('#select_option').removeClass('displayno');
    } else {
      $('#select_option').addClass('displayno');
    }
  });
}

function custSelectChange() {
  // <select id="source" class="selectpicker inputstyleSelect">
  //   <option value="" class="displayno">請選擇...</option>
  //   <option value="">主動進線</option>
  //   <option value="customerIntro">顧客介紹</option>
  // </select>
  // <div data-select-from='{"source": "customerIntro"}'
  //   class="form-group displayno"> ......
  $("select").on("changed.bs.select", function (e, clickedIndex, newValue, oldValue) {
    if (this.id) {
      var selectedId = this.id,
          selectedValue = this.value;
      // console.log(this.id, this.value)
      $('[data-select-from]').each(function (idx, i) {
        var dataFrom = $(i).data('selectFrom');
        // console.log($(i).data(), idx, dataFrom[selectedId], selectedValue)
        if (dataFrom[selectedId] === selectedValue) {
          $(i).removeClass('displayno');
        } else {
          $(i).addClass('displayno');
        }
      });
    }
  });
}

function custBootstrapSelect() {
  $('.selectpicker--select-all').each(function (i, e) {
    var opts = $(this).clone().html().trim();
    var html = "\n        <optgroup data-select-ctrl data-max-options=\"1\">\n          <option value=\"\u5168\u9078\">\u5168\u9078</option>\n          <option value=\"\u53D6\u6D88\u5168\u9078\">\u53D6\u6D88\u5168\u9078</option>\n        </optgroup>\n        <optgroup>\n          " + opts + "\n        </optgroup>\n      ";
    // console.log(opts, html);
    $(this).empty().append(html);

    $(this).addClass('selectpicker').attr('multiple', true).attr('data-select-all', true).val('').selectpicker('render');
  });
  $('.selectpicker--select-all').on('changed.bs.select', function (event, clickedIndex, newValue, oldValue) {
    var allValueList = [];

    $(this).find('option:not([value="全選"]):not([value="取消全選"])').each(function (i, e) {
      allValueList.push(this.value);
    });

    if ($(this).find(':selected[value="全選"]').length > 0) {

      $(this).selectpicker('val', [].concat(allValueList)).selectpicker('toggle').selectpicker('toggle');

      $(this).next('button').next('.dropdown-menu').find('li.optgroup-1:not(.dropdown-header):first').addClass('selected');
    }

    if ($(this).find(':selected[value="取消全選"]').length > 0) {
      $(this).selectpicker('deselectAll');
      $(this).next('button').next('.dropdown-menu').find('li.optgroup-1:not(.dropdown-header):last').addClass('selected');
    }

    if (allValueList.length !== $(this).find('option:selected').length) {
      $(this).next('button').next('.dropdown-menu').find('li.optgroup-1:not(.dropdown-header):first').removeClass('selected');
    }

    // console.log(event, clickedIndex, newValue, $(this).find(':selected'), oldValue);
  }).on('shown.bs.select', function (params) {
    var allValueList = [];

    $(this).find('option:not([value="全選"]):not([value="取消全選"])').each(function (i, e) {
      allValueList.push(this.value);
    });
    if (allValueList.length === $(this).find('option:selected').length) {
      $(this).next('button').next('.dropdown-menu').find('li.optgroup-1:not(.dropdown-header):first').addClass('selected');
    }
  });
}

function stickInfo(preTarget) {
  $('.nav-pills').on('shown.bs.tab', 'a', function (e) {
    var shouldScrollTop = $(preTarget).attr('href') == $(e.target).attr('href') ? false : true;
    if (preTarget) {
      $(preTarget).removeClass('active');
    }
    preTarget = e.target;

    var topElHeight = $('.top-container').height() + 10;
    var id = $(this).attr('name');
    if (id) {
      $('html, body').animate({
        scrollTop: $('#' + id).offset().top - topElHeight
      }, 500);
    } else if (shouldScrollTop) {
      $('html, body').scrollTop(0);
    }
  });
}

function scrollToTop() {
  $('html, body').animate({
    scrollTop: 0
  }, 'slow');
}

// sidebar toggle
function toggle() {
  var id = window.getSidebarId();
  var width = document.getElementById(id).style.width;

  if (width === "180px" || width === "") {
    closeSidebar(id);
  } else {
    openSidebar(id);
  }
}

function openSidebar(id) {
  document.getElementById(id).style.width = "180px";
  document.getElementById("main-content").style.marginLeft = "180px";
  $('.top-container').css('width', '100%').css('width', '-=180px');
  $('button.btn.openClose i').removeClass('fa-caret-right').addClass('fa-caret-left');
}

function closeSidebar(id) {
  document.getElementById(id).style.width = "0px";
  document.getElementById("main-content").style.marginLeft = "0px";
  $('.top-container').css({
    width: '100%'
  });
  $('button.btn.openClose i').removeClass('fa-caret-left').addClass('fa-caret-right');
}

function chooseAll(toggle, id) {
  $(id).find('.dropdown-menu.dropdown-menu-stop').children().each(function () {
    $(this).find('input').prop('checked', toggle);
    $(this).find('input').trigger('change');
  });
}

function resizeCloseSidebar() {
  $(window).on('resize', function () {
    var window_width = $(window).width();
    if (window_width <= 1024) {
      closeSidebar(window.getSidebarId());
    }
  });
}

function scrollEvent(wrap) {
  wrap.on("scroll", function (e) {
    var scrollTop = this.scrollTop || $(this).scrollTop();
    if (scrollTop > 138) {
      $('.pills-tab-container').addClass("fix-tab");
      $("#scroll-top").removeClass('displayno');
      $('.nav-item.dropdown.more').addClass('show-more');
    } else {
      $('.pills-tab-container').removeClass("fix-tab");
      $("#scroll-top").addClass('displayno');
      $('.nav-item.dropdown.more').removeClass('show-more');
    }
  });
}
// collapse
function collapse(self, show_icon_class, hide_icon_class) {
  var id = $(self).attr('name');
  $('#' + id).collapse('toggle');

  // collapse trigger
  var trigger = id + '_show';
  if (!this.hasOwnProperty(trigger)) {
    var defaultTrigger = $('#' + id).hasClass('show');
    this[trigger] = defaultTrigger;
  } else {
    this[trigger] = !this[trigger];
  }

  // icon transfer
  var icon_id = '#' + id + '_icon';
  if (this[trigger]) {
    $(icon_id).removeClass(hide_icon_class).addClass(show_icon_class);
  } else {
    $(icon_id).removeClass(show_icon_class).addClass(hide_icon_class);
  }
}
function setPaddingTop() {
  var topHeight = $('.top-container').outerHeight();
  $('#pills-tabContent').css('padding-top', topHeight + 'px');
}

// sidebar - start -
function initSidebar() {
  var id = window.getSidebarId();
  switch (id) {
    case 'agent_sidebar':
      $('#manager_sidebar').css('display', 'none');
      $('#admin_sidebar').css('display', 'none');
      break;
    case 'manager_sidebar':
      $('#agent_sidebar').css('display', 'none');
      $('#admin_sidebar').css('display', 'none');
      break;
    case 'admin_sidebar':
      $('#manager_sidebar').css('display', 'none');
      $('#agent_sidebar').css('display', 'none');
      // 因為當初設定的參數不夠多 如果同時顯示的話主管跟一般權限的sidebar active都會一起亮 所以這邊要remove非當前的sidebar active項目
      if ($('#admin_sidebar .nav-link.active').length > 1) {
        $('#admin_sidebar .nav-link.active').each(function (i, e) {
          var linkHref = $(e).attr('href').replace(location.search, '').replace('/', '');
          var currentPathname = location.pathname.replace(location.search, '').replace('/', '');
          if (linkHref !== currentPathname) {
            $(e).removeClass('active');
          }
        });
      }
      break;
    default:
      break;
  }
}

function getAcct() {
  var acct = 'admin';
  var session = sessionStorage.getItem('acct');

  if (session) {
    if (session === 'agent' || session === 'manager') {
      acct = session;
    }
  }
  // M_頁面, Demo用強制為manager權限
  // if (parse_url_filename().indexOf('M_') === 0) {
  //   acct = 'manager';
  // }
  return acct;
}

function getSidebarId() {
  return window.getAcct() + '_sidebar';
}
// sidebar -  end  -

// 滿版畫面 trigger
function openNav(target) {
  target = target || '#mySidenav';
  $(target).css('margin-right', '0px');

  // 沒有overlay的化加進去
  if ($('.modal-background').length === 0) {
    $(target).before('<div class="modal-background displayno"></div>');
  }

  $('.modal-background').removeClass('displayno');
  $('body').addClass('modal-open');
}

function closeNav(target) {
  target = target || '#mySidenav';
  $(target).css('margin-right', '-100%');
  $('.modal-background').addClass('displayno');
  $('body').removeClass('modal-open');
  $(target).trigger('hidden.bs.modal');
}

function initNav() {
  window.getAcct() === "manager" || window.getAcct() === "admin" && parse_url_filename().indexOf('M_') === 0 ? $('#salesJob').removeClass('displayno') : null;
}

function loadingHTML() {
  return "<div class=\"sk-fading-circle\">\n    <div class=\"sk-circle1 sk-circle\"></div>\n    <div class=\"sk-circle2 sk-circle\"></div>\n    <div class=\"sk-circle3 sk-circle\"></div>\n    <div class=\"sk-circle4 sk-circle\"></div>\n    <div class=\"sk-circle5 sk-circle\"></div>\n    <div class=\"sk-circle6 sk-circle\"></div>\n    <div class=\"sk-circle7 sk-circle\"></div>\n    <div class=\"sk-circle8 sk-circle\"></div>\n    <div class=\"sk-circle9 sk-circle\"></div>\n    <div class=\"sk-circle10 sk-circle\"></div>\n    <div class=\"sk-circle11 sk-circle\"></div>\n    <div class=\"sk-circle12 sk-circle\"></div>\n  </div>";
}

function customerDebitLoadMore(_ref) {
  var _this2 = this;

  var count = _ref.count,
      replaceText = _ref.replaceText;

  count = count || 10;
  var cloneHTML = $(this).closest('.card').find('tbody tr:first-child').html();
  var returnHTML = '';
  // console.log(replaceText, count);

  // add loading ...
  if ($(this).closest('.card').find('.card-loading').length === 0) {
    $(this).closest('.card').css('position', 'relative').append('<div class="card-loading"><div class="card-loading-icon">' + loadingHTML() + '</div></div>');
  }

  // before load data, add block
  $(this).closest('.card').find('.card-loading').addClass('active');

  for (var i = 0; i < count; i++) {
    if (replaceText) {
      var re = new RegExp(replaceText, 'g');
      cloneHTML = cloneHTML.replace(re, replaceText + '_' + i);
    }
    returnHTML += '<tr>' + cloneHTML + '</tr>';
  }

  // show that the end of loading data
  setTimeout(function () {
    $(_this2).closest('.card').find('.card-loading').removeClass('active');
    $(_this2).closest('.card').find('tbody').append(returnHTML);
  }, 3000);
}

function noticeRead(element) {
  if (element) {
    $(element).closest('li').addClass('read');
  } else {
    $('.notice-board .panel-body > ul > li').addClass('read');
  }
  return false;
}

function GlobalSearchKey(value, timeout, data) {
  this.timeout = timeout || '';
  this.value = value || '';
  this.data = data || [];
  this.selectList = [];
  this.target = '';
}
GlobalSearchKey.prototype.keyup = function (event, target) {
  var _this = this;
  this.target = target;
  console.log(event.which, event.keyCode);
  if (event.which === 27) return;

  this.timeout = setTimeout(function () {
    _this.value = target.value;
    _this.selectList = function () {
      if (!$.isEmptyObject(_this.data) && $.trim(_this.value) !== '') {
        return _this.data.filter(function (item) {
          var path = $.trim(item.path.toLocaleUpperCase()),
              title = $.trim(item.title.toLocaleUpperCase()),
              breadcrumb = $.trim(item.breadcrumb.toLocaleUpperCase()),
              val = $.trim(_this.value.toLocaleUpperCase());
          return path.indexOf(val) !== -1 || title.indexOf(val) !== -1 || breadcrumb.indexOf(val) !== -1;
        });
      } else {
        return [];
      }
    }();
    var drawDropdown = function drawDropdown() {
      var optionHTML = '',
          dropdownHTML = '';
      $.each(_this.selectList, function (i, e) {
        // optionHTML += '<option data-subtext="' + e.breadcrumb + '">' + e.title + '</option>';
        var path = e.path.replace('taTo=autocomplete', 'taTo=' + encodeURIComponent(e.title));
        dropdownHTML += '<a class="dropdown-item" href="' + path + '">' + e.title + ' <small class="text-muted">' + e.breadcrumb + '</small></a>';
      });
      $(target).siblings('.global-search-select').html(dropdownHTML);

      if ($.isEmptyObject(_this.selectList)) {
        $(target).siblings('.global-search-select').removeClass('show');
      } else {
        $(target).siblings('.global-search-select').addClass('show');
      }
    };
    drawDropdown();

    if (event.which === 40 && !$.isEmptyObject(_this.selectList)) {
      $(_this.target).siblings('.global-search-select').find('a:first-child').focus();
    }
  }, 100);
};
GlobalSearchKey.prototype.getData = function () {
  var _this = this;
  $.ajax('./js/searchRoutes.json').then(function (data) {
    _this.data = data;
  });
};
GlobalSearchKey.prototype.close = function () {
  var _this = this;

  $(document).on('click', function (e) {
    var container = $(_this.target).siblings('.global-search-select');

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass('show');
    }
  });

  $(document).on('keyup', _this.target, function (e) {
    if (e.which === 27) {
      $(_this.target).siblings('.global-search-select').removeClass('show');
    }
  });
};
GlobalSearchKey.prototype.getTarget = function () {
  return this.target;
};
GlobalSearchKey.prototype.listKeyCtrl = function () {
  var _this = this;
  $(document).on('keyup', _this.target, function (e) {
    var activeItem = $(_this.target).siblings('.global-search-select').find('a:focus');
    var firstItem = $(_this.target).siblings('.global-search-select').find('a:first-child');
    var lastItem = $(_this.target).siblings('.global-search-select').find('a:last-child');

    if (activeItem) {
      if (e.which === 40 && activeItem.text() !== lastItem.text()) {
        activeItem.next().focus();
      }
      if (e.which === 38 && activeItem.text() !== firstItem.text()) {
        activeItem.prev().focus();
      }
      if (e.which === 38 && activeItem.text() === firstItem.text()) {
        $(_this.target).focus();
      }
    }
  });
};
var gSearch = new GlobalSearchKey();

function showActiveItem() {
  var query = parse_query_string(location.search);
  // console.log(query.tab)
  // if (query.tab === 'asset') {
  if (query.tab || query.modal || query.cModal || query.taTo || query.meetToTag) {
    setTimeout(function () {
      // modal
      if (query.modal && $('[id="' + query.modal + '"]').hasClass('modal')) {
        $('[id="' + query.modal + '"]').modal('show');
        // remove additional bg
        if ($('.modal-backdrop.show').length > 1) {
          $('.modal-backdrop.show').last().remove();
        }
      }
      // tab
      if (query.tab && query.tab === 'asset') {
        $('[id="toggle-asset-tab"]').tab('show');
        $('[name="toggle-asset-tab"]').addClass('active');
      }
      if (query.tab && $('[href="#' + query.tab + '"]').attr('data-toggle') === 'pill') {
        // console.log($('[href="' + query.tab + '"]'), $('[href="' + query.tab + '"]').attr('id'))
        $('#' + $('[href="#' + query.tab + '"]').attr('id')).tab('show');
      }
    }, 100);

    // autocomplete data
    if (query.taTo) {
      $('#globalSearchText').val(query.taTo);
    }

    // 5/30 跟tammy確定無此需求
    if (query.meetToTag) {
      // $('#meetdateTag').removeClass('displayno');
    }
  }
}

function mdCreateSysSetOpen() {
  $('#modalCreateSysSetting').on('shown.bs.modal', function () {
    if ($(this).hasClass('under-review')) {
      return;
    }
    var nowVal = $(this).find('[name="sysItemName"]:first').val();
    // console.log(this, nowVal);
    $(this).find('[name="sysItemNameOri"]:first').val(nowVal);
  });
}

function mdCreateSysSetClick() {
  $('#modalCreateSysSetting [data-submit="true"]').on('click', modalCreateSysSettingSubmit);
}

function modalCreateSysSettingSubmit(e) {
  e.preventDefault();
  // console.log(e);
  var code = $(e.target).closest('.modal').find('[name="sysItemCode"]:first').val();
  var label = $(e.target).closest('.modal').find('[name="sysItemName"]:first').val();
  var id = $(e.target).closest('.modal').find('[name="sysItemFrom"]:first').val();
  // 
  var labelOri = $(e.target).closest('.modal').find('[name="sysItemNameOri"]:first').val();
  console.log(code, label, $(e.target).data('edit'), id, labelOri);
  if (code && label) {

    // edit
    if ($('#modalCreateSysSetting').hasClass('modal-edit') && id && labelOri) {
      $('[data-toggle="list"][href="' + id + '"]').html(label);
      $('[data-toggle="list"][href="' + id + '"]').closest('li').find('.edit-title:first').addClass('under-review-edit').attr('onclick', "modalCreateSysSettingEditUnderReview('" + id + "', '" + code + "', '" + label + "', '" + labelOri + "')");
    }
    // create new one
    else {
        var newId = $('#sysSidebar>li').length;
        $('#sysSidebar').append("\n        <li>\n          <a role=\"tab\" data-toggle=\"list\" class=\"\" href=\"#sysSidebar_" + newId + "\">" + label + "</a>\n          <a title=\"\u7DE8\u8F2F\u6A19\u984C\" class=\"edit-title\" href=\"javascript: void(0);\" \n            onclick=\"modalCreateSysSettingEdit(\n              '#sysSidebar_" + newId + "', '" + code + "', '" + label + "')\">\n              <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n          </a>\n        </li>");
      }
  }
}

function modalCreateSysSettingEdit(id, code, label) {
  if (id && code && label) {
    $('#modalCreateSysSetting [name="sysItemCode"]:first').val(code).prop('readonly', true);
    $('#modalCreateSysSetting [name="sysItemFrom"]:first').val(id);
    $('#modalCreateSysSetting [name="sysItemName"]:first').val(label).prop('readonly', false);
    $('#modalCreateSysSetting [name="sysItemOri"]:first').val(label);
    $('#modalCreateSysSetting').addClass('modal-edit').modal('show');
  }
}

function modalCreateSysSettingEditUnderReview(id, code, label, labelOri, type) {
  $('#modalCreateSysSetting [name="sysItemCode"]:first').val(code).prop('readonly', true);
  $('#modalCreateSysSetting [name="sysItemName"]:first').val(label).prop('readonly', true);
  $('#modalCreateSysSetting [name="sysItemFrom"]:first').val(id);
  $('#noticeSysItemName .before').html(labelOri);
  $('#noticeSysItemName .after').html(label);
  if (type === 'review') {
    $('#modalCreateSysSetting').addClass('modal-m-review');
  }
  $('#modalCreateSysSetting').removeClass('modal-edit').addClass('modal-under-review').modal('show');
}
function modalCreateSysSettingEditReview(isOk) {
  var val = $('#modalCreateSysSetting [name="sysItemFrom"]:first').val() || $('#modalCreateSysItemSettingEdit [name="sysItemFrom"]:first').val();
  if (isOk) {
    if (val === 'sysSidebar_1') {
      $('#sysSidebar1_1_0_item_1').html("\n        <button class=\"btn btn-outline-primary btn-sm mt-2\" onclick=\"modalCreateSysItemSetting.edit(this, '123')\" type=\"button\">\u6AA2\u8996</button>\n      ");
      $('[href=\'#sysSidebar_1\']').removeClass('under-review-title');
      $('#modalAgree').modal('show');
      return;
    }
    $('[href="#sysSidebar_3"]').next('a').addClass('displayno');
  } else {
    $('#modalSysBack').find('[name="sysItemFrom"]:first').val(val);

    $('#modalSysBack').modal('show');
  }
}
function modalCreateSysSettingClose() {
  $('#modalCreateSysSetting').on('hidden.bs.modal', function () {
    $(this).removeClass('modal-m-review').removeClass('modal-under-review').removeClass('modal-edit');
    $(this).find('[name="sysItemCode"]:first').val('').prop('readonly', false);
    $(this).find('[name="sysItemName"]:first').val('').prop('readonly', false);
    $(this).find('[name="sysItemFrom"]:first').val('');
    $(this).find('[name="sysItemNameOri"]:first').val('');
  });
}

var modalCreateSysItemSetting = {};
modalCreateSysItemSetting.create = function (ele) {
  // console.log(ele,123)
  var name = $(ele).closest('.modal').find('[name="sysItemName"]').val();
  var code = $(ele).closest('.modal').find('[name="sysItemCode"]').val();
  var val = $(ele).closest('.modal').find('[name="sysItemValue"]').val();
  var nextly = $(ele).closest('.modal').find('[name="hasNextLayer"]').prop('checked');
  var rand = Math.random() * 200;
  var li = "\n        <li>\n          <a role=\"tab\" data-toggle=\"list\" class=\"list-title\" href=\"#sysSidebar_1000\">" + name + "</a>\n        </li>";
  var activeTarget = '#' + $('#pills-tabContent .tab-pane.show.active [id^="sysSidebar"].active').attr('id');
  console.log(name, code, val, nextly, activeTarget);
  if (!name || !activeTarget) {
    return;
  }

  if (nextly) {
    console.log(activeTarget);
    var newCollapseListId = 'listCollapse_sysSidebar_' + Math.random() * 300;
    if ($('[href="' + activeTarget + '"]').closest('li').find('ul').length === 0) {
      $('[href="' + activeTarget + '"]').closest('li').find('a:first').addClass('list-collapse').attr('data-list-collapse-target', '#' + newCollapseListId);

      $('[href="' + activeTarget + '"]').closest('li').append('<ul clas="collapse show" id="' + newCollapseListId + '"></ul>');
    }
    $('[href="' + activeTarget + '"]').closest('li').find('ul').append(li);
  }

  $(activeTarget).find('form').append("\n    <div class=\"form-group row\">\n      <div class=\"col-4\">\n        <label class=\"col-form-label\">" + name + "</label>\n      </div>\n      <div class=\"col-4\">\n        <input class=\"form-control inputstyle\" placeholder=\"\u8ACB\u8F38\u5165...\" value=\"" + val + "\" readonly=\"readonly\">\n      </div>\n      <div class=\"col-4\">\n        <div id=\"" + activeTarget.replace('#') + "_item_" + ($(activeTarget).find('.form-group').length + 1) + "\">\n          <a id=\"\" href=\"javascript: void(0);\" onclick=\"modalCreateSysItemSetting.edit(this)\" class=\"greenLink\">\n            <i class=\"fa fa-pencil col-form-label\" aria-hidden=\"true\"></i>\n          </a>\n        </div>\n      </div>\n    </div>\n  ");
};
modalCreateSysItemSetting.edit = function (editTarget, ta2) {
  if (ta2 === '123') {
    $('#modalCreateSysItemSettingEdit').addClass('modal-123');
  } else {
    $('#modalCreateSysItemSettingEdit').addClass('modal-edit');
  }

  $('#modalCreateSysItemSettingEdit [name="sysItemFrom"]').val($(editTarget).closest('div').attr('id'));

  if (ta2 === 'dropD') {
    $('#modalCreateSysItemSettingEdit [data-id="referValue"]').addClass('displayno');
  } else if (ta2 === '123') {
    $('#modalCreateSysItemSettingEdit input').each(function (idx, e) {
      $(this).prop('disabled', true);
    });
  }
  $('#modalCreateSysItemSettingEdit').modal('show');
};
modalCreateSysItemSetting.editSubmit = function () {
  // 此狀態下如果有送出則一定會是待審核
  $('#modalCreateSysItemSettingEdit [type="submit"]').on('click', function () {
    if ($('#modalCreateSysItemSettingEdit').hasClass('modal-under-review') || $('#modalCreateSysItemSettingEdit').hasClass('modal-123')) {
      return;
    }
    var dataFrom = $('#modalCreateSysItemSettingEdit [name="sysItemFrom"]').val();
    var sidebarFrom = $('#' + dataFrom).closest('.tab-pane.active').attr('id');
    $('[data-toggle="list"][href="#' + sidebarFrom + '"]').addClass('under-review-title');
    // console.log('[data-toggle="list"][href="#' + sidebarFrom + '"]')

    $('#' + dataFrom).closest('.form-group').find('[input]').val($('#modalCreateSysItemSettingEdit [name="sysItemValue"]').val());

    $('#' + dataFrom).closest('.form-group').find('.fa-ban').addClass('displayno');
    console.log(dataFrom);
    $('#' + dataFrom + ' a:first-child').addClass('displayno');
    if ($('#' + dataFrom).find('.view-list').length === 0) {
      $('#' + dataFrom).html("\n          <label class=\"col-form-label\"><span class=\"tag square red\">\u5F85\u8986\u6838</span></label>\n          <div class=\"btn-group\">\n            <button class=\"btn btn-outline-primary btn-sm\" type=\"button\" data-toggle=\"modal\"\n              data-target=\"#modalCreateSysItemSettingEdit\" onclick=\"\n              $('#modalCreateSysItemSettingEdit').addClass('modal-under-review').find('input').each(function(){$(this).prop('readonly', true);});\n              $('#modalCreateSysItemSettingEdit [data-id='+'referValue'+']').addClass('displayno');\">\n                \u6AA2\u8996\n            </button>\n          </div>\n        ");
    }
  });
};
modalCreateSysItemSetting.close = function () {
  $('#modalCreateSysItemSetting').on('hidden.bs.modal', function () {
    $('#modalCreateSysItemSetting [name="sysItemName"]').val('');
    $('#modalCreateSysItemSetting [name="sysItemFrom"]').val('');
    $('#modalCreateSysItemSetting [name="sysItemValue"]').val('');
    $('#modalCreateSysItemSetting [name="sysItemCode"]').val('');
  });
  $('#modalCreateSysItemSettingEdit').on('hidden.bs.modal', function () {
    $('#modalCreateSysItemSettingEdit').removeClass('modal-under-review').removeClass('modal-edit');
    $('#modalCreateSysItemSettingEdit [name="sysItemName"]').prop('readonly', false);
    $('#modalCreateSysItemSettingEdit [name="sysItemValue"]').prop('readonly', false);
  });
};

var modalCreateSysDrop = {};
modalCreateSysDrop.create = function (type) {
  type = type ? type : 'sub';
  var dataFrom = $(this).closest('.tab-pane.active').attr('id');

  if (type === 'new') {
    $('#modalCreateSysDropDSetting [name="hasNextLayer"]').closest('.form-group').addClass('displayno');
  }
  $('#modalCreateSysDropDSetting [name="sysItemFrom"]').val(dataFrom);
  $('#modalCreateSysDropDSetting').addClass('modal-status-' + type).modal('show');
};
modalCreateSysDrop.createSubmit = function () {
  // new是sidebar的新增
  // sub是右方項目的新增
  var createStatus = $(this).closest('.modal').hasClass('modal-status-new') ? 'new' : 'sub';
  var name = $(this).closest('.modal').find('[name="sysItemName"]').val();
  var code = $(this).closest('.modal').find('[name="sysItemCode"]').val();
  var val = $(this).closest('.modal').find('[name="sysItemValue"]').val();
  var nextly = $(this).closest('.modal').find('[name="hasNextLayer"]').prop('checked');
  var rand = Math.random().toString();
  var randId = rand.substr(rand.length - 8);
  var contentAppendTarget = $('#pills-notice .tab-content:first');
  console.log(createStatus, $(this));

  if (!name || !code) return;

  if (createStatus === 'new' || nextly) {
    $(contentAppendTarget).append("\n      <div class=\"tab-pane\" id=\"sysSidebar_" + randId + "\" role=\"tabpanel\">\n        <form>\n          <div class=\"form-group row\" style=\"margin-bottom: 0;\">\n            <div class=\"col-4\">\n              <label class=\"col-form-label\">\u9805\u76EE\u540D\u7A31</label>\n            </div>\n            <div class=\"col-4\">\n              <label class=\"col-form-label\">\u9805\u76EE\u7CFB\u7D71\u4EE3\u78BC</label>\n            </div>\n          </div>\n        </form>\n        <a href=\"javascript: void(0);\" onclick=\"modalCreateSysDrop.create.call(this, '')\" class=\"greenLink\"><i class=\"fa fa-plus\"></i>&nbsp;\u65B0\u589E\u53C3\u6578\u985E\u5225</a>\n      </div>\n    ");
  }

  if (createStatus === 'new') {
    var li = "\n          <li>\n            <a role=\"tab\" data-toggle=\"list\" class=\"list-title\" href=\"#sysSidebar_" + randId + "\">" + name + "</a>\n            <a title=\"\u7DE8\u8F2F\u6A19\u984C\" class=\"edit-title\" href=\"javascript: void(0);\" onclick=\"modalCreateSysDrop.edit.call(this, 'new')\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a>\n          </li>";
    var sideBarAppendTarget = $('#sysSidebar1');
    $(sideBarAppendTarget).append(li);
  } else {
    var contentTargetFrom = $('#pills-notice .tab-content .tab-pane.active:first').attr('id');
    var parentLi = $('[href="#' + contentTargetFrom + '"][data-toggle="list"]').closest('li');
    console.log(contentTargetFrom, parentLi);

    if (nextly) {
      if ($(parentLi).find('ul').length === 0) {
        // console.log(1)
        $('[href="#' + contentTargetFrom + '"][data-toggle="list"]').attr('data-list-collapse-target', '#listCollapse_sysSidebar_' + randId).addClass('list-collapse');
        // .addClass('collapsed');
        $(parentLi).append("\n          <ul id=\"listCollapse_sysSidebar_" + randId + "\" class=\"collapse show\">\n            <li><a role=\"tab\" data-toggle=\"list\" class=\"list-title\" href=\"#sysSidebar_" + randId + "\">" + name + "</a></li> \n          </ul>\n        ");
      } else {
        $(parentLi).find('ul:first').append("\n          <li><a role=\"tab\" data-toggle=\"list\" class=\"list-title\" href=\"#sysSidebar_" + randId + "\">" + name + "</a></li>\n        ");
      }
    }

    $('#' + contentTargetFrom).find('form').append("\n      <div class=\"form-group row\">\n        <div class=\"col-4\">\n          <input class=\"form-control inputstyle\" value=\"" + name + "\" readonly=\"readonly\">\n        </div>\n        <div class=\"col-4\">\n          <input class=\"form-control inputstyle\" value=\"" + code + "\" readonly=\"readonly\">\n        </div>\n        <div class=\"col-4\">\n          <div id=\"sysSidebar__item--edit_" + randId + "\">\n            <a id=\"\" href=\"javascript: void(0);\" onclick=\"modalCreateSysDrop.edit.call(this, '')\" class=\"greenLink\">\n              <i class=\"fa fa-pencil col-form-label\" aria-hidden=\"true\"></i>\n            </a>\n          </div>\n        </div>\n      </div>\n    ");
  }
};
modalCreateSysDrop.edit = function (type) {
  var rand = Math.random().toString();
  var randId = rand.substr(rand.length - 8);
  var modalStatusClassName = type === 'underReveiew' || type === 'reveiew' ? 'modal-under-review' : type === '123' ? 'modal-123' : 'modal-edit';
  var dataFrom = type === 'new' ? { type: 'new', from: $(this).closest('li').find('.list-collapse').attr('href') } : { type: 'sub', from: $(this).closest('div').attr('id') };

  $('#modalCreateSysDropDSettingEdit [name="sysItemFrom"]').val(JSON.stringify(dataFrom));

  if (type === 'underReveiew' || type === 'review' || type === '123') {
    $('#modalCreateSysDropDSettingEdit [name="sysItemName"]').prop('readonly', true);
  }
  if (type === 'reveiew') {
    $('#modalCreateSysDropDSettingEdit').addClass('modal-m-review');
  }
  $('#modalCreateSysDropDSettingEdit').addClass(modalStatusClassName).modal('show');
};
modalCreateSysDrop.editSubmit = function () {
  var editStatus = $(this).closest('.modal').hasClass('modal-under-review') ? 'underReveiew' : $(this).closest('.modal').hasClass('modal-123') ? '123' : 'edit';

  if (editStatus === 'underReveiew' || editStatus === '123') {
    return;
  }

  var dataFrom = JSON.parse($(this).closest('.modal').find('[name="sysItemFrom"]').val());

  if (dataFrom.type === 'new') {
    $('.list-collapse[href="' + dataFrom.from + '"]').next('.edit-title').addClass('under-review-edit').attr('onclick', "modalCreateSysDrop.edit.call(this, 'underReveiew')");
  } else {
    // 右方細項編輯提交
    // 1. "檢視"按鈕
    // 2. sidebar title紅點
    var sidebarTitleFrom = $('#' + dataFrom.from).closest('.tab-pane.active').attr('id');
    $('#' + dataFrom.from).html("\n      <label class=\"col-form-label\"><span class=\"tag square red\">\u5F85\u8986\u6838</span></label>\n      <div class=\"btn-group\">\n        <button class=\"btn btn-outline-primary btn-sm\" type=\"button\" onclick=\"modalCreateSysDrop.edit.call(this, 'underReveiew')\">\n            \u6AA2\u8996\n        </button>\n      </div>\n    ");
    console.log(sidebarTitleFrom);
    $('.list-title[href="#' + sidebarTitleFrom + '"]').addClass('under-review-title');
  }
};
modalCreateSysDrop.review = function (isOk) {
  if (isOk) {
    $('#sysSidebar1_1_item_2').html("\n      <div class=\"btn-group\" style=\"padding-top: 5px;\">\n        <button class=\"btn btn-outline-primary btn-sm\" type=\"button\" onclick=\"modalCreateSysDrop.edit.call(this, '123')\">\n            \u6AA2\u8996\n        </button>\n      </div>\n    ");
    $('[href=\'#sysSidebar1_1\']').removeClass('under-review-title');
    $('#modalAgree').modal('show');
  } else {
    $('#modalSysBack').find('[name="sysItemFrom"]:first').val('modalCreateSysDropDSettingEdit');

    $('#modalSysBack').modal('show');
  }
};
modalCreateSysDrop.close = function () {
  $('#modalCreateSysDropDSetting').on('hidden.bs.modal', function () {
    $('#modalCreateSysDropDSetting').removeClass('modal-status-new').removeClass('modal-status-sub');
    $('#modalCreateSysDropDSetting [name="sysItemName"]').val('');
    $('#modalCreateSysDropDSetting [name="sysItemFrom"]').val('');
    $('#modalCreateSysDropDSetting [name="sysItemValue"]').val('');
    $('#modalCreateSysDropDSetting [name="sysItemCode"]').val('');
    $('#modalCreateSysDropDSetting [name="hasNextLayer"]').prop('checked', false);
    $('#modalCreateSysDropDSetting [name="hasNextLayer"]').closest('.form-group').removeClass('displayno');
  });
  $('#modalCreateSysDropDSettingEdit').on('hidden.bs.modal', function () {
    $('#modalCreateSysDropDSettingEdit').removeClass('modal-m-review').removeClass('modal-under-review').removeClass('modal-edit');
    $('#modalCreateSysDropDSettingEdit [name="sysItemName"]').prop('readonly', false);
    $('#modalCreateSysDropDSettingEdit [name="sysItemValue"]').prop('readonly', false);
  });
};

var modalCreateSysUpload = {};
modalCreateSysUpload.open = function (type) {
  var modal = '#modalCreateSysUploadSetting';
  console.log(type);
  switch (type) {
    case 'new':
      $(modal).addClass('modal-new');
      break;
    case 'edit':
      $(modal).addClass('modal-edit');
      $(modal + ' [name="sysItemName"]').val('編輯試算表');
      $(modal + ' [name="sysItemCode"]').val('readonlyCode').prop('readonly', true);
      $(modal + ' [name="sysItemFrom"]').val($(this).closest('li').find('.list-title').attr('href'));
      break;
    case 'underReview':
      $(modal).addClass('modal-under-review');
      $(modal + ' [name="sysItemName"]').val('房貸/壽險試算表').prop('readonly', true);
      $(modal + ' [name="sysItemCode"]').val('readonlyCode').prop('readonly', true);
      break;
    default:
      break;
  }
  $(modal).modal('show');
};
modalCreateSysUpload.submit = function () {
  var modal = '#modalCreateSysUploadSetting';
  var type = $(modal).hasClass('modal-edit') ? 'edit' : $(modal).hasClass('modal-under-review') ? 'underReview' : 'new';
  switch (type) {
    case 'new':
      $('[href="#sysSidebar3_2"]').removeClass('displayno');
      break;
    case 'edit':
      var target = $(modal + ' [name="sysItemFrom"]').val();
      $('[href="' + target + '"]').siblings('.edit-title').addClass('under-review-edit').attr('onclick', 'modalCreateSysUpload.open.call(this, \'underReview\')');
      break;
    case 'underReview':
      break;
    default:
      break;
  }
};
modalCreateSysUpload.close = function (params) {
  $('#modalCreateSysUploadSetting').on('hidden.bs.modal', function () {
    $('#modalCreateSysUploadSetting').removeClass('modal-new').removeClass('modal-edit').removeClass('modal-under-review');
    $('#modalCreateSysUploadSetting [name="sysItemName"]').val('');
    $('#modalCreateSysUploadSetting [name="sysItemFrom"]').val('');
    $('#modalCreateSysUploadSetting [name="sysItemValue"]').val('');
    $('#modalCreateSysUploadSetting [name="sysItemCode"]').val('');
  });
};

var modalSysBack = {
  submit: function submit() {
    var target = $('#modalSysBack [name="sysItemFrom"]:first').val();
    console.log(target);
    var menuTarget = '[href="' + target + '"]';
    var icon = "&nbsp;<i data-toggle=\"popover\" data-target=\"#t1528642568053\" class=\"fa fa-ban markRed pop-hover-stay mr-2\" aria-hidden=\"true\"></i>";
    var paramD = "<div class=\"btn-group\">\n        <button class=\"btn btn-outline-primary btn-sm\" type=\"button\" onclick=\"modalCreateSysItemSetting.edit(this, '123')\">\n            \u6AA2\u8996\n        </button>\n      </div>";
    var dropD = "<div class=\"btn-group\">\n        <button class=\"btn btn-outline-primary btn-sm\" type=\"button\" onclick=\"modalCreateSysDrop.edit.call(this, '123')\">\n            \u6AA2\u8996\n        </button>\n      </div>";
    if (target === 'sysSidebar_1') {
      // $('#' + target).find('.btn-group').addClass('displayno');
      // $('#' + target).find('.col-form-label:first').append(icon);
      $('#sysSidebar1_1_0_item_1').html(icon + paramD);
      $('#' + target + ' i[data-toggle="popover"]').popover(popoverHoverStayOpt);
      $('[href="#sysSidebar_1"]').removeClass('under-review-title');
      return;
    }
    if (target === 'modalCreateSysDropDSettingEdit') {
      // $('#sysSidebar1_1').find('.btn-group').addClass('displayno');
      $('#sysSidebar1_1_item_2').html(icon + dropD);
      $('#sysSidebar1_1 i[data-toggle="popover"]').addClass('col-form-label').popover(popoverHoverStayOpt);
      $('[href="#sysSidebar1_1"]').removeClass('under-review-title');
      return;
    }
    if (target === 'modalCreateSysUploadSetting') {
      // $('#sysSidebar3_1').find('.btn-group').addClass('displayno').siblings().addClass('displayno');
      $('#sysSidebar3_1').find('.under-review-notice').addClass('displayno');
      $('#sysSidebar3_1_items_1').html(icon);
      $('#sysSidebar3_1 i[data-toggle="popover"]')
      // .addClass('col-form-label')  
      .popover(popoverHoverStayOpt);
      $('[href="#sysSidebar3_1"]').removeClass('under-review-title');
      return;
    }
    $(menuTarget).append(icon);
    $(menuTarget).next('a').addClass('displayno');
    $(menuTarget + ' i[data-toggle="popover"]').popover(popoverHoverStayOpt);
  }
};

var listCollapse = {
  watch: function watch() {
    $(document).on('click', '.list-collapse[data-list-collapse-target]', function () {
      var listCollapseTarget = $(this).data('listCollapseTarget');
      var _this = this;
      console.log(listCollapseTarget);
      if ($(listCollapseTarget).hasClass('show')) {
        // 隱藏
        $(this).addClass('collapsed');
        $(listCollapseTarget).css('height', $(listCollapseTarget).height()).css('height', '').addClass('collapsing').removeClass('collapse').removeClass('show');

        setTimeout(function () {
          $(listCollapseTarget).removeClass('collapsing').addClass('collapse');
          $(listCollapseTarget).find('.active.show').removeClass('active').removeClass('show');
          console.log($(listCollapseTarget).find('.active.show'));
        }, 500);
      } else {
        // 顯示
        $(this).removeClass('collapsed');
        var listCollapseTargetHeight = $(listCollapseTarget).getSize().height;

        $(listCollapseTarget).addClass('collapsing').removeClass('collapse').css('height', listCollapseTargetHeight);

        setTimeout(function () {
          $(listCollapseTarget).css('height', '').removeClass('collapsing').addClass('collapse').addClass('show');
        }, 500);
      }
    });
    $(document).on('click', '.list-title', function () {
      var _this = this;
      setTimeout(function () {
        $(_this).closest('li').addClass('current');
        $(_this).parents('ul').find('li:not(.current) .list-title.active').each(function (i, e) {
          $(e).removeClass('active').removeClass('show');
        });
        $(_this).closest('li').removeClass('current').find('.list-title:first').addClass('active').addClass('show');
      }, 0);
    });
  }
};

var popoverHoverStayOpt = {
  trigger: "manual", html: true, animation: false,
  content: function content() {
    var mainTarget = $(this).attr('data-target') || $(this).attr('href');
    // console.log(mainTarget, this);
    return $(mainTarget).html();
  }
};
function popoverHoverStay() {
  var tmpTimmer = void 0;

  $(".pop-hover-stay").popover(popoverHoverStayOpt);
  $(document).on("mouseenter", ".pop-hover-stay", function () {
    var _this = this;
    $(this).popover("show");
    $(".popover").on("mouseleave", function () {
      $(_this).popover('hide');
    });
  }).on("mouseleave", ".pop-hover-stay", function () {
    var _this = this;
    tmpTimmer = setTimeout(function () {
      clearTimeout(tmpTimmer);

      if (!$(".popover:hover").length) {
        $(_this).popover("hide");
      }
    }, 300);
  }).on("click", ".pop-hover-stay", function () {
    return false;
  });
}

function allModalClose() {
  $('.modal').on('hidden.bs.modal', function () {
    $(this).removeClass('modal-status-new').removeClass('modal-status-sub').removeClass('modal-m-review').removeClass('modal-active').removeClass('modal-inactive').removeClass('modal-temp').removeClass('modal-under-review').removeClass('modal-edit');
  });
}

$(function () {
  var preTarget;
  stickInfo(preTarget);
  initNav();
  initSidebar();
  resizeCloseSidebar();
  $('[data-toggle="tooltip"]').tooltip();
  modalBodyClass();
  datePickers();
  fnSelectpicker();
  selectChange();
  custSelectChange();
  // customerDataTab();

  gSearch.getData();
  gSearch.close();
  gSearch.listKeyCtrl();

  showActiveItem();

  // id="modalCreateSysSetting" 
  mdCreateSysSetOpen();
  mdCreateSysSetClick();
  modalCreateSysSettingClose();
  modalCreateSysItemSetting.editSubmit();
  modalCreateSysItemSetting.close();

  modalCreateSysDrop.close();

  modalCreateSysUpload.close();

  allModalClose();

  listCollapse.watch();

  popoverHoverStay();

  custBootstrapSelect();
});