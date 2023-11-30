
let model = {};

// dữ liệu form
model.dataForm = {
    id: null,
    title: null,
    content: null,
    type: null,
    isShow: true,
};

model.listShow = [
    {
        value: true,
        label: 'Hiển thị',
    },
    {
        value: false,
        label: 'Ẩn',
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
    sort: "title",
    defaultSort: ["title", "ascending"],
    filters: "",
    dataSearch: {
        value: {
            title: "",
            type: "",
        },
        operator: {
            title: ":regex_i:",
        },
    },
};

export default model;
