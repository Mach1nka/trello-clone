import React, { useState, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, MenuItem, IconButton, Button } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';

import CardsContainer from '../../cards/cards-container';
import RenameColumnModal from './rename-column';
import ChangeColumnPosition from './change-column-position';
import CreateCardModal from '../../cards/components/create-card-modal';
import { deleteColumn } from '../../../store/column/actions';
import { Card as CardType } from '../../../store/card/actions';
import { ColumnSC as SC } from '../sc';

interface Props {
  columnName: string;
  columnId: string;
  position: number;
  boardId: string;
  draggableCard: null | CardType;
  setDraggableCard: Dispatch<SetStateAction<CardType | null>>;
}

const Column: React.FC<Props> = ({
  columnName,
  columnId,
  boardId,
  position,
  draggableCard,
  setDraggableCard
}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenRenameModal, setRenameModalView] = useState(false);
  const [isOpenCreateCardModal, setCreateCardModalView] = useState(false);
  const [isOpenPositionModal, setPositionModalView] = useState(false);
  const isOpenMenu = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    dispatch(deleteColumn({ columnId, boardId }));
    setAnchorEl(null);
  };

  const handleRename = () => {
    setRenameModalView(true);
    setAnchorEl(null);
  };

  const handleChangePosition = () => {
    setPositionModalView(true);
    setAnchorEl(null);
  };

  return (
    <>
      <SC.Container>
        <SC.Content>
          <SC.Header>
            <SC.Name variant="h6">{columnName}</SC.Name>
            <IconButton size="small" aria-label="column settings" onClick={handleMenu}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isOpenMenu}
              keepMounted
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
              <MenuItem onClick={handleRename}>Rename</MenuItem>
              <MenuItem onClick={handleChangePosition}>Change position</MenuItem>
            </Menu>
          </SC.Header>
          <CardsContainer
            columnId={columnId}
            draggableCard={draggableCard}
            setDraggableCard={setDraggableCard}
          />
          <SC.Footer>
            <Button
              onClick={() => setCreateCardModalView(true)}
              fullWidth
              size="small"
              startIcon={<AddIcon />}
            >
              Create new card
            </Button>
          </SC.Footer>
        </SC.Content>
      </SC.Container>
      <RenameColumnModal
        isOpen={isOpenRenameModal}
        columnId={columnId}
        setModalView={setRenameModalView}
        columnName={columnName}
      />
      <ChangeColumnPosition
        position={position}
        boardId={boardId}
        isOpen={isOpenPositionModal}
        columnId={columnId}
        setModalView={setPositionModalView}
      />
      <CreateCardModal
        isOpen={isOpenCreateCardModal}
        columnId={columnId}
        setModalView={setCreateCardModalView}
      />
    </>
  );
};

export default Column;