import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  DELETE_BOARD,
  GET_BOARDS,
  CREATE_BOARD,
  RENAME_BOARD,
  putUserBoards,
  putCreatedBoard,
  putRenamedBoard,
  BoardList,
  Board,
  DataForCreatingBoard,
  DataForRenamingBoard,
  DataForDeletingBoard
} from './actions';
import { signOutUser } from '../auth/actions';
import { getBoards, createBoard, updateBoardName, deleteBoard } from '../../api/board-requests';
import { removeAuthDataFromLocalStorage } from '../../../utils/auth-data-localstorage';

function* workerGetBoards(): SagaIterator {
  const data: BoardList | number = yield call(getBoards);
  if (data === 401) {
    removeAuthDataFromLocalStorage();
    yield put(signOutUser());
  } else {
    yield put(putUserBoards(data as BoardList));
  }
}

function* watchGetBoards(): SagaIterator {
  yield takeEvery(GET_BOARDS, workerGetBoards);
}

function* workerCreateBoard(boardData: { type: string; payload: DataForCreatingBoard }) {
  const data: Board | number = yield call(createBoard, boardData.payload);
  if (data === 401) {
    removeAuthDataFromLocalStorage();
    yield put(signOutUser());
  } else {
    yield put(putCreatedBoard(data as Board));
  }
}

function* watchCreateBoard(): SagaIterator {
  yield takeEvery(CREATE_BOARD, workerCreateBoard);
}

function* workerRenameBoard(board: { type: string; payload: DataForRenamingBoard }) {
  const data: Board | number = yield call(updateBoardName, board.payload);
  if (data === 401) {
    removeAuthDataFromLocalStorage();
    yield put(signOutUser());
  } else {
    yield put(putRenamedBoard(data as Board));
  }
}

function* watchRenameBoard(): SagaIterator {
  yield takeEvery(RENAME_BOARD, workerRenameBoard);
}

function* workerDeleteBoard(board: { type: string; payload: DataForDeletingBoard }) {
  yield call(deleteBoard, board.payload);
  const data: BoardList | number = yield call(getBoards);
  if (data === 401) {
    removeAuthDataFromLocalStorage();
    yield put(signOutUser());
  } else {
    yield put(putUserBoards(data as BoardList));
  }
}

function* watchDeleteBoard(): SagaIterator {
  yield takeEvery(DELETE_BOARD, workerDeleteBoard);
}

export { watchGetBoards, watchCreateBoard, watchRenameBoard, watchDeleteBoard };
