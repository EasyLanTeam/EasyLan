import React from "react";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { Row, Col } from "antd";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";

export class FeatureModel {
  srcImg?: string;
  contentTitle?: string;
  content?: string;
}

export interface IFeatureProps {
  isMobile: boolean;
  featureModel: FeatureModel;
  imagePosition: "right" | "left"
}


export class FeatureImage extends React.Component<IFeatureProps> {
  render() {
    const animType = {
      queue: this.props.isMobile ? "bottom" : this.props.imagePosition,
      one: this.props.isMobile
        ? {
          scaleY: "+=0.3",
          opacity: 0,
          type: "from",
          ease: "easeOutQuad",
        }
        : {
          x: this.props.imagePosition === "right" ? "+=30" : "-=30",
          opacity: 0,
          type: "from",
          ease: "easeOutQuad",
        },
    };

    const img = (
      <TweenOne
        key="img"
        animation={animType.one as any}
        resetStyle
        className="content1-img"
        component={Col}
        componentProps={{
          md: 10,
          xs: 24,
        }}
      >
        <span>
          <img
            src="https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ"
            width="100%"
            alt="img"
          />
        </span>
      </TweenOne>
    );

    return (
      <div className="home-page-wrapper content1-wrapper">
        <OverPack
          className="home-page content1"
          playScale={0.3}
          component={Row}
        >
          {(this.props.isMobile || this.props.imagePosition === "left") && img}

          <QueueAnim
            key="text"
            type={animType.queue as any}
            leaveReverse
            ease={["easeOutQuad", "easeInQuad"]}
            className="content1-text"
            component={Col}
            componentProps={{
              md: 14,
              xs: 24,
            }}
          >
            <h2 key="h1" className="content1-title">
              {this.props.featureModel.contentTitle}
            </h2>
            <div key="p" className="content1-content">
              {this.props.featureModel.content}
            </div>
          </QueueAnim>

          {(!this.props.isMobile && this.props.imagePosition === "right") && img}
        </OverPack>
      </div>
    );
  }
}
