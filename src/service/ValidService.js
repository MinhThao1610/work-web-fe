let ValidService = {};
ValidService.required = {
  required: true,
  message: "Vui lòng nhập giá trị",
  trigger: "blur",
};
ValidService.requiredChange = {
  required: true,
  message: "Vui lòng chọn giá trị",
  trigger: "change",
};
ValidService.requiredInputNumber = {
  required: true,
  message: "Vui lòng nhập giá trị là số nguyên",
  trigger: "blur",
};
ValidService.checkAccount = {
  pattern: /^[0-9a-zA-Z._@]+$/g,
  message: "Chỉ nhập các ký tự 0-9, a-z, dấu . hoặc _",
  trigger: "blur",
};
ValidService.checkCode = {
  pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
  message: "Chỉ nhập các ký tự a-z, A-Z, 0-9",
  trigger: "blur",
};
ValidService.checkNumber = {
  pattern: /^[0-9]+$/g,
  message: "Chỉ nhập số",
  trigger: "blur",
};
ValidService.checkNumberInteger = {
  pattern: /^[-*0-9]+$/g,
  message: "Vui lòng nhập số nguyên",
  trigger: "blur",
};
ValidService.checkPhone = {
  pattern: /^(0|\+?84|0084)\d{9}$/,
  message: "Sai định dạng số điện thoại",
  trigger: "blur",
};
ValidService.checkPhone10_11Number = {
  pattern: /^0[0-9]{9,10}$/,
  message: "Sai định dạng số điện thoại",
  trigger: "blur",
};
ValidService.checkSpaceString = {
  pattern: /\S/g,
  message: "Không được nhập toàn khoảng trắng",
  trigger: "blur",
};
ValidService.checkNameAllowVN = {
  pattern:
    /^[0-9a-zA-Z_ ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìiíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/,
  message: "Không được nhập các ký tự đặc biệt",
  trigger: "blur",
};
ValidService.checkMaxLength = (max) => {
  return {
    max: max,
    message: "Số ký tự tối đa: " + max,
    trigger: "blur",
  };
};
ValidService.checkMinLength = (min) => {
  return {
    min: min,
    message: "Số ký tự tối thiểu: " + min,
    trigger: "blur",
  };
};
ValidService.checkNumberFloatNotNegative = {
  pattern: /^[\d.]+$/,
  message: "Không được nhập số nhỏ hơn 0",
  trigger: "blur",
};
ValidService.checkNumberPositive = {
  pattern: /^[-]?[\d]+$/,
  message: "Không được nhập số nguyên",
  trigger: "blur",
};
ValidService.number0100 = {
  pattern: /^[0-9]{1,2}$/,
  message: "Giá trị từ 0 đến 99",
  trigger: "blur",
};
ValidService.checkEmail = {
  pattern:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  message: "Vui lòng nhập đúng định dạng email",
  trigger: "blur",
};
ValidService.checkAz09 = {
  pattern: /^[\w]+$/g,
  message: "Chỉ nhập ký tự a-z, 0-9",
  trigger: "blur",
};
ValidService.checkURL = {
  pattern:
    /^(https?:)?\/\/((([a-z0-9-]+\.)+[a-z]{2,5})|(((1?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(1?\d{1,2}|2[0-4]\d|25[0-5])))(:\d{1,5})?($|\/|\?|#)/,
  message: "Vui lòng nhập đúng định dạng url",
  trigger: "blur",
};
ValidService.checkServer = {
  pattern: /^[a-z0-9-.]*$/,
  message: "Chỉ nhập ký tự a-z, 0-9, dấu - và .",
  trigger: "blur",
};
ValidService.checkDatabaseName = {
  pattern: /^\w+$/,
  message: "Database chứa ký tự không hợp lệ",
  trigger: "blur",
};
ValidService.checkSpecial = {
  pattern: /^\w+$/,
  message: "Chỉ nhập các ký tự 0-9, a-z, A-Z và dấu _",
  trigger: "blur",
};
ValidService.checkNoSpace = {
  pattern: /^\S*$/,
  message: "Không được chứa khoảng trắng",
  trigger: "blur",
};
ValidService.checkPolygonNoneHTML = {
  pattern:
    /^\[\[\[\d+(\.\d+)?,\d+(\.\d+)?\](,\[\d+(\.\d+)?,\d+(\.\d+)?\]){2,}\](,\[\[\d+(\.\d+)?,\d+(\.\d+)?\](,\[\d+(\.\d+)?,\d+(\.\d+)?\]){2,}\])*\]$/,
  message: "Nhập sai định dạng polygon",
  trigger: "blur",
};

ValidService.checkPolygonWithHTML = {
  pattern:
    /^<MultiGeometry>(<Polygon><outerBoundaryIs><LinearRing><coordinates>\d+(\.\d+)?,\d+(\.\d+)?( \d+(\.\d+)?,\d+(\.\d+)?){2,}<\/coordinates><\/LinearRing><\/outerBoundaryIs><\/Polygon>)+<\/MultiGeometry>$/,
  message: "Nhập sai định dạng polygon html",
  trigger: "blur",
};
ValidService.sql = {
  pattern: "@table",
  message: "Câu lệnh sql phải chứa '@table'",
  trigger: "blur",
};
export default ValidService;
