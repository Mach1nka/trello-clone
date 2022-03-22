import { Response } from 'express';
import { validationResult } from 'express-validator';

import BaseResponse from '../../utils/base-response';
import BadRequest from '../../utils/errors/bad-request';
import getUserPayload from '../../utils/get-user-payload';
import {
  getBoardsService,
  createBoardService,
  updateNameService,
  shareBoardService,
  deleteService
} from '../services/boards';
import { CustomRequest } from '../../types/common';
import {
  AccessibleBoardsResponse,
  BoardResponse,
  BodyForCreatingBoard,
  BodyForDeletingBoard,
  BodyForRenamingBoard,
  BodyForSharingBoard
} from '../../types/boards/interfaces';

const getAllBoards = async (req: CustomRequest, res: Response) => {
  const { userId } = getUserPayload(req);
  const { ownBoards, sharedBoards } = await getBoardsService({ userId });

  res.json(new BaseResponse<AccessibleBoardsResponse>({ ownBoards, sharedBoards }));
};

const createNewBoard = async (req: CustomRequest<BodyForCreatingBoard>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { userId } = getUserPayload(req);
  const { id, name } = await createBoardService({ ...req.body, userId });

  res.status(201).json(new BaseResponse<BoardResponse>({ id, name }, 201));
};

const updateBoardName = async (req: CustomRequest<BodyForRenamingBoard>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { userId } = getUserPayload(req);
  const { id, name } = await updateNameService({ ...req.body, userId });

  res.json(new BaseResponse<BoardResponse>({ id, name }));
};

const shareBoard = async (req: CustomRequest<BodyForSharingBoard>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  await shareBoardService(req.body);

  res.status(200).json(new BaseResponse({}, 200));
};

const deleteBoard = async (req: CustomRequest<BodyForDeletingBoard>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { userId } = getUserPayload(req);
  await deleteService({ ...req.body, userId });

  res.status(200).json(new BaseResponse({}, 200));
};

export { getAllBoards, createNewBoard, updateBoardName, shareBoard, deleteBoard };
