import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Select, Input, MenuItem, Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateProduct } from "../actions/product";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
}));

const tags = [1,2,3,4,5];

const productSchema = yup.object().shape({
  title: yup.string().required(),
  tag: yup.mixed().oneOf(tags),
});

const EditProductForm = ({ history, product, closeEditMode }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(product?.image);
  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = (data) => {
    const updatedProduct = {
      _id: product._id,
      ...data,
      image: file,
    };
    dispatch(updateProduct(product._id, updatedProduct));

    reset();
    setFile(null);
    closeEditMode();
  };

  const classes = useStyles();
  return (
    <div>
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
          defaultValue={product?.title}
        />
        <Controller
          as={
            <Select input={<Input />} className={classes.textField}>
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
          defaultValue={product?.tag}
        />
        <div>
          <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
        </div>
        <div className={classes.buttons}>
          <Button color="secondary" variant="outlined" onClick={closeEditMode}>
            stornieren
          </Button>{" "}
          <Button color="primary" variant="outlined" type="submit">
            speichern
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
