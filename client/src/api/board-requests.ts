import { serverURL } from './api-data';
import {
  DataForRenamingBoard,
  DataForCreatingBoard,
  DataForDeletingBoard
} from '../store/board/actions';
import getToken from '../../utils/get-token';

function getBoards(): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/boards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    }
  })
    .then((resp) => (resp.status === 401 ? resp.status : resp.json()))
    .catch((error) => error);
}

function createBoard(data: DataForCreatingBoard): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/board`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    },
    body: JSON.stringify(data)
  })
    .then((resp) => (resp.status === 401 ? resp.status : resp.json()))
    .catch((error) => error);
}

function updateBoardName(data: DataForRenamingBoard): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/board`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    },
    body: JSON.stringify(data)
  })
    .then((resp) => (resp.status === 401 ? resp.status : resp.json()))
    .catch((error) => error);
}

function deleteBoard(data: DataForDeletingBoard): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/board`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    },
    body: JSON.stringify(data)
  })
    .then((resp) => (resp.status === 401 ? resp.status : resp.json()))
    .catch((error) => error);
}

export { getBoards, createBoard, updateBoardName, deleteBoard };
