import React from "react";
import QueueAnim from "rc-queue-anim";
import { Row, Col } from "antd";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { getChildrenToRender, IDefaultProps } from ".";

export class ContentAdvantages extends React.PureComponent<IDefaultProps> {
  constructor(props: IDefaultProps) {
    super(props);
  }

  render() {
    const { dataSource, ...props } = this.props;
    const {
      wrapper,
      titleWrapper,
      page,
      OverPack: overPackData,
      childWrapper,
    } = dataSource;
    return (
      <div {...props} {...wrapper}>
        <div {...page}>
          <div {...titleWrapper}>
            {titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack {...overPackData}>
            <QueueAnim
              type="bottom"
              key="block"
              leaveReverse
              component={Row}
              componentProps={childWrapper}
            >
              {childWrapper.children.map(
                (
                  block: { [x: string]: any; children: any },
                  i: { toString: () => string | number | null | undefined }
                ) => {
                  const { children: item, ...blockProps } = block;
                  return (
                    <Col key={i.toString()} {...blockProps}>
                      <div {...item}>
                        {item.children.map(getChildrenToRender)}
                      </div>
                    </Col>
                  );
                }
              )}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}
