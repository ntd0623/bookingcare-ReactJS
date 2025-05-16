export const adminMenu = [
  {
    //Quản lý người dùng
    name: "menu.admin.user-manage",
    menus: [
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      // Quản lý bác sĩ
      {
        name: "menu.admin.doctor-manage",
        link: "/system/doctor-manage",
      },
      // Quản lý lịch trình 
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    //Quản lý phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.clinic-manage",
        link: "/system/clinic-manage",
      },
    ],
  },
  {
    //Quản chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.specialty-manage",
        link: "/system/specialty-manage",
      },
    ],
  },
  {
    //Quản lý cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.handbook-manage",
        link: "/system/handbook-manage",
      },
    ],
  },
];

export const doctorMenu = [
  {
    //Quản lý người dùng
    name: "menu.admin.user-manage",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
];
