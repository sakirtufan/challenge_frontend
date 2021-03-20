import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ProductsList from "./components/ProductsList"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MenuBook";
import PenIcon from "@material-ui/icons/Create";
import AddProductForm from "./components/AddProductForm";
import { fetchProducts } from "./actions/product";
import ProductDetails from "./components/ProductDetails";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));

const App = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              color="secondary"
              className={classes.title}
            >
              <a href="http://localhost:3000/products">meine Einkaufsliste</a>
            </Typography>

            <Button
              color="primary"
              variant="outlined"
              startIcon={<PenIcon />}
              onClick={handleOpen}
            >
              Produkt hinzufügen
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Router>
              <Switch>
                <Route exact path="/products" component={ProductsList} />
                <Route exact path="/products/:id" component={ProductDetails} />
              </Switch>
              <Redirect from="/" to="/products" />
            </Router>
          </Grid>
        </Grid>
      </Container>
      <AddProductForm open={open} handleClose={handleClose} />
    </>
  );
};

export default App;
