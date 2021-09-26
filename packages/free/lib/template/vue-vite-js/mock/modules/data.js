/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */

function result(data, code = 200, msg = "msg") {
  return { code, data, msg };
}

const homeContent = () => {
  let item = [];
  for (let i = 1; i < 48; i++) {
    const a = i < 10 ? `0${i}` : i;
    item.push({
      title: `项目${a}`,
      img: a,
      id: i,
    });
  }
  return item;
};

export default [
  {
    url: "/api/rest",
    method: "get",
    response: ({ query }) => {
      return { code: 200, data: { name: "jojo1", query } };
    },
  },

  {
    url: "/Authentication/requestToken",
    method: "post",
    response: result({
      name: "jojo",
      token: "THIS_IS_TOKEN",
      roles: ["admin"],
    }),
  },
  {
    url: "/Authentication/RequestUserMsg",
    method: "post",
    response: result({
      userId: "123456",
      name: "小明",
      action: ["add", "show", "edit", "del"],
      userMenu: [
        {
          id: 1,
          path: "/mes-dian-zi-kan-ban",
          title: "电子看板",
          name: "dianzikanban",
          content: [
            { id: 1, title: "项目1", img: "02" },
            { id: 2, title: "项目2", img: "01" },
            { id: 3, title: "项目3", img: "04" },
          ],
        },
        {
          id: 2,
          path: "/mes--F-F",
          title: "FFOF(看板)",
          name: "FFOF",
          content: [
            { id: 1, title: "项目1", img: "07" },
            { id: 2, title: "项目2", img: "11" },
            { id: 3, title: "项目3", img: "14" },
          ],
        },
      ],
    }),
  },
  {
    url: "/Authentication/RequestHotWebMsg", // 首页内容，
    method: "post",
    response: result(homeContent()),
  },

  {
    url: "/cut",
    method: "post",
    response: {
      status: true,
      code: "200",
      message: "请求成功",
      data: [
        {
          site: "ctu_op3",
          factory: "assy3",
          project: "v313",
          line: "b2_f02_l13333",
        },
        {
          site: "ctu_op3",
          factory: "assy3",
          project: "v313",
          line: "b2_f02_l133",
        },
        {
          site: "ctu_op3",
          factory: "assy2",
          project: "v311",
          line: "b2_f02_l2",
        },
        {
          site: "ctu_op3",
          factory: "assy1",
          project: "v311",
          line: "b2_f02_l2",
        },
        {
          site: "ctu_op3",
          factory: "assy",
          project: "v312",
          line: "b2_f02_l11",
        },
        {
          site: "ctu_op3",
          factory: "assy3",
          project: "v313",
          line: "b2_f02_l1333",
        },
        {
          site: "ctu_op3",
          factory: "assy2",
          project: "v313",
          line: "b2_f02_l122222",
        },
        {
          site: "ctu_op2",
          factory: "assy",
          project: "v310",
          line: "b2_f02_l1",
        },
        {
          site: "ctu_op3",
          factory: "assy1",
          project: "v313",
          line: "b2_f02_l1",
        },
        {
          site: "ctu_op3",
          factory: "assy3",
          project: "v313",
          line: "b2_f02_l133333",
        },
        {
          site: "ctu_op3",
          factory: "assy2",
          project: "v313",
          line: "b2_f02_l1222",
        },
        {
          site: "ctu_op3",
          factory: "assy2",
          project: "v312",
          line: "b2_f02_l1",
        },
        {
          site: "ctu_op3",
          factory: "assy1",
          project: "v312",
          line: "b2_f02_l1",
        },
        {
          site: "ctu_op3",
          factory: "assy",
          project: "v311",
          line: "b2_f02_l1",
        },
        {
          site: "ctu_op3",
          factory: "assy3",
          project: "v313",
          line: "b2_f02_l13",
        },
        {
          site: "ctu_op3",
          factory: "assy",
          project: "v310",
          line: "b2_f02_l1",
        },
        {
          site: "ctu_op3",
          factory: "assy3",
          project: "v312",
          line: "b2_f02_l1",
        },
        {
          site: "ctu_op3",
          factory: "assy2",
          project: "v312",
          line: "b2_f02_l3",
        },
        {
          site: "ctu_op3",
          factory: "assy3",
          project: "v312",
          line: "b2_f02_l2",
        },
        {
          site: "ctu_op3",
          factory: "assy1",
          project: "v313",
          line: "b2_f02_l111",
        },
        {
          site: "ctu_op3",
          factory: "assy1",
          project: "v312",
          line: "b2_f02_l2",
        },
        {
          site: "ctu_op3",
          factory: "assy2",
          project: "v312",
          line: "b2_f02_l2",
        },
        {
          site: "ctu_op3",
          factory: "assy3",
          project: "v312",
          line: "b2_f02_l3",
        },
        {
          site: "ctu_op3",
          factory: "assy2",
          project: "v313",
          line: "b2_f02_l122",
        },
        {
          site: "ctu_op3",
          factory: "assy1",
          project: "v312",
          line: "b2_f02_l3",
        },
        {
          site: "ctu_op3",
          factory: "assy1",
          project: "v313",
          line: "b2_f02_l11",
        },
        {
          site: "ctu_op3",
          factory: "assy3",
          project: "v311",
          line: "b2_f02_l1",
        },
        {
          site: "ctu_op3",
          factory: "assy1",
          project: "v311",
          line: "b2_f02_l1",
        },
        {
          site: "ctu_op3",
          factory: "assy",
          project: "v312",
          line: "b2_f02_l1",
        },
        {
          site: "ctu_op3",
          factory: "assy2",
          project: "v311",
          line: "b2_f02_l1",
        },
        {
          site: "ctu_op3",
          factory: "assy1",
          project: "v313",
          line: "b2_f02_l11111",
        },
        {
          site: "ctu_op3",
          factory: "assy2",
          project: "v313",
          line: "b2_f02_l12",
        },
      ],
    },
  },
];
