import { apiSlice } from "./apiSlice";
const USER_URL = "/api/v1/user";

const userApiSlices = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		signin: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/signin`,
				method: "POST",
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/logout`,
				method: "POST",
				body: data,
			}),
		}),
		signup: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/signup`,
				method: "POST",
				body: data,
			}),
		}),
		profile: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/profile`,
				method: "GET",
				body: data,
			}),
		}),
		updateProfile: builder.mutation({
			query: (data) => ({
				url: `${USER_URL}/profile`,
				method: "PUT",
				body: data,
			}),
		}),
	}),
});

export const {
	useSigninMutation,
	useLogoutMutation,
	useSignupMutation,
	useProfileMutation,
	useUpdateProfileMutation,
} = userApiSlices;
