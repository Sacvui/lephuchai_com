
import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

const ITEMS_PER_PAGE = 9;

const BOOK_POSTS_QUERY = groq`{
  "posts": *[_type == "post" && "book-intern-to-ceo" in categories[]->slug.current] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "categories": categories[]->title,
    "author": author->name,
    "authorSlug": author->slug.current
  },
  "total": count(*[_type == "post" && "book-intern-to-ceo" in categories[]->slug.current])
}`;

export default async function BooksPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const currentPage = Number(searchParams.page) || 1;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const { posts = [], total = 0 } = await sanityFetch<{ posts: any[]; total: number }>({
        query: BOOK_POSTS_QUERY,
        params: { start, end },
    }).catch(() => ({ posts: [], total: 0 }));

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return (
        <div className="container mx-auto px-4 py-24 min-h-screen">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                    The Book Shelf
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400">
                    "300 Bài Hát Thiếu Nhi" & Other Publications
                </p>
            </div>

            {/* The Trilogy Series */}
            <div className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
                    The <span className="text-amber-500">Executive Trilogy</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Book 1: Intern to CEO */}
                    <div className="flex flex-col group">
                        <div className="relative aspect-[2/3] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                            <Image
                                src="/blog/book_mockup_stack_ncskit_final.png"
                                alt="300 Nursery Rhymes: From Intern to CEO"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                BESTSELLER
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">From Intern to CEO</h3>
                            <div className="text-sm font-medium text-slate-500 mb-2">
                                <p>Le Phuc Hai</p>
                                <p className="text-xs text-slate-400 font-normal">Scientific Assistant: Carmen Chau</p>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Strategic Blueprint for Leaders</p>
                            <Link href="/blog/book-project-intro" className="text-amber-600 hover:text-amber-700 font-semibold text-sm uppercase tracking-wide">
                                Read Introduction &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Book 2: Intern to Researcher */}
                    <div className="flex flex-col group">
                        <div className="relative aspect-[2/3] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                            <Image
                                src="/blog/book_cover_intern_to_researcher.png"
                                alt="300 Nursery Rhymes: From Intern to Researcher"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                ACADEMIC
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">From Intern to Researcher</h3>
                            <div className="text-sm font-medium text-slate-500 mb-2">
                                <p>Le Phuc Hai</p>
                                <p className="text-xs text-slate-400 font-normal">Scientific Assistant: Carmen Chau</p>
                            </div>
                            <p className="text-sm font-semibold text-amber-600 dark:text-amber-500 mb-3 uppercase tracking-wider">Mastering the Art of Inquiry</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed px-2">
                                Transform raw data into strategic gold. A rigorous guide to applying academic thinking to chaotic business problems—because gut feeling is not a strategy.
                            </p>
                            <button className="text-slate-400 font-semibold text-sm uppercase tracking-wide cursor-not-allowed border rounded-full px-4 py-1 border-slate-200 dark:border-slate-800">
                                Coming Soon
                            </button>
                        </div>
                    </div>

                    {/* Book 3: Intern to C-Level */}
                    <div className="flex flex-col group">
                        <div className="relative aspect-[2/3] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                            <Image
                                src="/blog/book_cover_intern_to_c_level.png"
                                alt="300 Nursery Rhymes: From Intern to C-Level"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border border-slate-700">
                                EXECUTIVE
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">From Intern to C-Level</h3>
                            <div className="text-sm font-medium text-slate-500 mb-2">
                                <p>Le Phuc Hai</p>
                                <p className="text-xs text-slate-400 font-normal">Scientific Assistant: Carmen Chau</p>
                            </div>
                            <p className="text-sm font-semibold text-amber-600 dark:text-amber-500 mb-3 uppercase tracking-wider">The Golden Path to Governance</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed px-2">
                                Beyond management lies governance. Decode the unspoken rules of the boardroom, master executive presence, and build a legacy that outlasts your tenure.
                            </p>
                            <button className="text-slate-400 font-semibold text-sm uppercase tracking-wide cursor-not-allowed border rounded-full px-4 py-1 border-slate-200 dark:border-slate-800">
                                Coming Soon
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chapter List / Drafts */}
            <h3 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-amber-500">Drafts & Chapters</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts?.map((post) => (
                    <Link key={post._id} href={`/blog/${post.slug.current}`} className="group">
                        <article className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-800 h-full flex flex-col">
                            <div className="relative h-48 bg-slate-100 dark:bg-slate-800">
                                {post.mainImage && (
                                    <Image
                                        src={urlForImage(post.mainImage).url()}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
                                    {post.excerpt}
                                </p>
                                <div className="text-xs text-slate-500 mt-auto">
                                    {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}

