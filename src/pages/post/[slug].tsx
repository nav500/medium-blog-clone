import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { sanityClient, urlFor } from "../../../sanity";
import Header from "../../components/header";
import { Post } from "../../interfaces/post";
import { PortableText, PortableTextReactComponents, PortableTextBlockComponent } from "@portabletext/react"

interface PostSlug {
  slug: {
    current: string,
    _type: string
  }
}

interface Props {
  post: Post
}

interface PostBody {
  children: [object],
  markDefs: [],
  style: string,
  _key: string,
  _type: string
}

const Post: NextPage<Props> = ({ post }) => {
  console.log(post)

  const components = {
    block: {
      h2: ({ children }: { children: string; }) => <h2 className="text-2xl font-semibold mt-2">{children}</h2>
    },
  }

  return (
    <>
      <Header />
      <main>
        <div className="w-full h-52 relative">
          <Image src={urlFor(post.mainImage).url()} layout="fill" width="100%" height="100%" objectFit="cover" alt={post.title} />
        </div>
        <div className="max-w-3xl mx-auto p-4 flex flex-col space-y-2">
          <h1 className="text-center text-3xl font-bold">{post.title}</h1>
          <h2 className="font-light">{post.description}</h2>
          <div className="flex space-x-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image src={urlFor(post.author.image).url()} layout="fill" objectFit="cover" alt={`${post.author.name}`} />
            </div>
            <div className="flex flex-col font-light">
              <p className="font-medium">{post.author.name}</p>
              <p>Published at {new Date(post.publishedAt).toLocaleString()}</p>
            </div>
          </div>
          <div>
            <PortableText value={post.body as [PostBody]} components={components as unknown as PortableTextReactComponents} />
          </div>
        </div>
      </main>
    </>
  )
  
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
  *[_type == "post"]{
    slug
  }
  `
  const postSlugs = await sanityClient.fetch(query);
  const paths = postSlugs.map((postSlug: PostSlug) => {
    return {
      params: {
        slug: postSlug.slug.current,
      }
    }
  })

  return {
    paths,
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    description,
    slug,
    author -> {
    name,
    image
  },
    mainImage,
    body,
    publishedAt
  }
  `
  const post = await sanityClient.fetch(query, {
    slug: context.params!.slug,
  })

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    }
  }

}

export default Post;