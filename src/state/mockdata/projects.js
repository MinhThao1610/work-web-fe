const data = [
    {
        "id": 5,
        "status": "planned",
        "tim_id": 1,
        "tim": {},
        "title": "2312",
        "description": "",
        "startDate": "2023-12-01T00:00:00+07:00",
        "endDate": "2023-12-31T00:00:00+07:00",
        "tasks": Array(12).fill({}),
        "testObjects": [],
        "testcases": [],
        "leader_id": 1,
        "leader": { "name": "Nguyễn Hòa" },
        "createAt": "2023-12-01T23:41:51.33+07:00",
        "updateAt": "2023-12-01T23:41:58.292+07:00",
        "type": "SPRINT",
        "progress": 0,
    },
    {
        "id": 4,
        "status": "doing",
        "tim_id": 1,
        "tim": {},
        "title": "2311",
        "description": "",
        "startDate": "2023-11-01T00:00:00+07:00",
        "endDate": "2023-11-30T00:00:00+07:00",
        "tasks": [...Array(14).fill({ statusId: { type: 'done' } }), ...Array(5).fill({})],
        "testObjects": [],
        "testcases": [],
        "leader_id": 1,
        "leader": { "name": "Nguyễn Hòa" },
        "createAt": "2023-11-01T14:15:27.404+07:00",
        "updateAt": "2023-11-01T14:15:35.264+07:00",
        "lastModifiedUserId": 1,
        "type": "SPRINT",
        "progress": Math.floor((100 * 14) / 19),
    },
    {
        "id": 3,
        "status": "done",
        "tim_id": 1,
        "tim": {},
        "title": "2310",
        "description": "",
        "startDate": "2023-10-01T00:00:00+07:00",
        "endDate": "2023-10-31T00:00:00+07:00",
        "tasks": Array(16).fill({ statusId: { type: 'done' } }),
        "testObjects": [],
        "testcases": [],
        "leader_id": 1,
        "leader": { "name": "Nguyễn Hòa" },
        "createAt": "2023-10-01T09:33:59.26+07:00",
        "updateAt": "2023-10-01T09:40:00.578+07:00",
        "lastModifiedUserId": 1,
        "type": "SPRINT",
        "progress": 100,
    },
    {
        "id": 2,
        "status": "done",
        "tim_id": 1,
        "tim": {},
        "title": "2309",
        "description": "",
        "startDate": "2023-09-1T00:00:00+07:00",
        "endDate": "2023-09-30T00:00:00+07:00",
        "tasks": Array(9).fill({ statusId: { type: 'done' } }),
        "testObjects": [],
        "testcases": [],
        "leader_id": 1,
        "leader": { "name": "Nguyễn Hòa" },
        "createAt": "2023-09-01T15:39:48.861+07:00",
        "updateAt": "2023-09-01T08:54:24.667+07:00",
        "lastModifiedUserId": 1,
        "type": "SPRINT",
        "progress": 100,
    },
    {
        "id": 1,
        "status": "done",
        "tim_id": 1,
        "tim": {},
        "title": "2308",
        "description": "",
        "startDate": "2023-08-01T00:00:00+07:00",
        "endDate": "2023-08-31T00:00:00+07:00",
        "tasks": Array(13).fill({ statusId: { type: 'done' } }),
        "testObjects": [],
        "testcases": [],
        "leader_id": 1,
        "leader": { "name": "Nguyễn Hòa" },
        "createAt": "2023-08-01T15:33:36.864+07:00",
        "updateAt": "2023-08-01T16:00:42.722+07:00",
        "lastModifiedUserId": 1,
        "type": "SPRINT",
        "progress": 100,
    }
];
export const mockProject = {
    "status": "planned",
    "tim_id": 1,
    "tim": {},
    "tasks": [],
    "testObjects": [],
    "testcases": [],
    "leader_id": 1,
    "leader": { "name": "Nguyễn Hòa" },
    "createAt": new Date().toISOString(),
    "updateAt": new Date().toISOString(),
    "type": "SPRINT",
    "progress": 0,
};

export const mockProjects = (() => {
    if (localStorage.getItem('projects')) return JSON.parse(localStorage.getItem('projects'));

    return data;
})();