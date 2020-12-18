export const ContentAdvantagesData = {
  wrapper: { className: "home-page-wrapper content0-wrapper" },
  page: { className: "home-page content0" },
  OverPack: { playScale: 0.3, className: "" },
  titleWrapper: {
    className: "title-wrapper",
    children: [{ name: "title", children: "Что мы даем" }],
  },
  childWrapper: {
    className: "content0-block-wrapper",
    children: [
      {
        name: "block0",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://www.flaticon.com/svg/static/icons/svg/3921/3921928.svg",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "Долой простой!",
            },
            { name: "content", children: "Днем мало игроков? Ну так это решаемо!" },
          ],
        },
      },
      {
        name: "block1",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://www.flaticon.com/svg/static/icons/svg/3921/3921928.svg",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "Увеличьте свои тарифы",
            },
            {
              name: "content",
              children: "Мероприятия стоят дороже!",
            },
          ],
        },
      },
      {
        name: "block2",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://www.flaticon.com/svg/static/icons/svg/3921/3921928.svg",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "Плюс реп",
            },
            {
              name: "content",
              children: "Вложитесь в игровую индустрию - станьте популярнее.",
            },
          ],
        },
      },
    ],
  },
};
