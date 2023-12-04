const data = [
    {
        id: 1,
        name: "Nguyễn Hòa",
        avatar: "avatar-3.jpg",
    },
    {
        id: 2,
        name: "Lê Quang Minh",
        avatar: "avatar-8.jpg",
    },
    {
        id: 3,
        name: "Ngô Thị Linh",
        avatar: "avatar-10.jpg",
    },
    {
        id: 4,
        name: "Nguyễn Duy Thịnh",
        avatar: "avatar-7.jpg",
    },
    {
        id: 5,
        name: "Mai Long Vũ",
        avatar: "avatar-9.jpg",
    },
    {
        id: 6,
        name: "Phan Thị Ngọc Minh",
        avatar: "avatar-1.jpg",
    },
    {
        id: 7,
        name: "Nguyễn Thị Minh Thu",
        avatar: "avatar-4.jpg",
    }
]

export const mockUsers = (() => {
    if (localStorage.getItem('users')) return JSON.parse(localStorage.getItem('users'));

    return data;
})();