import ValidService from "@/service/ValidService";

let model = {};

// dữ liệu form
model.dataForm = {
    name: null,
    phone: null,
    email: null,
    status: null,
};


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
