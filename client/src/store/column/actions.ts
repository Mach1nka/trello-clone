const PUT_BOARD_COLUMNS = 'PUT_BOARD_COLUMNS';
const PUT_CREATED_COLUMN = 'PUT_CREATED_COLUMN';
const PUT_RENAMED_COLUMN = 'PUT_RENAMED_COLUMN';
const PUT_COLUMN_WITH_NEW_POSITION = 'PUT_COLUMN_WITH_NEW_POSITION';
const DELETE_COLUMN = 'DELETE_COLUMN';
const GET_COLUMNS = 'GET_COLUMNS';
const CREATE_COLUMN = 'CREATE_COLUMN';
const RENAME_COLUMN = 'RENAME_COLUMN';
const CHANGE_COLUMN_POSITION = 'CHANGE_COLUMN_POSITION';
const DELETE_COLUMNS_DATA = 'DELETE_COLUMNS_DATA';

export interface Column {
  id: string;
  name: string;
  boardId: string;
  position: number;
}

export interface DataForCreatingColumn {
  boardId: string;
  name: string;
  position: number;
}

export interface DataForRenamingColumn {
  columnId: string;
  newName: string;
}

export interface DataForUpdatingColumnPos {
  columnId: string;
  boardId: string;
  newPosition: number;
}

export interface DataForDeletingColumn {
  columnId: string;
  boardId: string;
}

const getColumns = (boardId: string): { type: string; payload: string } => ({
  type: GET_COLUMNS,
  payload: boardId
});

const createColumn = (
  data: DataForCreatingColumn
): { type: string; payload: DataForCreatingColumn } => ({
  type: CREATE_COLUMN,
  payload: data
});

const renameColumn = (
  data: DataForRenamingColumn
): { type: string; payload: DataForRenamingColumn } => ({
  type: RENAME_COLUMN,
  payload: data
});

const changeColumnPosition = (
  data: DataForUpdatingColumnPos
): { type: string; payload: DataForUpdatingColumnPos } => ({
  type: CHANGE_COLUMN_POSITION,
  payload: data
});

const deleteColumn = (
  data: DataForDeletingColumn
): { type: string; payload: DataForDeletingColumn } => ({
  type: DELETE_COLUMN,
  payload: data
});

const putColumns = (columns: Column[]): { type: string; payload: Column[] } => ({
  type: PUT_BOARD_COLUMNS,
  payload: columns
});

const putCreatedColumn = (newColumn: Column): { type: string; payload: Column } => ({
  type: PUT_CREATED_COLUMN,
  payload: newColumn
});

const putRenamedColumn = (renamedColumn: Column): { type: string; payload: Column } => ({
  type: PUT_RENAMED_COLUMN,
  payload: renamedColumn
});

const putUpdatedPos = (columnWithNewPos: Column[]): { type: string; payload: Column[] } => ({
  type: PUT_COLUMN_WITH_NEW_POSITION,
  payload: columnWithNewPos
});

const deleteAllColumns = (): { type: string } => ({ type: DELETE_COLUMNS_DATA });

export {
  PUT_BOARD_COLUMNS,
  PUT_CREATED_COLUMN,
  PUT_COLUMN_WITH_NEW_POSITION,
  PUT_RENAMED_COLUMN,
  GET_COLUMNS,
  CREATE_COLUMN,
  RENAME_COLUMN,
  CHANGE_COLUMN_POSITION,
  DELETE_COLUMN,
  DELETE_COLUMNS_DATA,
  getColumns,
  createColumn,
  renameColumn,
  changeColumnPosition,
  deleteColumn,
  putColumns,
  putCreatedColumn,
  putRenamedColumn,
  putUpdatedPos,
  deleteAllColumns
};