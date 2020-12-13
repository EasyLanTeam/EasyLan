import React from "react";
import TweenOne from "rc-tween-one";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import { Row, Col } from "antd";

export class FooterModelChildern {
  href?: string;
  content?: string;
}

export class FooterModel {
  public xs?: number;
  public md?: number;
  public title?: string;
  public children?: FooterModelChildern[];
}

export interface IFooterProps {
  isMobile: boolean;
}

export default class Footer extends React.Component<IFooterProps> {
  getModelChildren = (children: FooterModelChildern[] | undefined) =>

    children?.map((data, key) => {
      return (
        <a href={data.href} key={key}>{data.content}</a>
      );
    });

  getLiChildren2 = (model: FooterModel[]) =>
    model.map((data, key) => {
      return (
        <Col className="block" xs={data.xs} md={data.md} key={key}>
          <h2>{data.title}</h2>
          <div>{this.getModelChildren(data.children)}</div>
        </Col>
      );
    });



  getFooterModel(): FooterModel[] {
    const footerData =
      [
        {
          xs: 24,
          md: 8,
          title: "Навигация",
          children: [
            { href: "#", content: "Справочная информация" },
            { href: "#", content: "Предложения и пожелания" },
          ],
        },
        {
          xs: 24,
          md: 8,
          title: "Карта сайта",
          children: [
            { href: "#", content: "О нас" },
            { href: "#", content: "Команда" },
          ],
        },
        {
          xs: 24,
          md: 8,
          title: "Наши партнеры",
          children: [
            { href: "#", content: "SBER" },
          ],
        },
      ];
    // экспериментальный подход !
    const model = JSON.parse(JSON.stringify(footerData)) as FooterModel[];
    return model;
  }

  render() {
    return (
      <div className="home-page-wrapper footer-wrapper">
        <OverPack className="footer" playScale={0.2}>
          <QueueAnim
            type="bottom"
            key="ul"
            leaveReverse
            component={Row}
            className="home-page"
          >
            {this.getLiChildren2(this.getFooterModel())}
          </QueueAnim>
          <TweenOne
            animation={{ y: "+=30", opacity: 0, type: "from" }}
            key="copyright"
            className="copyright-wrapper"
          >
            <div className="home-page">
              <div className="copyright">
                <span>
                  {"©2020 by "}
                  <a href="https://youtu.be/dQw4w9WgXcQ">
                    EZLAN
                  </a>{" All Rights Reserved"}
                </span>
              </div>
            </div>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}
