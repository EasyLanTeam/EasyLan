import { FeatureModel } from "./";

export default interface IFeatureProps {
  isMobile: boolean;
  featureModel: FeatureModel;
  imagePosition: "right" | "left";
  // eslint-disable-next-line semi
}
