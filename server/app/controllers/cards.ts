import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import BaseResponse from '../../utils/base-response';
import BadRequest from '../../utils/errors/bad-request';
import {
  getCardsService,
  createCardService,
  updateNameService,
  updateDescriptionService,
  updatePositionService,
  deleteService
} from '../services/cards';

const getCards = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { columnId } = req.params;

  const cards = await getCardsService(columnId);
  res.json(new BaseResponse(cards));
};

const createNewCard = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const createdCard = await createCardService(req.body);
  res.status(201).json(new BaseResponse(createdCard, 201));
};

const updateCardName = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const renamedCard = await updateNameService(req.body);
  res.json(new BaseResponse(renamedCard));
};

const updateCardDescription = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const updatedCard = await updateDescriptionService(req.body);
  res.json(new BaseResponse(updatedCard));
};

const updateCardPosition = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const cards = await updatePositionService(req.body);
  res.json(new BaseResponse(cards));
};

const changeCardStatus = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  await updatePositionService(req.body);
  res.status(204).json(new BaseResponse({}, 204));
};

const deleteCard = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  await deleteService(req.body);
  res.status(204).json(new BaseResponse({}, 204));
};

export {
  getCards,
  createNewCard,
  updateCardName,
  updateCardDescription,
  updateCardPosition,
  changeCardStatus,
  deleteCard
};
