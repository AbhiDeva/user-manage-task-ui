import { SUBMISSIONS_URL } from "../../../utils/contants";
import { apiSlice } from "../apiSlice";

export const submissionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // POST / - Submit code
        submitCode: builder.mutation({
            query: (data) => ({
                url: `${SUBMISSIONS_URL}`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ['Submission'],
        }),

        // GET /user/:userId - Get user submissions
        getUserSubmissions: builder.query({
            query: (userId) => ({
                url: `${SUBMISSIONS_URL}/user/${userId}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (result, error, userId) => [
                { type: 'Submission', id: `USER-${userId}` },
                'Submission'
            ],
        }),

        // GET /:id - Get submission by ID
        getSubmissionById: builder.query({
            query: (id) => ({
                url: `${SUBMISSIONS_URL}/${id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (result, error, id) => [{ type: 'Submission', id }],
        }),
    })
});

export const {
    useSubmitCodeMutation,
    useGetUserSubmissionsQuery,
    useGetSubmissionByIdQuery,
} = submissionApiSlice;