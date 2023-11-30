import ValidService from "@/service/ValidService";

let model = {};

// dữ liệu form
model.dataForm = {
    name: null,
    phone: null,
    email: null,
    password: null,
    address: null,
    school: null,
    description: null,
    network: null,
    position: null,
    birthday: null,
    fromDate: null,
    toDate: null,
    avatar: null,
    isWorking: true,
    role: null,
};

model.listRole = [
    {
        value: 'ADMIN',
        label: 'Admin',
    },
    {
        value: 'USER',
        label: 'User',
    },
];

model.listTypeEmployees = [
    {
        value: 'chinh-thuc',
        label: 'Nhân viên chính thức',
    },
    {
        value: 'hop-dong',
        label: 'Nhân viên hợp đồng',
    },
    {
        value: 'thuc-tap',
        label: 'Thực tập sinh',
    },
];

model.listStatus = [
    {
        value: 'all',
        label: 'Tất cả',
    },
    {
        value: true,
        label: 'Đang làm',
    },
    {
        value: false,
        label: 'Đã nghỉ',
    },
];


model.tableRules = {
    lengthMenu: [10, 20, 50, 100],
    allowPaging: true,
    allowSorting: true,
    allowSelect: false,
    showFormSearch: false,
    showUrl: true,
    total: 0,
    page: 1,
    limit: 20,
    offset: 0,
    sort: "name",
    defaultSort: ["name", "ascending"],
    filters: "",
    dataSearch: {
        value: {
            name: "",
            phone: "",
            email: ""
        },
        valid: {
            // name: [ValidService.checkNameAllowVN],
            code: [ValidService.checkNumber],
            type: [ValidService.checkNameAllowVN],
        },
        operator: {
            name: ":regex_i:",
            code: ":regex_i:",
            type: ":regex_i:",
        },
    },
};

export default model;
