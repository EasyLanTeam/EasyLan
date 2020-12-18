import React from "react";
import { Row, Col, Button } from "antd";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import { IDefaultProps } from ".";

export class Prices extends React.Component<IDefaultProps> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: IDefaultProps) {
    super(props);
  }

  render() {
    return (
      <div className="home-page-wrapper pricing1-wrapper">
        <div className="home-page pricing1">
          <div key="title" className="pricing1-title-wrapper">
            <h1 className="pricing1-title-h1">Стоимость</h1>
          </div>
          <OverPack playScale="0.3" className="pricing1-content-wrapper">
            <QueueAnim
              type="bottom"
              component={Row}
              leaveReverse
              ease={["easeOutQuad", "easeInOutQuad"]}
              key="content"
            >
              <Col key="block0" className="pricing1-block" md={8} xs={16}>
                <QueueAnim type="bottom" className="pricing1-block-box ">
                  <div className="pricing1-top-wrapper">
                    <div className="pricing1-name" key="name">
                      <p>Free</p>
                    </div>
                    <h1 className="pricing1-money" key="money">
                      0$
                    </h1>
                  </div>
                  <div className="pricing1-content" key="content">
                    <span>
                      {"Ну да, бесплатно."}
                      <br /> {"Если вы первый клуб, то грац!"}
                      <br /> {"Первый клуб влияет на сервис."}
                      <br /> {"Есть пожелания, обсудим все."}
                      <br /> {"Взаимовыручка во все края."}
                    </span>
                  </div>
                  <i className="pricing1-line" key="line" />
                  <div className="pricing1-button-wrapper" key="button">
                    <Button>Поехали</Button>
                  </div>
                </QueueAnim>
              </Col>
              <Col key="block1" className="pricing1-block" md={8} xs={16}>
                <QueueAnim type="bottom" className="pricing1-block-box active">
                  <div className="pricing1-top-wrapper">
                    <div className="pricing1-name" key="name">
                      <p>Starter</p>
                    </div>
                    <h1 className="pricing1-money" key="money">
                      100$
                    </h1>
                  </div>
                  <div className="pricing1-content" key="content">
                    <span>
                      {"Турниры 2 раза в месяц."}<br /> <br /> <br /> <br />
                      {/* <br /> {"Lorem ipsum dolor sit amet."}
                      <br /> {"Lorem ipsum dolor sit amet."}
                      <br /> {"Lorem ipsum dolor sit amet."}
                      <br /> {"Lorem ipsum dolor sit amet."} */}
                    </span>
                  </div>
                  <i className="pricing1-line" key="line" />
                  <div className="pricing1-button-wrapper" key="button">
                    <Button>Врубай</Button>
                  </div>
                </QueueAnim>
              </Col>
              <Col key="block2" className="pricing1-block" md={8} xs={16}>
                <QueueAnim
                  type="bottom"
                  className="pricing1-block-box activePro"
                >
                  <div className="pricing1-top-wrapper">
                    <div className="pricing1-name" key="name">
                      <p>Pro</p>
                    </div>
                    <h1 className="pricing1-money" key="money">
                      200$
                    </h1>
                  </div>
                  <div className="pricing1-content" key="content">
                    <span>
                      {"Турнир 4 раза в месяц."}<br /> <br /> <br /> <br />
                      {/* <br /> {"Lorem ipsum dolor sit amet."}
                      <br /> {"Lorem ipsum dolor sit amet."}
                      <br /> {"Lorem ipsum dolor sit amet."}
                      <br /> {"Lorem ipsum dolor sit amet."} */}
                    </span>
                  </div>
                  <i className="pricing1-line" key="line" />
                  <div className="pricing1-button-wrapper" key="button">
                    <Button>Бабки не проблема 😎</Button>
                  </div>
                </QueueAnim>
              </Col>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}
