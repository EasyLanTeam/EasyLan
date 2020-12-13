import React from "react";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { Button } from "antd";
// import { getChildrenToRender } from './utils';

export interface IContentTitleButtonProps {
  isMobile: boolean;
}

export class ContentTitleButton extends React.PureComponent<IContentTitleButtonProps> {
  render() {
    return (
      <OverPack className="home-page-wrapper content11-wrapper">
        <QueueAnim
          type="bottom"
          leaveReverse
          key="page"
          appear={true}
          delay={[0, 100]}
          className="title-wrapper"
        >
          <h1 className="title-h1">
            {"Звучит клево? Тогда дай нам знать и по коням."}
          </h1>
          <span className="title-content">
            {"Записаться с нами на разговор"}
          </span>
        </QueueAnim>
        <TweenOne
          key="button"
          style={{ textAlign: "center" }}
          animation={{ y: 30, opacity: 0, type: "from", delay: 300 }}
        >
          <Button type="primary" className="">
            <a className="button" href=".">
              {"Связаться"}
            </a>
          </Button>
        </TweenOne>
      </OverPack>
    );
  }
}
