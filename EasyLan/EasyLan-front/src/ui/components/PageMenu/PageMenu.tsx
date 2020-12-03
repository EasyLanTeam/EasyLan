import * as React from "react";
import cn from "classnames";

import styles from "./PageMenu.style.scss";

interface IPageMenuProps extends React.AllHTMLAttributes<HTMLDivElement> {}
interface IPageMenuItemProps {
  children: React.ReactNode;
  active?: boolean;
}

const PageMenuItem: React.FunctionComponent<IPageMenuItemProps> = (
  props: IPageMenuItemProps
) => {
  const { active } = props;

  return (
    <div className={cn(styles.menuItem, active && styles.menuItemActive)}>
      {props.children}
    </div>
  );
};

PageMenuItem.defaultProps = {
  active: false,
};

type PageMenu = {
  Item: typeof PageMenuItem;
} & React.FunctionComponent<IPageMenuProps>;

const PageMenuImplementation: PageMenu = (((props: IPageMenuProps) => {
  return <div className={styles.menu}>{props.children}</div>;
}) as unknown) as PageMenu;

PageMenuImplementation.Item = PageMenuItem;

export default PageMenuImplementation;
