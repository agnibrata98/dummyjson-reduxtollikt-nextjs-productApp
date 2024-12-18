import axiosInstance from "@/api/axios/axios";
import { endpoints } from "@/api/endPoints/endPoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    // redirect_to: null,
    dataList:[],
    allCategories:[],
    productDetails:{},
    productsByCategory:[],
    searchedProducts:[],
}


export const allProducts = createAsyncThunk(
    "allProducts",
    async () => {
        let response = await axiosInstance.get(endpoints.product.allProducts);
        // console.log(response, "response");
        let result = response?.data;
        // console.log(result, "result");
        return result;
    }
)

export const getAllCategories = createAsyncThunk(
    "allCategories",
    async () => {
        let response = await axiosInstance.get(endpoints.product.productCategories);
        // console.log(response, "response");
        let result = response?.data;
        // console.log(result, "result");
        return result;
    }
)

export const getProductDetails = createAsyncThunk(
    "productsDetails",
    async (id) => {
        let response = await axiosInstance.get(`${endpoints.product.singleProduct}/${id}`);
        // console.log(response, "response");
        let result = response?.data;
        // console.log(result, "result");
        return result;
    }
)

export const getProductByCategory = createAsyncThunk(
    "productsByCategory",
    async (slug) => {
        let response = await axiosInstance.get(`${endpoints.product.productByCategory}/${slug}`);
        // console.log(response, "response");
        let result = response?.data;
        // console.log(result, "result");
        return result;
    }
)


export const searchProduct = createAsyncThunk(
    "search",
    async (slug) => {
        let response = await axiosInstance.get(`${endpoints.product.searchProduct}?q=${slug}`);
        // console.log(response, "response");
        let result = response?.data;
        // console.log(result, "result");
        return result;
    }
)




export const cmsSlice = createSlice({
    name: "CMS",
    initialState,
    reducers: {
        // reset_redirect: (state, { payload }) => {
        //     state.redirect_to = payload;
        // },

        // logout: () => {
        //     localStorage.removeItem("create_title")
        //     localStorage.removeItem("update_title")

        //     sessionStorage.removeItem("first_name");
        //     sessionStorage.removeItem("last_name");
        //     sessionStorage.removeItem("profile_img");

        //     localStorage.removeItem("log_token");
        //     localStorage.removeItem("reg_token");
        //     toast("Logout Succesfull");
        // },

        // back_to_reg: () => {
        //     localStorage.removeItem("reg_token");
        // }
    },
    extraReducers: (dev) => {
        dev
            .addCase(getAllCategories.pending, (state, { payload }) => { })
            .addCase(getAllCategories.fulfilled, (state, { payload }) => {
                // console.log(payload, "payload");
                state.allCategories=payload;
                // if (payload?.status === 200) {
                //     // state.redirect_to = "/Login";
                //     // localStorage.setItem("reg_token", payload?.token);
                //     // toast(payload?.message);
                // }
                // else {
                //     // toast(payload?.message);
                // }
            })
            .addCase(getAllCategories.rejected, (state, { payload }) => { })

            .addCase(allProducts.pending, (state, { payload }) => { })
            .addCase(allProducts.fulfilled, (state, { payload }) => {
                // console.log(payload, "payload");
                state.dataList=payload.products;
                // if (payload?.status === 200) {
                // }
                // else {
                //     // toast(payload?.message);
                // }
            })
            .addCase(allProducts.rejected, (state, { payload }) => { })

            .addCase(getProductDetails.pending, (state, { payload }) => { })
            .addCase(getProductDetails.fulfilled, (state, { payload }) => {
                // console.log(payload, "payload");
                state.productDetails=payload;
                // if (payload?.status === 200) {
                // }
                // else {
                //     // toast(payload?.message);
                // }
            })
            .addCase(getProductDetails.rejected, (state, { payload }) => { })

            .addCase(getProductByCategory.pending, (state, { payload }) => { })
            .addCase(getProductByCategory.fulfilled, (state, { payload }) => {
                // console.log(payload, "payload");
                state.productsByCategory=payload?.products;
                // if (payload?.status === 200) {
                //     // state.productDetails=payload.data;
                //     const router = useRouter();
                //     router.push('/cms/all-products');
                // }
                // else {
                //     // toast(payload?.message);
                // }
            })
            .addCase(getProductByCategory.rejected, (state, { payload }) => { })

            .addCase(searchProduct.pending, (state, { payload }) => { })
            .addCase(searchProduct.fulfilled, (state, { payload }) => {
                // console.log(payload, "payload");
                state.searchedProducts=payload?.products;
                // if (payload?.status === 200) {
                //     // state.productDetails=payload.data;
                //     const router = useRouter();
                //     router.push('/cms/all-products');
                // }
                // else {
                //     // toast(payload?.message);
                // }
            })
            .addCase(searchProduct.rejected, (state, { payload }) => { })
    }
})

export const {  } = cmsSlice.actions;