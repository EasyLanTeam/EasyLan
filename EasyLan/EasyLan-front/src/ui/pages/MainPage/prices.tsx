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
                      <p>{"Бесплатно WOW!"}</p>
                    </div>
                    <h1 className="pricing1-money" key="money">
                      0$
                    </h1>
                  </div>
                  <div className="pricing1-content" key="content">
                    <span>
                      {"Становись членом клуба!"}
                      <br />{"Турниры проходят и бесплатно!"}
                      <br /><br /><br /><br />
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
                      {"Мы тут же начинаем организацию"}
                      <br /> {"Хорошее времяпровождение обеспечено"}
                      <br /><br /><br />
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
                      {"Любое удобное время"}
                      <br /> {"Можно с пивасом"}
                      <br /> {"А можно и с кальяном"}
                      <br /> {"Можно весь день"}
                      <br /> {"Здесь уже можно все"}
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
