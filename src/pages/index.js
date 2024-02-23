import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/pages/components/Header";
import useFetchNews from "@/features/useFetchNews";
const inter = Inter({ subsets: ["latin"] });
import {formatDate} from "@/utils/formatDate";
import {useState} from "react";
import Link from "next/link";
import {Eye} from "@phosphor-icons/react";
import useFetchSeenNews from "@/features/useFetchSeenNews";
import LoadingNews from "@/pages/components/LoadingNews";

export default function Home() {
    const {
        data,
        isLoading,
        handlePrevPage,
        handleNextPage,
        currentPage} =useFetchNews()
    const {seen,setSeenNews} = useFetchSeenNews();

  return (
      <>
          <Header />
          <main className={`max-w-7xl mx-auto px-2 ${inter.className}`}>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {isLoading === true ? <LoadingNews /> : <>
                      {data?.map((news, index) => {
                          const formattedDate = formatDate(news?.publishedAt);
                          console.log(formattedDate)
                          return (
                              <div key={index} className="relative max-w-full rounded-md overflow-hidden mb-4 bg-white/30">

                                  <Link href={news?.url} target="_blank" className="w-full h-64 mb-5" onClick={() =>
                                      setSeenNews({
                                          title: news?.title,
                                          urlToImage: news?.urlToImage,
                                          url: news?.url,
                                      })
                                  }>
                                      <Image
                                          src={news?.urlToImage || ""}
                                          className="w-full h-64 object-cover"
                                          width={600}
                                          height={600}
                                          priority={true}
                                          alt={news?.title.substring(0, 60)}
                                      />
                                  </Link>
                                  <div className="w-full flex justify-between pb-2 font-semibold my-2 px-2.5">
                                      <div>
                                          <h1 className="text-sm">

                                              {news?.author}
                                          </h1>
                                          <p className="text-xs text-slate-700">
                                              {formattedDate}
                                          </p>
                                      </div>
                                      <div className="my-auto text-xs text-center text-slate-500">
                                          {seen.find((item) => item?.title === news.title) && (
                                              <>
                                                  <Eye size={28}/>
                                                  seen
                                              </>
                                          )}
                                      </div>

                                  </div>

                                  <div className="w-full mb-5 px-2.5">
                                      <Link  href={news?.url} target="_blank" className="font-semibold text-lg mb-2"
                                             onClick={()=>setSeenNews({
                                                 title: news?.title,
                                                 urlToImage: news?.urlToImage,
                                                 url: news?.url,
                                             })}

                                      >{news?.title.substring(0, 50)} ...</Link>
                                      <p className="text-gray-700 text-base">{news?.description?.substring(0, 80)} ...
                                          <Link  href={news?.url} target="_blank" className="text-slate-500"
                                                 onClick={()=>setSeenNews({
                                                     title: news?.title,
                                                     urlToImage: news?.urlToImage,
                                                     url: news?.url,
                                                 })}
                                          > read more</Link>
                                      </p>
                                  </div>
                                  <div className="absolute right-3 top-3">
                                  <span
                                      className="bg-red-500 rounded text-white py-1.5 px-4">{news?.source?.name}</span>
                                  </div>

                              </div>
                          )
                      })}
                  </>}

              </div>
              <div className="w-full flex justify-center gap-10">
                  {!isLoading && <>
                      <button onClick={handlePrevPage} disabled={currentPage === 1}>
                          Previous Page
                      </button>
                      <button onClick={handleNextPage}>Next Page</button>
                  </>}

              </div>

          </main>
      </>
  );
}
