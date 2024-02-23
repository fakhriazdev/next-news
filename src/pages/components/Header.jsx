import React, {useState} from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {MagnifyingGlass} from "@phosphor-icons/react";
import useFetchNews from "@/features/useFetchNews";

const Header = () => {
    const path = usePathname();

    const {handleSearch,handleSearchButtonClick} = useFetchNews()

    return (
        <>
            <nav
                className="z-10 sticky left-0 top-0 w-full  border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-6 px-2 lg:px-4 backdrop-blur-2xl mb-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row lg-flex-row justify-between font-semibold">
                    <h1 className="my-auto text-center mb-3">NEXTNEWS</h1>
                    <div className="flex justify-between gap-2">
                        {path === "/" ? (
                            <Link href={{pathname: '/myactivity'}}
                                  className=" py-2 px-2 bg-slate-700 text-white rounded-md"

                            >
                                My Activity
                            </Link>
                        ) :(
                            <Link href={{pathname: '/'}}
                                  className=" py-2 px-2 bg-slate-700 text-white rounded-md"

                            >
                                Home
                            </Link>
                        )}

                        <div className="relative text-gray-600">
                            <input
                                className="border-2 border-gray-300 bg-white h-10 px-5 pr-5 rounded-lg text-sm focus:outline-none max-w-44"
                                type="text"
                                name="search"
                                placeholder="Search"
                                onChange={handleSearch}
                            />

                            <button
                                className="absolute right-0 top-0 mt-2 mr-1 "
                                onClick={handleSearchButtonClick}
                            >
                                <MagnifyingGlass size={24}/>
                            </button>
                        </div>
                    </div>
                </div>

            </nav>
        </>

    );
};

export default Header;