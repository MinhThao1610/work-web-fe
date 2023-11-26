import * as moment from "moment";
import Excel from "exceljs";
import FileSaver from "file-saver";
let MethodService = {};

// -------------------MethodService-------------------------
function escapeRegex(string) {
  return string.toString().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
}

// function unescapeRegex(string) {
//   return string.toString().replace(/\\([-\/\\^$*+?.()|[\]{}])/g, "$1");
// }
MethodService.copyObject = function (value) {
  return JSON.parse(JSON.stringify(value));
};
// bấm sắp xếp bảng
MethodService.tableSortChange = (column, tableRules) => {
  column.order == "ascending"
    ? (tableRules.sort = column.prop)
    : column.order == "descending"
    ? (tableRules.sort = "-" + column.prop)
    : (tableRules.sort = "");
  return tableRules.sort;
};

// tìm kiếm bảng
MethodService.filterTable = function (jsonFilter) {
  if (jsonFilter) {
    let dataSearch = JSON.parse(jsonFilter);
    let filters = "";
    for (const key in dataSearch.value) {
      const value = dataSearch.value[key];
      if (value) {
        if (dataSearch.operator) {
          if (dataSearch.operator[key]) {
            let operator = dataSearch.operator[key];
            if (operator == "<+1day") {
              filters +=
                key +
                "<" +
                encodeURIComponent(
                  encodeURIComponent(MethodService.addDate(value, "days", 1))
                ) +
                "&";
            } else if (operator == "$vn_text=") {
              filters += operator + encodeURIComponent(value) + "&";
            } else if (operator == ":in_that_day:") {
              filters +=
                key +
                ">=" +
                encodeURIComponent(MethodService.toIsoDate(value)) +
                "&" +
                key +
                "<" +
                encodeURIComponent(
                  MethodService.toIsoDate(
                    MethodService.addDate(value, "days", 1)
                  )
                ) +
                "&";
            } else if (operator.match(/^:regex(_\w+)?:$/)) {
              filters +=
                key + operator + encodeURIComponent(escapeRegex(value)) + "&";
            } else if (operator == ":in:") {
              filters += key + operator + encodeURIComponent(value) + "&";
            } else if (operator == "fromTime") {
              filters +=
                key +
                ">=" +
                encodeURIComponent(MethodService.toIsoDate(value)) +
                "&";
            } else if (operator == "toTime") {
              filters +=
                key +
                "<=" +
                encodeURIComponent(MethodService.toIsoDate(value)) +
                "&";
            } else {
              filters += key + operator + encodeURIComponent(value) + "&";
            }
          } else {
            filters += key + "=" + encodeURIComponent(value) + "&";
          }
        } else {
          filters += key + "=" + encodeURIComponent(value) + "&";
        }
      }
    }

    return filters.slice(0, -1);
  } else {
    return "";
  }
};

MethodService.stringToObject = function (value) {
  var obj = {};
  if (!value) return obj;

  value.split("&").forEach((frm) => {
    var m = decodeURIComponent(frm).match(
      /^(\w+(\.\w+)*)(=|>=|<=|<>|!=|:\w+:)(.*)/
    );
    if (!m) return;
    if (m[1] in obj) return;
    if (m[3].match(/:regex(_\w+)?:/)) obj[m[1]] = m[4];
    else obj[m[1]] = m[4];
  });

  return obj;
};

// lưu tìm kiếm, sắp xếp khi reload trang web
MethodService.hashUrl = (routeQuery, tableRules) => {
  if (routeQuery.limit) {
    tableRules.limit = parseInt(routeQuery.limit);
  }
  if (routeQuery.page) {
    tableRules.page = parseInt(routeQuery.page);
  }
  if (routeQuery.limit && routeQuery.page) {
    tableRules.offset = (tableRules.page - 1) * tableRules.limit;
  }
  if (routeQuery.sort) {
    tableRules.sort = routeQuery.sort;
    tableRules.defaultSort[0] = tableRules.sort;
    tableRules.sort.indexOf("-") != -1
      ? (tableRules.defaultSort[1] = "descending")
      : (tableRules.defaultSort[1] = "ascending");
  }
  if (routeQuery.filters) {
    tableRules.filters = routeQuery.filters;
    // string to object
    tableRules.dataSearch.value = MethodService.stringToObject(
      tableRules.filters
    );
  }
  console.log("2222", routeQuery.filters);
  routeQuery.showFormSearch == "true"
    ? (tableRules.showFormSearch = true)
    : (tableRules.showFormSearch = false);
};

// show lỗi
MethodService.showError = (maCode) => {
  switch (maCode) {
    case 4:
      window.toastr.error("Gặp sự cố kết nối mạng Internet");
      break;
    case 2:
      window.toastr.error("Mất kết nối với Server");
      break;
    default:
      window.toastr.error("Đã có lỗi xảy ra");
  }
};

function toRad(Value) {
  /** Converts numeric degrees to radians */
  return (Value * Math.PI) / 180;
}

MethodService.distFrom = (lat1, lon1, lat2, lon2) => {
  //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
  var R = 3958.7558657440545; // Radius of earth in Miles
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

MethodService.getTokenAccount = (token) => {
  return "access_token=" + encodeURIComponent(token);
};

MethodService.exportExcel = function (cols, dataList, cardTitle) {
  let workbook = new Excel.Workbook();

  workbook.created = new Date();
  workbook.calcProperties.fullCalcOnLoad = false;
  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 0,
      visibility: "visible",
    },
  ];

  let worksheet = workbook.addWorksheet("DataCardItem", {
    views: [{ state: "frozen", xSplit: 1, ySplit: 1 }],
  });

  let arr = [];
  cols.forEach((item) => {
    let obj = {};
    obj.header = item.title;
    obj.key = item.title;
    obj.width = 30;
    arr.push(obj);
  });

  worksheet.columns = [...arr];

  let row = worksheet.getRow(1);
  row.eachCell(function (cell, colNumber) {
    row.getCell(colNumber).font = { bold: true };
    row.getCell(colNumber).alignment = {
      vertical: "middle",
      horizontal: "center",
    };
  });

  dataList.forEach((items) => {
    worksheet.addRow(items);
  });

  worksheet.getRow(1).height = 20;
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    row.eachCell(function (cell, colNumber) {
      console.log("colNumber", colNumber);
      if (rowNumber == 1) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "151529" },
        };
        cell.font = {
          color: { argb: "FFFFFF" },
          bold: true,
        };
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
      } else {
        cell.alignment = {
          vertical: "middle",
          wrapText: true,
        };
      }
      // Set border of each cell
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  //thêm ảnh vào file Excel, nhưng đang bị báo lỗi

  // workbook.addImage({
  //   filename: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/JPEG_example_flower.jpg/300px-JPEG_example_flower.jpg',
  //   extension: 'jpg',
  // });

  // workbook.addImage({
  //   filename: 'https://www.example.com/uploads/images/1586877486564_toppicks_thb4.jpg',
  //   extension: 'jpeg',
  // });

  workbook.xlsx.writeBuffer().then(function (data) {
    var blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    FileSaver.saveAs(blob, cardTitle + ".xlsx");
  });
};

// format date
let formatDateMonth = "MM/YYYY";
let formatDateMoment = "DD/MM/YYYY";
let formatMomentDate = "YYYY-MM-DD";
MethodService.formatDate = function (value) {
  if (!value) {
    return "";
  }
  if (moment(value).millisecond() === 0) {
    return moment(value).add().format("YYYY-MM-DD HH:mm:ss");
  } else return moment(value).add().format("YYYY-MM-DD HH:mm:ss.SSS");
};

MethodService.formatDateDDMM = function (value) {
  if (!value) return "";
  return moment(value).format("D-MM");
};
MethodService.formatDateStyle = function (value, rule) {
  if (value) {
    var format = "";
    if (rule == "date") {
      format = formatDateMoment;
    } else if (rule == "datetime") {
      format = formatDateMoment + " HH:mm";
    } else if (rule == "aboutTime") {
      format = formatDateMoment + " HH:mm";
    } else if (rule == "month") {
      format = formatDateMonth;
    } else if (rule == "year") {
      format = formatMomentDate;
    } else {
      format = rule;
    }
    return moment(value).format(format);
  } else {
    return "";
  }
};

MethodService.encodeHtml = function (template = "") {
  if (template === undefined || template === null) return "";
  var html = typeof template === "string" ? template : template.toString();
  html = html.replace(/&/g, "&amp;");
  html = html.replace(/</g, "&lt;");
  html = html.replace(/>/g, "&gt;");
  html = html.replace(/"/g, "&quot;");
  html = html.replace(/'/g, "&apos;");
  return html;
};

export default MethodService;
