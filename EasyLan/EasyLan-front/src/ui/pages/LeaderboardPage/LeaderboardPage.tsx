import { ITableProps, kaReducer, Table } from "ka-table";
import { DataType, EditingMode, SortingMode } from "ka-table/enums";
import { DispatchFunc } from "ka-table/types";
import { updateData } from "ka-table/actionCreators";
import React, { ReactElement, useState } from "react";
import { ApiError, ApiFailureResult, ApiResult, ApiSuccessResult } from "../../../data/services/ApiResult";
import "./styles.css";

class PlayerScore {
  public id: number;
  public name: string;
  public score: number;
}

// const dataArray = Array(100).fill(undefined).map(
//   (_, index) => ({
//     column1: `${index + 1}`,
//     column2: `column:2 row:${index}`,
//     column3: `${10000 - index * 100}`,
//     id: index,
//   }),
// );

const tablePropsInit: ITableProps = {
  columns: [
    { key: "id", title: "Ранг", dataType: DataType.Number, style: { width: 100, textAlign: "center" }, },
    { key: "userName", title: "Игрок", dataType: DataType.String, style: { maxWidth: 1000, width: "100%" } },
    { key: "score", title: "Очки", dataType: DataType.Number, style: { width: 100 } },
  ],
  // data: dataArray,
  editingMode: EditingMode.None,
  rowKeyField: "id",
  sortingMode: SortingMode.Single,
  width: "100%",
};

const getScores = (): Promise<ApiResult<PlayerScore[]>> => {
  return new Promise<ApiResult<PlayerScore[]>>((resolve, reject) => {
    fetch("/api/leaderboard/ekb", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      mode: "cors",
    })
      .then((res) => {
        if (res.status !== 200) {
          return reject(ApiError(`Ошибка сервера, ${res.status}`));
        }

        return res.json();
      })
      .catch((e) => {
        console.error(e);
        return reject(ApiError("Ошибка клиента"));
      })
      .then((scores: PlayerScore[]) =>
        resolve(ApiSuccessResult(scores))
      );
  }).then(
    (successResult: ApiSuccessResult<PlayerScore[]>) => successResult,
    (error: ApiFailureResult) => error
  );
};

const initGetScores = (props: ITableProps, dispatch: DispatchFunc) => {
  return () => {
    getScores().then((result) => {
      if (result.success) {
        result.result.forEach((x, i) => { x.id = i + 1; });
        dispatch(updateData(result.result));
      }
    });
  };
};

const LeaderboardPage: React.FunctionComponent<unknown> = (props: unknown): ReactElement => {

  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  const getData = initGetScores(tableProps, dispatch);

  if (!tableProps.data) {
    getData();
  }
  return <div>
    <div className="title-wrapper">
      <h1 className="title">Таблица лидеров</h1>
    </div>
    <div className="tablecontainer">
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </div>
  </div>;
};

export default LeaderboardPage;
