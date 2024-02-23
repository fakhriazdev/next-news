'use client'
import React from 'react';
import Header from "@/pages/components/Header";
import useFetchSeenNews from "@/features/useFetchSeenNews";

const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import Image from "next/image";
import {Eye} from "@phosphor-icons/react";
import {Inter} from "next/font/google";
export default function Index({params}){
    const {seen,setSeenNews} = useFetchSeenNews();
    console.log(seen)
    return(

        <>
            <Header/>
            <main className={`max-w-7xl mx-auto px-2 ${inter.className}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

                    {seen?.map((news, index) => {
                        return (
                            <div key={index}
                                 className="relative max-w-full rounded-md overflow-hidden mb-4 bg-white/30">

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
                                        <Link href={news?.url} target="_blank" className="font-semibold text-lg mb-2"
                                              onClick={() => setSeenNews({
                                                  title: news?.title,
                                                  urlToImage: news?.urlToImage,
                                                  url: news?.url,
                                              })}

                                        >{news?.title.substring(0, 48)} ...</Link>

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
                            </div>
                        )
                    })}

                </div>
            </main>


        </>
    )
}