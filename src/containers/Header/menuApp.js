export const adminMenu = [
  {
    //Quản lý người dùng
    name: "menu.admin.user-manage",
    menus: [
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.doctor-manage",
        link: "/system/doctor-manage",

        // // subMenus: [
        // //   {
        // //     name: "menu.system.system-administrator.user-manage",
        // //     link: "/system/user-manage",
        // //   },
        // //   {
        // //     name: "menu.system.system-administrator.user-redux",
        // //     link: "/system/user-redux",
        // //   },
        // ],
      },
      {
        name: "menu.admin.admin-manage",
        link: "/system/admin-manage",
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
