import {BASE_API_URL} from "@/constant";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    Career,
    Contacts,
    ContactsAddress,
    Links,
    Faq,
    Gallery,
    News,
    Partners,
    Projects,
    Services,
    Slider,
    Privacy,
    Cookie
} from "../Intarfaces/intarfaces";
import {InsideNews} from "../Intarfaces/SinglePageInterface";

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
            getProjects: createGetQuery<Projects>("projects"),
            getPartners: createGetQuery<Partners>("partners"),
            getContacts: createGetQuery<Contacts>("contacts"),
            getContactsAddress: createGetQuery<ContactsAddress>("contact-address"),
            getLinks: createGetQuery<Links>("links"),
            getGallery: createGetQuery<Gallery>("gallery"),
            getCareer: createGetQuery<Career>("career"),
            getFaq: createGetQuery<Faq>("faq"),
            getServices: createGetQuery<Services>("services"),
            getPrivacy: createGetQuery<Privacy>("privacy"),
            getCookie: createGetQuery<Cookie>("cookie"),
            /////------------------------------------------/////////////////////-------------------------------------------------

            getNewsById: getElementByIds<InsideNews>(),
            getProjectsById: getElementByIds<Projects>(),
            getServicesById: getElementByIds<Services[]>(),
            /////------------------------------------------/////////////////////-------------------------------------------------

            applyJob: builder.mutation<any, any>({
                query: (formData) => ({
                    url: '/apply-job', // правильный эндпоинт
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
    useGetContactsQuery,
    useGetContactsAddressQuery,
    useGetLinksQuery,
    useGetFaqQuery,
    useGetGalleryQuery,
    useGetNewsQuery,
    useGetPartnersQuery,
    useGetProjectsQuery,
    useGetServicesQuery,
    useGetPrivacyQuery,
    useGetCookieQuery,
    /////------------------------------------------/////////////////////-------------------------------------------------
    useGetNewsByIdQuery,
    useGetProjectsByIdQuery,
    useGetServicesByIdQuery,
    /////------------------------------------------/////////////////////-------------------------------------------------
    useApplyJobMutation,
} = oguzform;
