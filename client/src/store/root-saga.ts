import { all, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { watchUserRegistration, watchUserLogin } from './auth/saga';
import { watchGetBoards, watchCreateBoard, watchRenameBoard, watchDeleteBoard } from './board/saga';
import {
  watchGetColumns,
  watchCreateColumn,
  watchRenameColumn,
  watchDeleteColumn,
  watchChangeColumnPos
} from './column/saga';

export default function* rootSaga(): SagaIterator {
  yield all([
    call(watchUserRegistration),
    call(watchUserLogin),
    call(watchGetBoards),
    call(watchCreateBoard),
    call(watchRenameBoard),
    call(watchDeleteBoard),
    call(watchGetColumns),
    call(watchCreateColumn),
    call(watchRenameColumn),
    call(watchChangeColumnPos),
    call(watchDeleteColumn)
  ]);
}
