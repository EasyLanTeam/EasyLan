import React from "react";
import { ContentAdvantages, ContentAdvantagesData, ContentCapabilities, ContentPartner, ContentPartnerData, ContentProductDataSource, Prices } from ".";
import { Banner } from "./banner";
import "./css/MainPage.css";
import Footer, { FooterModel } from "./footer";

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

  componentDidUpdate() {
    this.divRef.current?.scrollIntoView();
  }

  getFooterModel(): FooterModel[] {
    const footerData =
      [
        {
          xs: 24,
          md: 8,
          title: "Навигация",
          children: [
            { href: "#", content: "Справочная информация" },
            { href: "#", content: "Предложения и пожелания" },
          ],
        },
        {
          xs: 24,
          md: 8,
          title: "Карта сайта",
          children: [
            { href: "#", content: "О нас" },
            { href: "#", content: "Команда" },
          ],
        },
        {
          xs: 24,
          md: 8,
          title: "Наши партнеры",
          children: [
            { href: "#", content: "SBER" },
          ],
        },
      ];
    // экспериментальный подход !
    const model = JSON.parse(JSON.stringify(footerData)) as FooterModel[];
    return model;
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
        <ContentPartner
          id="Content12_0"
          key="Content12_0"
          dataSource={ContentPartnerData}
          isMobile={this.props.isMobile}
        />
        <Footer isMobile={this.props.isMobile} />
      </div>
    );
  }
}

export default MainPage;
