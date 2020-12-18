import React from "react";
import Footer from "../MainPage/footer";
import { Banner } from "./banner";
// import "./css/DevTeamPage.css";
import { FeatureImage, FeatureModel } from "./featureImage";
import Team from "./team";

export interface IDevTeamPageState {
}

export interface IDevTeamPageProps {
  isMobile: boolean;
}

export class TeamMemberModel {
  srmImage?: string;
  title?: string;
  titleJob?: string;
  content?: string;
  md?: number = 6;
  xs?: number = 24;
}


class DevTeamPage extends React.Component<IDevTeamPageProps, IDevTeamPageState> {
  divRef: React.RefObject<HTMLDivElement>;
  constructor(props: IDevTeamPageProps) {
    super(props);
    this.divRef = React.createRef<HTMLDivElement>();
  }

  componentDidUpdate() {
    this.divRef.current?.scrollIntoView();
  }

  createTeamsModel(): TeamMemberModel[] {
    const result = Array<TeamMemberModel>();

    const model1 = new TeamMemberModel();
    model1.srmImage = this.teamsData.data1.srmImage;
    model1.title = this.teamsData.data1.title;
    model1.titleJob = this.teamsData.data1.titleJob;
    model1.content = this.teamsData.data1.content;

    const model2 = new TeamMemberModel();
    model2.srmImage = this.teamsData.data2.srmImage;
    model2.title = this.teamsData.data2.title;
    model2.titleJob = this.teamsData.data2.titleJob;
    model2.content = this.teamsData.data2.content;

    const model3 = new TeamMemberModel();
    model3.srmImage = this.teamsData.data3.srmImage;
    model3.title = this.teamsData.data3.title;
    model3.titleJob = this.teamsData.data3.titleJob;
    model3.content = this.teamsData.data3.content;

    const model4 = new TeamMemberModel();
    model4.srmImage = this.teamsData.data4.srmImage;
    model4.title = this.teamsData.data4.title;
    model4.titleJob = this.teamsData.data4.titleJob;
    model4.content = this.teamsData.data4.content;

    result.push(model1, model2, model3, model4);

    return result;
  }

  private featureData = {
    data1: {
      srcImg:
        "https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ",
      contentTitle: "Борис Ельцин - я чудом выжил",
      content:
        "Каждый из нас понимает очевидную вещь: семантический разбор внешних противодействий способствует повышению качества модели развития. Банальные, но неопровержимые выводы, а также сделанные на базе интернет-аналитики выводы будут разоблачены. В частности, экономическая повестка сегодняшнего дня не оставляет шанса для позиций, занимаемых участниками в отношении поставленных задач. С другой стороны, начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании форм воздействия.",
    },
    data2: {
      srcImg:
        "https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ",
      contentTitle: "Владимир Ленин - лежу пержу",
      content:
        "Каждый из нас понимает очевидную вещь: семантический разбор внешних противодействий способствует повышению качества модели развития. Банальные, но неопровержимые выводы, а также сделанные на базе интернет-аналитики выводы будут разоблачены. В частности, экономическая повестка сегодняшнего дня не оставляет шанса для позиций, занимаемых участниками в отношении поставленных задач. С другой стороны, начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании форм воздействия.",
    },
    data3: {
      srcImg:
        "https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ",
      contentTitle: "Лев Троцкий - я проиграл",
      content:
        "Но активно развивающиеся страны третьего мира освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, ограничены исключительно образом мышления. Повседневная практика показывает, что существующая теория влечет за собой процесс внедрения и модернизации прогресса профессионального сообщества.",
    },
    data4: {
      srcImg:
        "https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ",
      contentTitle: "Никита Хрущёв - пил пью",
      content:
        "А также ключевые особенности структуры проекта, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объявлены нарушающими общечеловеческие нормы этики и морали! Приятно, граждане, наблюдать, как стремящиеся вытеснить традиционное производство, нанотехнологии ",
    },
  };

  private teamsData = {
    data1: {
      srmImage:
        "https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ",
      title: "Борис Ельцин",
      titleJob: "CEO",
      content:
        "Являясь всего лишь частью общей картины, действия представителей оппозиции являются только методом политического участия.",
      md: 6,
      xs: 24,
    },
    data2: {
      srmImage:
        "https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ",
      title: "Лев Троцкий",
      titleJob: "Full-stack developer",
      content:
        "В целом, конечно, постоянное информационно-пропагандистское обеспечение нашей деятельности предопределяет высокую востребованность стандартных подходов.",
      md: 6,
      xs: 24,
    },
    data3: {
      srmImage:
        "https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ",
      title: "Владимир Ленин",
      titleJob: "Full-stack developer",
      content:
        "Есть над чем задуматься: реплицированные с зарубежных источников, современные исследования указаны как претенденты на роль ключевых факторов.",
      md: 6,
      xs: 24,
    },
    data4: {
      srmImage:
        "https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ",
      title: "Никита Хрущёв",
      titleJob: "Full-stack developer",
      content:
        "Ясность нашей позиции очевидна: современная методология разработки говорит о возможностях экспериментов, поражающих по своей масштабности и грандиозности.",
      md: 6,
      xs: 24,
    },
  };

  createFeatureModel(
    srcImg?: string,
    contentTitle?: string,
    content?: string
  ): FeatureModel {
    const model = new FeatureModel();
    model.srcImg = srcImg;
    model.contentTitle = contentTitle;
    model.content = content;
    return model;
  }

  render(): JSX.Element {
    return (
      <div ref={this.divRef}>
        <Banner />
        <Team models={this.createTeamsModel()} isMobile={this.props.isMobile} />
        <FeatureImage
          featureModel={this.createFeatureModel(
            this.featureData.data1.srcImg,
            this.featureData.data1.contentTitle,
            this.featureData.data1.content
          )}
          imagePosition="left"
          isMobile={this.props.isMobile}
        />
        <FeatureImage
          featureModel={this.createFeatureModel(
            this.featureData.data2.srcImg,
            this.featureData.data2.contentTitle,
            this.featureData.data2.content
          )}
          imagePosition="right"
          isMobile={this.props.isMobile}
        />
        <Footer isMobile={this.props.isMobile} />
      </div>
    );
  }
}

export default DevTeamPage;
