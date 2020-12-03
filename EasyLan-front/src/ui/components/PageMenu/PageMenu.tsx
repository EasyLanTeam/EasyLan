import * as React from "react";
import cn from "classnames";

import styles from "./PageMenu.style.scss";
import { NavLink } from "react-router-dom";

interface IPageMenuProps extends React.AllHTMLAttributes<HTMLDivElement> {}
interface IPageMenuItemProps {
  children: React.ReactNode;
  linkTo: string;
}

const PageMenuItem: React.FunctionComponent<IPageMenuItemProps> = (
  props: IPageMenuItemProps
) => {
  const { linkTo } = props;

  return (
    <NavLink
      to={linkTo}
      className={cn(styles.menuItem)}
      activeClassName={styles.menuItemActive}
      exact
    >
      {/* <div className={cn(styles.menuItem, active && styles.menuItemActive)}> */}
      {props.children}
      {/* </div> */}
    </NavLink>
  );
};

type PageMenu = {
  Item: typeof PageMenuItem;
} & React.FunctionComponent<IPageMenuProps>;

const PageMenuImplementation: PageMenu = (((props: IPageMenuProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>{props.children}</div>
    </div>
  );
}) as unknown) as PageMenu;

PageMenuImplementation.Item = PageMenuItem;

export default PageMenuImplementation;
