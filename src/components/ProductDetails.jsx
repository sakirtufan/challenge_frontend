import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Divider, Button, Chip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditProductForm from "./EditProductForm";
import { fetchSingleProduct, deleteProduct } from "../actions/product";
import noImage from "../images/images.jpeg";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(8),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  content: {
    marginTop: theme.spacing(3),
  },
  image: {
    width: "100%",
    borderRadius: 5,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  chip: {
    marginTop: theme.spacing(1),
  },
}));

const ProductDetails = ({ history, location, match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();

  const currentProduct = useSelector((state) => state.products.currentProduct);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  const removeProduct = () => {
    dispatch(deleteProduct(currentProduct._id));
    history.push("/products");
  };

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={0}>
      {editMode ? (
        <EditProductForm product={currentProduct} closeEditMode={closeEditMode} />
      ) : (
        <div>
          <div className={classes.header}>
            <Typography variant="h5" gutterBottom>
              {currentProduct?.title}
            </Typography>
            <div>
              <Button
                color="primary"
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={openEditMode}
              >
                bearbeiten
              </Button>{" "}
              <Button
                color="secondary"
                variant="outlined"
                onClick={removeProduct}
                startIcon={<DeleteIcon />}
              >
                löschen
              </Button>
            </div>
          </div>
          <Divider />
          <Typography variant="caption" component="p" gutterBottom>
            {convertRelativeTime(currentProduct?.createdAt)} by Sakir
          </Typography>
          <Chip
            label={`${currentProduct?.tag}`}
            variant="outlined"
            className={classes.chip}
          />

          <div className={classes.content}>
            <img
              src={currentProduct?.image || noImage}
              alt="Product"
              className={classes.image}
            />
          </div>
        </div>
      )}
    </Paper>
  );
};

export default ProductDetails;
