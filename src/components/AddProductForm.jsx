import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Select,
  Input,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createProduct } from "../actions/product";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));


const tags = [1,2,3,4,5];

const productSchema = yup.object().shape({
  title: yup.string().required(), 
  tag:yup.mixed().oneOf(tags),
});

const AddProductForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = (data) => {
    dispatch(createProduct({ ...data, image: file }));
    clearForm();
  };

  const clearForm = () => {
    reset();
    setFile(null);
    handleClose();
  };

  const classes = useStyles();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle> neues Produkt erstellen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Füllen Sie das folgende Formular aus, um ein neues Produkt
          hinzuzufügen.
        </DialogContentText>
        <div className={classes.root}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="title"
              label="Titel"
              name="title"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.title ? true : false}
              fullWidth
            />
            <Controller
              as={
                <Select
                  input={<Input />}
                  className={classes.textField}
                  fullWidth
                >
                  {tags.map((tag, index) => (
                    <MenuItem key={index} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              }
              name="tag"
              control={control}
              error={errors.tag ? true : false}
              defaultValue={tags[tags.length - 1]}
            />

            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setFile(base64)}
            />
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={clearForm} color="inherit">
          stornieren
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="outlined"
          onClick={() => handleSubmit(onSubmit)()}
        >
          hinzufügen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductForm;
