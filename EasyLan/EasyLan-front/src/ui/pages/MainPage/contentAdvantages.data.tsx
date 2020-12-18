export const ContentAdvantagesData = {
  wrapper: { className: "home-page-wrapper content0-wrapper" },
  page: { className: "home-page content0" },
  OverPack: { playScale: 0.3, className: "" },
  titleWrapper: {
    className: "title-wrapper",
    children: [{ name: "title", children: "Простые шаги" }],
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
                "https://www.flaticon.com/svg/static/icons/svg/1265/1265464.svg",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "Регистрируйся",
            },
            { name: "content", children: "Легко начать" },
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
                "https://www.flaticon.com/svg/static/icons/svg/2074/2074797.svg",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "Учавствуй",
            },
            {
              name: "content",
              children: "Мы позаботимся об организации",
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
                "https://www.flaticon.com/svg/static/icons/svg/3069/3069338.svg",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "Выигрывай",
            },
            {
              name: "content",
              children: "Сильный игрок? Останешься в плюсе!",
            },
          ],
        },
      },
    ],
  },
};
