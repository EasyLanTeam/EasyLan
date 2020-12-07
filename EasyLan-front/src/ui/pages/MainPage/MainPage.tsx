import React from "react";
import { ContentAdvantages, ContentAdvantagesData, ContentCapabilities, ContentPartner, ContentPartnerData, ContentProductDataSource, Prices, PricesData } from ".";

export interface IMainPageState {
}

export interface IMainPageProps {
  isMobile: boolean;
}

class MainPage extends React.Component<IMainPageProps, IMainPageState> {
  divRef: React.RefObject<HTMLDivElement>;
  constructor(props: IMainPageProps) {
    super(props);
    this.divRef = React.createRef<HTMLDivElement>();
  }

  componentDidUpdate(){
    this.divRef.current?.scrollIntoView();
  }

  render(): JSX.Element {
    return (
      <div ref={this.divRef}>
        <ContentAdvantages
          id="Content"
          key="Content"
          dataSource={ContentAdvantagesData}
          isMobile={this.props.isMobile}
        />
        <ContentCapabilities
          id="Content3_0"
          key="Content3_0"
          dataSource={ContentProductDataSource}
          isMobile={this.props.isMobile}
        />
        <Prices
          id="Pricing1_0"
          key="Pricing1_0"
          dataSource={PricesData}
          isMobile={this.props.isMobile}
        />
        <ContentPartner
          id="Content12_0"
          key="Content12_0"
          dataSource={ContentPartnerData}
          isMobile={this.props.isMobile}
        />
      </div>
    );
  }
}

export default MainPage;
