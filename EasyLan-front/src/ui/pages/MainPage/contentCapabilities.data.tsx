export const ContentProductDataSource = {
  wrapper: { className: "home-page-wrapper content3-wrapper" },
  page: { className: "home-page content3" },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: "title-wrapper",
    children: [
      {
        name: "title",
        children: "Возможности нашего сервиса",
        className: "title-h1",
      },
      // {
      //   name: 'content',
      //   className: 'title-content',
      //   children: 'Полная итеграция ',
      // },
    ],
  },
  block: {
    className: "content3-block-wrapper",
    children: [
      {
        name: "block0",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "BIM" },
          content: {
            className: "content3-content",
            children: "Интеграция с САПР системами",
          },
        },
      },
      {
        name: "block1",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "Точность" },
          content: {
            className: "content3-content",
            children:
              "Все расчеты выполняют высокоточные алгоритмы согласно стандартам ",
          },
        },
      },
      {
        name: "block2",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png",
          },
          textWrapper: { className: "content3-text" },
          title: {
            className: "content3-title",
            children: "Облачный мониторинг",
          },
          content: {
            className: "content3-content",
            children:
              "Централизованный мониторинг распределенной облачной среды, единый просмотр BIM моделей, интеллектуальный анализ.",
          },
        },
      },
      {
        name: "block3",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "Прост в освоение" },
          content: {
            className: "content3-content",
            children:
              "Все те любимые инструменты из лучший BIM систем для работы с моделями",
          },
        },
      },
      {
        name: "block4",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "Отчет" },
          content: {
            className: "content3-content",
            children: "Формирование отчетов для дальнейшего анализа участка",
          },
        },
      },
      {
        name: "block5",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png",
          },
          textWrapper: { className: "content3-text" },
          title: {
            className: "content3-title",
            children: "Инсоляционный мешок",
          },
          content: {
            className: "content3-content",
            children:
              "Прострой окружающюю застройку и подбери оптимальные размеры будущего дома на основе визуализации инсоляционного мешка",
          },
        },
      },
    ],
  },
};
