import React from "react";
import { ContentAdvantages, ContentAdvantagesData, ContentCapabilities, ContentPartner, ContentPartnerData, ContentProductDataSource, Prices } from ".";
import Footer from "../MainPage/footer";
import { Banner } from "./banner";
import { ContentTitleButton } from "./contentTitleButton";
import "./css/ClubLandingPage.css";

export interface IClubLandingPageState {
}

export interface IClubLandingPageProps {
  isMobile: boolean;
}

class ClubLandingPage extends React.Component<IClubLandingPageProps, IClubLandingPageState> {
  divRef: React.RefObject<HTMLDivElement>;
  constructor(props: IClubLandingPageProps) {
    super(props);
    this.divRef = React.createRef<HTMLDivElement>();
  }

  componentDidUpdate() {
    this.divRef.current?.scrollIntoView();
  }

  render(): JSX.Element {
    return (
      <div ref={this.divRef}>
        <Banner />
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
          dataSource={null}
          isMobile={this.props.isMobile}
        />
        {/* <ContentPartner
          id="Content12_0"
          key="Content12_0"
          dataSource={ContentPartnerData}
          isMobile={this.props.isMobile}
        /> */}
        <ContentTitleButton isMobile={this.props.isMobile} />
        <Footer isMobile={this.props.isMobile} />
      </div>
    );
  }
}

export default ClubLandingPage;
