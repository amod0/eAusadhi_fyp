import { apiSlice } from './apiSlice';
// import { USERS_URL } from '../../../../eAusadhi_fyp/frontend/src/constants';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadPrescriptionImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload1`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePrescription: builder.mutation({
      query:(data) => ({
        url: `/api/upload1/data`,
        method: 'POST',
        body: data,
      }),
    }),
    getPrescription: builder.query({
      query: () => ({
        url: `/api/upload1`,
      }),
    }),
  }),
});

export const {
  useUploadPrescriptionImageMutation,
  useUpdatePrescriptionMutation,
  useGetPrescriptionQuery
} = userApiSlice;
