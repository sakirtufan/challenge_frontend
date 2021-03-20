import React from "react";
import { useSelector } from "react-redux";
import { Grid  } from "@material-ui/core";
import Product from "./Product";


const ProductsList = () => {
  const products = useSelector((state) => state.products.products);  

  return (
    <>
      <Grid container spacing={2} alignContent="stretch">
        {products.length > 0 &&
          products
            .sort((a, b) => {
              return a.tag < b.tag ? -1 : 1;
            })
            .map((product) => (
              <Grid item key={product?._id} xs={12} md={3}>
                <Product {...product} />
              </Grid>
            ))}
      </Grid>
    </>
  );
};

export default ProductsList;
