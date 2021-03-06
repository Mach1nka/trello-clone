import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle } from '@material-ui/core';

import { useAppSelector } from '../../../store/hooks';
import { createCard } from '../../../store/card/actions';
import { CreateCardForm as Form, SubmitButton } from '../sc';
import { configValidationSchema } from '../utils';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
}

const CreateCardModal: React.FC<Props> = ({ isOpen, setModalView, columnId }) => {
  const dispatch = useDispatch();
  const positionOfNewCard = useAppSelector((state) =>
    state.cardsData[columnId] ? state.cardsData[columnId].length : 0
  );
  const validationSchema = configValidationSchema;
  const initialValues = { name: '', description: '' };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        createCard({
          name: values.name.trim(),
          columnId,
          description: values.description.trim(),
          position: positionOfNewCard
        })
      );
      setModalView(false);
    }
  });

  const onClose = useCallback(() => setModalView(false), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>Create new card</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="normal"
          variant="outlined"
          id="name"
          name="name"
          label="Card name"
          type="string"
          autoFocus
          onChange={formik.handleChange}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          size="medium"
          margin="normal"
          variant="outlined"
          id="description"
          name="description"
          label="Card description"
          type="string"
          onChange={formik.handleChange}
          error={formik.touched.description && !!formik.errors.description}
          helperText={formik.touched.description && formik.errors.description}
        />
        <DialogActions style={{ padding: '10px 0' }}>
          <SubmitButton size="small" type="submit" variant="contained">
            Create
          </SubmitButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default CreateCardModal;
