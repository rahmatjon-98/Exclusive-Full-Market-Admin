import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export let allApi = createApi({
  reducerPath: "allApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://store-api.softclub.tj/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("admin_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "Account/login",
        method: "POST",
        body: userData,
      }),
    }),

    //getProduct
    getProducts: builder.query({
      query: (params) => ({
        url: "Product/get-products",
        params,
      }),
    }),

    getByIdProduct: builder.query({
      query: (id) => `Product/get-product-by-id?id=${id}`,
    }),

    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: `Product/add-product`,
        method: "POST",
        body: newProduct,
      }),
    }),

    editProduct: builder.mutation({
      query: (e) => ({
        url: `Product/update-product?Id=${e.id}
        &BrandId=${e.brandId}
        &ColorId=${e.colorId}
        &ProductName=${e.productName}
        &Description=${e.description}
        &Quantity=${e.quantity}
        &Weight=${e.weight}
        &Size=${e.size}
        &Code=${e.code}
        &Price=${e.price}
        &HasDiscount=${e.hasDiscount}
        &DiscountPrice=${e.discountPrice}
        &SubCategoryId=${e.subCategoryId}`,
        method: "PUT",
      }),
    }),

    editImageProduct: builder.mutation({
      query: (e) => ({
        url: `Product/add-image-to-product?id=${e.id}`,
        method: "PUT",
        body: e,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `Product/delete-product?id=${id}`,
        method: "DELETE",
      }),
    }),

    addImageToProduct: builder.mutation({
      query: (newProduct) => ({
        url: `Product/add-image-to-product`,
        method: "POST",
        body: newProduct,
      }),
    }),

    deleteImageProduct: builder.mutation({
      query: (id) => ({
        url: `Product/delete-image-from-product?imageId=${id}`,
        method: "DELETE",
      }),
    }),

    //getColors
    getColors: builder.query({
      query: () => "Color/get-colors",
    }),

    addColor: builder.mutation({
      query: ({ colorName }) => ({
        url: `Color/add-color?ColorName=${encodeURIComponent(colorName)}`,
        method: "POST",
      }),
    }),

    editColor: builder.mutation({
      query: (e) => ({
        url: `Color/update-color?Id=${e.id}
        &ColorName=${encodeURIComponent(e.colorName)}`,
        method: "PUT",
      }),
    }),

    deleteColor: builder.mutation({
      query: (id) => ({
        url: `Color/delete-color?id=${id}`,
        method: "DELETE",
      }),
    }),

    //getBrands
    getBrands: builder.query({
      query: () => "Brand/get-brands",
    }),

    addBrand: builder.mutation({
      query: (newBrand) => ({
        url: `Brand/add-brand?BrandName=${newBrand}`,
        method: "POST",
      }),
    }),

    editBrand: builder.mutation({
      query: (e) => ({
        url: `Brand/update-brand?Id=${e.id}
        &BrandName=${e.brandname}`,
        method: "PUT",
      }),
    }),

    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `Brand/delete-brand?id=${id}`,
        method: "DELETE",
      }),
    }),

    // getCategory
    getCategory: builder.query({
      query: () => "Category/get-categories",
    }),

    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: `Category/add-category`,
        method: "POST",
        body: newCategory,
      }),
    }),

    editCategory: builder.mutation({
      query: (formData) => ({
        url: `Category/update-category`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `Category/delete-Category?id=${id}`,
        method: "DELETE",
      }),
    }),

    //getSubCategories
    getSubCategories: builder.query({
      query: () => "SubCategory/get-sub-category",
    }),

    addSubCategories: builder.mutation({
      query: (e) => ({
        url: `SubCategory/add-sub-category?CategoryId=${e.id}&SubCategoryName=${e.name}`,
        method: "POST",
      }),
    }),

    editSubCategories: builder.mutation({
      query: (e) => ({
        url: `SubCategory/update-sub-category?Id=${e.idSub}
        &CategoryId=${e.id}
        &SubCategoryName=${e.name}`,
        method: "PUT",
      }),
    }),

    deleteSubCategories: builder.mutation({
      query: (id) => ({
        url: `SubCategory/delete-sub-category?id=${id}`,
        method: "DELETE",
      }),
    }),

    //User
    getUserData: builder.query({
      query: (id) => `UserProfile/get-user-profile-by-id?id=${id}`,
    }),

    //User role
    // getUserRole: builder.query({
    // query: () => "UserProfile/get-user-roles",
    // }),
  }),
});

export let {
  useGetUserDataQuery,
  useLoginMutation,
  // useGetUserRoleQuery,

  useGetProductsQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useGetByIdProductQuery,
  useEditProductMutation,
  useEditImageProductMutation,

  useAddImageToProductMutation,
  useDeleteImageProductMutation,

  useGetBrandsQuery,
  useAddBrandMutation,
  useEditBrandMutation,
  useDeleteBrandMutation,

  useGetCategoryQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,

  useGetSubCategoriesQuery,
  useAddSubCategoriesMutation,
  useEditSubCategoriesMutation,
  useDeleteSubCategoriesMutation,

  useGetColorsQuery,
  useAddColorMutation,
  useEditColorMutation,
  useDeleteColorMutation,
} = allApi;

// {
//   "data": [
//     {
//       "id": "34808f49-52e9-4fb7-9001-cf05800d608d",
//       "name": "Admin"
//     },
//     {
//       "id": "82f1e62b-03ca-4d0e-a61a-e5398d8a67e1",
//       "name": "User"
//     }
//   ],
//   "errors": [],
//   "statusCode": 200
// }
