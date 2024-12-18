import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, CardContent, Container, Divider, Grid, List, ListItem, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { allProducts, getAllCategories, getProductByCategory, searchProduct } from "@/redux/cmsSlice";

const AllProducts = () => {
  const router = useRouter();
  const { query } = router;
  const { category, search } = query; // Fetch category and search from query params
  const { dataList, loading, error, allCategories, productsByCategory, searchedProducts } = useSelector((x) => x?.Cms);
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");

  // Fetch all products and categories on initial render
  useEffect(() => {
    dispatch(allProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  // Fetch products by category whenever the category changes
  useEffect(() => {
    if (category) {
      dispatch(getProductByCategory(category));
    }
  }, [category, dispatch]);

  // Fetch searched products whenever the search query changes
  useEffect(() => {
    if (search) {
      dispatch(searchProduct(search));
    }
  }, [search, dispatch]);

  // Determine which product list to display
  const productsToDisplay = search ? searchedProducts : category ? productsByCategory : dataList;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        marginTop: "4rem",
        marginBottom: "4rem",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <Grid container spacing={2}>
          {/* Sidebar for Categories */}
          <Grid item xs={12} sm={4} md={3}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
              >
                Product Categories
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <List>
                {allCategories.length > 0 ? (
                  allCategories.map((category) => (
                    <ListItem
                      key={category.slug}
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateX(10px)",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          backgroundColor: "#e3f2fd",
                        },
                      }}
                    >
                      <Button
                        fullWidth
                        style={{
                          textTransform: "capitalize",
                          textAlign: "left",
                          color: "#1976d2",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          router.push(`?category=${category.slug}`);
                        }}
                      >
                        {category.name}
                      </Button>
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={{ textAlign: "center", color: "#666" }}>
                    No categories available
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>

          {/* Main Content Area */}
          <Grid item xs={12} sm={8} md={9}>
            <Container maxWidth="lg">
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#000",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                {search
                  ? `Search Results for "${search}"`
                  : category
                  ? `${category} Products`
                  : "All Products"}
              </Typography>

              {/* Search Bar */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  mt: 2,
                  mb: 2,
                }}
              >
                <TextField
                  variant="outlined"
                  type="search"
                  name="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search..."
                  sx={{ width: "300px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push(`/cms/all-products?search=${searchInput}`)}
                  sx={{ height: "56px" }}
                >
                  Search
                </Button>
              </Box>

              {/* Display Products */}
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: "20px" }}
              >
                {Array.isArray(productsToDisplay) && productsToDisplay.length > 0 ? (
                  productsToDisplay.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Card
                        sx={{
                          boxShadow: 3,
                          borderRadius: 2,
                          overflow: "hidden",
                          transition: "transform 0.2s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            height: 250,
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#f9f9f9",
                          }}
                        >
                          <img
                            src={item?.images?.[0] || "/placeholder-image.png"} // Use a placeholder if no image is available
                            alt={item.title}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "#333" }}
                          >
                            {item.title || "No Title"}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#757575", marginBottom: "8px" }}
                          >
                            Brand: {item.brand || "N/A"}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#757575", marginBottom: "8px" }}
                          >
                            {item.description || "No Description"}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#4caf50",
                              fontWeight: "bold",
                              marginBottom: "16px",
                            }}
                          >
                            Price: ${item.price ? item.price.toFixed(2) : "N/A"}
                          </Typography>
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            component={Link}
                            href={`/cms/all-products/${item.id}`}
                          >
                            See More
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Typography
                    variant="h6"
                    sx={{ color: "#757575", textAlign: "center" }}
                  >
                    No Products Available
                  </Typography>
                )}
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AllProducts;
