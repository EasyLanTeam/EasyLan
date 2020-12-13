import React from "react";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";

export interface IContentTitleProps {
  isMobile: boolean;
}

export class ContentTitle extends React.PureComponent<IContentTitleProps> {

  render() {
    return (
      <OverPack className="home-page-wrapper content13-wrapper" playScale={0.3}>
        <QueueAnim
          type="bottom"
          leaveReverse
          key="page"
          delay={[0, 100]}
          className="title-wrapper"
        >
          <img
            className="title-image"
            ref="https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg"
            alt=""
          ></img>
          <h1 className="title-h1">
            "Наша небольшая команда живет по адресу:"
          </h1>
          <span className="title-content">
            г. Екатеринбург, Первомайская улица, строение 15, офис 608
          </span>
        </QueueAnim>
        <TweenOne
          key="button"
          style={{ textAlign: "center" }}
          animation={{ y: 30, opacity: 0, type: "from", delay: 300 }}
        >
          {/* <Button>
            <a className="button" href=".">
              "Работать у нас "
            </a>
          </Button> */}
        </TweenOne>
      </OverPack>
    );
  }
}
