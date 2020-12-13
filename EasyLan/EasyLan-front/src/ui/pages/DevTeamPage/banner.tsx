import React from "react";
import { DownOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";

export interface IBannerProps { }

export class Banner extends React.PureComponent<IBannerProps> {
  // private eclipse: Eclipse | null = null;
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: IBannerProps) {
    super(props);
  }

  private getCanvasStyle(): React.CSSProperties {
    const promAlert = {
      position: "fixed",
      zIndex: -1,
      top: "0",
      left: "0",
      width: "100%",
    } as React.CSSProperties;

    return promAlert;
  }

  render() {
    return (
      <div className="banner">
        <canvas style={this.getCanvasStyle()} id="banner_canvas"></canvas>
        <QueueAnim
          key="QueueAnim"
          type={["bottom", "top"]}
          delay={200}
          className="banner-text-wrapper"
        >
          <div key="title" className="banner-title">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fih1.redbubble.net%2Fimage.506289842.2272%2Fap%2C550x550%2C16x12%2C1%2Ctransparent%2Ct.u2.png&f=1&nofb=1"
              width="100%"
              alt="img"
            />
          </div>
          <div key="content" className="banner-content">
            {"Играй, уничтожай, выигрывай."}
          </div>
          {/* <Button ghost key="button" {...dataSource.button}>
            {dataSource.button.children}
          </Button> */}
        </QueueAnim>
        <TweenOne
          animation={{
            y: "-=20",
            yoyo: true,
            repeat: -1,
            duration: 1000,
          }}
          className="banner-icon"
          key="icon"
        >
          <DownOutlined />
        </TweenOne>
      </div>
    );
  }
}
