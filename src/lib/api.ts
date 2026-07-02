import {BASE_API_URL} from "@/constant";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    Career,
    ContactsMail,
    ContactsNumber,
    ContactsAddress,
    Links,
    Faq,
    Gallery,
    News,
    Press,
    Partners,
    Projects,
    Slider,
    Privacy,
    Cookie,
    Terms
} from "@/types";
import {InsideNews} from "@/types/singlePage";

export const oguzform = createApi({
    reducerPath: "oguzform",
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL}),
    endpoints: (builder) => {
        const createGetQuery = <T>(endpoint: string) =>
            builder.query<T[], void>({
                query: () => `/${endpoint}`,
            });
        const getElementByIds = <T>(endpoint?: string, id?: string | number) =>
            builder.query<T | undefined, { endpoint: string; id?: string | number }>({
                query: ({endpoint, id}: { endpoint: string; id: string | number }) =>
                    `/${endpoint}/${id}`,
            });
        return {
            getSliders: createGetQuery<Slider>("sliders"),
            getNews: createGetQuery<News>("news"),
            getPress: createGetQuery<Press>("press"),
            getProjects: createGetQuery<Projects>("projects"),
            getPartners: createGetQuery<Partners>("partners"),
            getContactsMail: createGetQuery<ContactsMail>("contact-mails"),
            getContactsNumber: createGetQuery<ContactsNumber>("contact-numbers"),
            getContactsAddress: createGetQuery<ContactsAddress>("contact-address"),
            getLinks: createGetQuery<Links>("links"),
            getGallery: createGetQuery<Gallery>("gallery"),
            getCareer: createGetQuery<Career>("career"),
            getFaq: createGetQuery<Faq>("faq"),
            getPrivacy: createGetQuery<Privacy>("privacy"),
            getCookie: createGetQuery<Cookie>("cookie"),
            getTerms: createGetQuery<Terms>("terms"),

            getNewsById: getElementByIds<InsideNews>(),
            getProjectsById: getElementByIds<Projects>(),

            applyJob: builder.mutation<any, any>({
                query: (formData) => ({
                    url: '/apply-job',
                    method: 'POST',
                    body: formData,
                }),
            }),
        };
    },
});

export const {
    useGetSlidersQuery,
    useGetCareerQuery,
    useGetContactsMailQuery,
    useGetContactsNumberQuery,
    useGetContactsAddressQuery,
    useGetLinksQuery,
    useGetFaqQuery,
    useGetGalleryQuery,
    useGetNewsQuery,
    useGetPressQuery,
    useGetPartnersQuery,
    useGetProjectsQuery,
    useGetPrivacyQuery,
    useGetCookieQuery,
    useGetTermsQuery,

    useGetNewsByIdQuery,
    useGetProjectsByIdQuery,

    useApplyJobMutation,
} = oguzform;
