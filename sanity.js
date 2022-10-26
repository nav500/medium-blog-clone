import { createClient, createCurrentUserHook,  } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

export const config = {
    projectId: "7mh0gmr8",
    dataset: "production",
    apiVersion: "v1",
    useCdn: false
}

export const sanityClient = createClient(config);

export const urlFor = (source) => imageUrlBuilder(config).image(source);

export const createUser = createCurrentUserHook(config);