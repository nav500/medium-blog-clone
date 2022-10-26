import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import {sanityClient, urlFor} from '../../sanity'
import { Post } from '../interfaces/post'
import Link from 'next/link'

interface Props {
  posts: Post[]
}

const Home: NextPage<Props> = ({ posts }) => {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="flex items-center justify-between bg-yellow-400 py-10 px-4 border-y border-black w-full max-w-5xl mx-auto lg:py-0">
          <div>
            <h1 className="text-5xl font-serif">
              <span className="underline">Medium</span> is a place to read, write and connect
            </h1>
            <p>
              It is easy and free to post your thinking on any topic and connect with millions of readers.
            </p>
          </div>
          <div className="h-24 w-24 relative lg:w-60 lg:h-60">
            <Image src="/medium-short-logo.svg" layout="responsive" width="100%" height="100%" objectFit="contain" alt="medium logo" />
          </div>
        </div>
        <section>
          <div className="p-4">
            {
              posts.map((post) => {
                return (
                  <div key={post._id} className="inline-block max-w-[300px] group border border-gray-200">
                    <Link  href={`/post/${post.slug.current}`} >
                      <a>
                        <div className="flex flex-col p-2 pt-1 space-y-2">
                          <div className="relative w-72 h-52 overflow-hidden flex justify-center items-center self-center">
                            <Image src={urlFor(post.mainImage).url()} layout="fill" objectFit="cover" className="group-hover:scale-105"  alt={`${post.title}`} />
                          </div>
                          <div className="flex flex-col space-y-3">
                            <div>
                              <h3 className="text-xl font-medium">{post.title}</h3>
                              <p className="text-justify">{post.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                <Image src={urlFor(post.author.image).url()} layout="fill" objectFit="cover" alt={`${post.author.name}`} />
                              </div>
                              <div>
                                <p>{post.author.name}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
    _id,
    title,
    description,
    slug,
    author -> {
    name,
    image
  },
    mainImage
  }
  `
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts
    }
  }
}

export default Home