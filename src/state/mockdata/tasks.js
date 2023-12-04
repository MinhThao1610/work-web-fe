const data = [
    {
        "id": 13,
        "title": "[CP]/[Đơn hàng] Thêm chức năng gia hạn/nâng cấp cho các đơn hàng",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 5,
        "ownerId": { "id": 5, "name": "Mai Long Vũ" },
        "code": 4,
        "sprint_id": 2,
        "sprintId": { "title": "2309", },
        "type": "task",
        "status": "new",
        "color": "#ff8000",
        "exchanges": [
            {
                "id": 1,
                "content": "Chưa có API",
                "creatorId": { name: "Lê Quang Minh", avatar: "avatar-8.jpg" },
                "createAt": "2023-11-20T23:50:13.708+07:00"
            }
        ],
        "checklistes": [
            {
                id: 1,
                content: "Thêm chức năng gia hạn cho các đơn hàng",
            },
            {
                id: 2,
                content: "Thêm chức năng nâng cấp cho các đơn hàng",
            }
        ]
    },
    {
        "id": 12,
        "title": "[CP] Thêm trường Note trên mục Bản in ",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 1,
        "ownerId": { "id": 1, "name": "Nguyễn Hòa" },
        "code": 9,
        "sprint_id": 3,
        "sprintId": { "title": "2310", },
        "type": "task",
        "status": "new"
    },
    {
        "id": 11,
        "title": "Chuyển thông tin thành viên từ vietnamgiapha cho dòng họ Vũ Tộc",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 4,
        "ownerId": { "id": 4, "name": "Nguyễn Duy Thịnh" },
        "code": 8,
        "sprint_id": 2,
        "sprintId": { "title": "2309", },
        "type": "task",
        "status": "process",
        "color": "#33cccc"
    },
    {
        "id": 10,
        "title": "[API] Thêm API cho phép sửa trường trong_ho",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 2,
        "ownerId": { "id": 2, "name": "Lê Quang Minh" },
        "code": 13,
        "sprint_id": 4,
        "sprintId": { "title": "2311", },
        "type": "task",
        "status": "process",
        "color": "#33cccc"
    },
    {
        "id": 9,
        "title": "Làm bài ngày 22/09",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 6,
        "ownerId": { "id": 6, "name": "Phan Thị Ngọc Minh" },
        "code": 15,
        "sprint_id": 2,
        "sprintId": { "title": "2309", },
        "type": "task",
        "status": "doing",
        "color": "#006cd9"
    },
    {
        "id": 1,
        "title": "Viết bài \"Ra mắt ứng dụng Việt Tộc trên nền tảng Android\"",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 6,
        "ownerId": { "id": 6, "name": "Phan Thị Ngọc Minh" },
        "code": 12,
        "sprint_id": 4,
        "sprintId": { "title": "2311", },
        "type": "task",
        "status": "doing",
        "color": "#006cd9"
    },
    {
        "id": 8,
        "title": "Lấy thông tin dòng họ Phan - Phú Yên từ trang vietnamgiapha phục vụ import cây Việt Tộc",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 4,
        "ownerId": { "id": 4, "name": "Nguyễn Duy Thịnh" },
        "code": 10,
        "sprint_id": 2,
        "sprintId": { "title": "2309", },
        "type": "task",
        "status": "done",
        "color": "#0bb251"
    },
    {
        "id": 6,
        "title": "Chuyển thông tin dòng họ Trần Đắc từ giaphavietnam phục vụ import cây Việt Tộc",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 4,
        "ownerId": { "id": 4, "name": "Nguyễn Duy Thịnh" },
        "code": 7,
        "sprint_id": 1,
        "sprintId": { "title": "2308", },
        "type": "task",
        "status": "done",
        "color": "#0bb251"
    },
    {
        "id": 5,
        "title": "Chuyển thông tin thành viên từ giaphavietnam cho dòng họ Nguyễn Văn",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 4,
        "ownerId": { "id": 4, "name": "Nguyễn Duy Thịnh" },
        "code": 6,
        "sprint_id": 1,
        "sprintId": { "title": "2308", },
        "type": "task",
        "status": "done",
        "color": "#0bb251"
    },
    {
        "id": 2,
        "title": "Lấy thông tin dòng họ Phạm - Ninh Bình từ trang vietnamgiapha phục vụ import cây Việt Tộc",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 4,
        "ownerId": { "id": 4, "name": "Nguyễn Duy Thịnh" },
        "code": 3,
        "sprint_id": 2,
        "sprintId": { "title": "2309", },
        "type": "task",
        "status": "done",
        "color": "#0bb251"
    },
    {
        "id": 3,
        "title": "Lấy thông tin dòng họ Phạm - Ninh Bình từ trang vietnamgiapha phục vụ import cây Việt Tộc",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 4,
        "ownerId": { "id": 4, "name": "Nguyễn Duy Thịnh" },
        "code": 2,
        "sprint_id": 3,
        "sprintId": { "title": "2311", },
        "type": "task",
        "status": "block",
        "color": "#ed2438"
    },
    {
        "id": 7,
        "title": "Lấy thông tin dòng họ Phạm - Ninh Bình từ trang vietnamgiapha phục vụ import cây Việt Tộc",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 4,
        "ownerId": { "id": 4, "name": "Nguyễn Duy Thịnh" },
        "code": 1,
        "sprint_id": 2,
        "sprintId": { "title": "2309", },
        "type": "task",
        "status": "verifying",
        "color": "#ff4081"
    },
    {
        "id": 4,
        "title": "đăng bài zalo 18/7",
        "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
        "owner_id": 6,
        "ownerId": { "id": 6, "name": "Phan Thị Ngọc Minh" },
        "code": 5,
        "sprint_id": 2,
        "sprintId": { "title": "2309", },
        "type": "task",
        "status": "cancel",
        "color": "#dedede"
    }
];
export const mockTaskData = {
    "priorityId": { "name": "Nghiêm trọng", "color": "#ff4081" },
    "type": "task",
    "status": "new",
    "color": "#ff8000",
    "exchanges": [],
    "checklistes": []
};

export const mockTasksData = (() => {
    if (localStorage.getItem('tasks')) return JSON.parse(localStorage.getItem('tasks'));

    return data;
})();