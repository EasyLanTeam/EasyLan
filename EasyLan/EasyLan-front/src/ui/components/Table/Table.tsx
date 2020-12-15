import * as React from "react";
import styles from "./Table.style.scss";
import cn from "classnames";

interface ITableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

const TableHead: React.FunctionComponent<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return <thead>{children}</thead>;
};

const TableBody: React.FunctionComponent<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return <tbody>{children}</tbody>;
};

const TableRow: React.FunctionComponent<
  React.HTMLAttributes<HTMLTableRowElement>
> = ({ children }: React.HTMLAttributes<HTMLTableRowElement>) => {
  return <tr className={styles.row}>{children}</tr>;
};

const TableCell: React.FunctionComponent<
  React.HTMLAttributes<HTMLTableCellElement>
> = ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => {
  return <td className={styles.cell}>{children}</td>;
};

const TableHeadCell: React.FunctionComponent<
  React.HTMLAttributes<HTMLTableHeaderCellElement>
> = ({ children }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => {
  return <th className={cn(styles.cell, styles.cellHead)}>{children}</th>;
};

type Table = {
  Head: typeof TableHead;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Cell: typeof TableCell;
  HeadCell: typeof TableHeadCell;
} & React.FunctionComponent<ITableProps>;

const TableImplementation: Table = ((({ children }: ITableProps) => {
  return <table className={styles.table}>{children}</table>;
}) as unknown) as Table;

TableImplementation.Head = TableHead;
TableImplementation.Body = TableBody;
TableImplementation.Row = TableRow;
TableImplementation.Cell = TableCell;
TableImplementation.HeadCell = TableHeadCell;

export default TableImplementation;
