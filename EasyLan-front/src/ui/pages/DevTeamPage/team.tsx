import React from "react";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { Row, Col } from "antd";
import QueueAnim from "rc-queue-anim";
import "rc-banner-anim/assets/index.css";

export class TeamModel {
  srmImage?: string;
  title?: string;
  titleJob?: string;
  content?: string;
  md?: number = 6;
  xs?: number = 24;
}

export interface ITeamProps {
  isMobile: boolean;
  models: TeamModel[];
}

class Team extends React.Component<ITeamProps> {

  getBlockChildren = () =>
    this.props.models.map((element, i) => {
      return (
        <Col key={i} className="block" md={element.md} xs={element.xs}>
          <img className="teams1-image" src={element.srmImage} alt="" />
          <h1 className="teams1-title">{element.title}</h1>
          <div className="teams1-job">{element.titleJob}</div>
          <div className="teams1-content">{element.content}</div>
        </Col>
      );
    });

  render() {
    return (
      <div className="home-page-wrapper teams1-wrapper">
        <div className="home-page teams1">
          <div className="title-wrapper">
            <h1>Участники команды</h1>
          </div>
          <OverPack playScale={0.3} className="">
            <QueueAnim
              type="bottom"
              key="block"
              leaveReverse
              className="block-wrapper"
              component={Row}
            >
              {this.getBlockChildren()}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Team;
