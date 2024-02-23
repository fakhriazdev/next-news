import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/AxiosInstance';
import {useState} from "react";

const useFetchNews = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("")

    const handleSearch = (e) => {
        const {value} = e.target
        setSearch(value)
    }
    const handleSearchButtonClick = () => {

        refetch && refetch();
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };
    const pageSize = 10;

    const queryKey = ['fetch.trending', currentPage];
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey,

        queryFn: async () => {
            try {
                const newsResponse = await axiosInstance.get(
                    `everything?q=${search || 'all'}&apiKey=0fbc94c9208c4e64a1a4b5e79ca5ef58&page=${currentPage}&pageSize=${pageSize}`
                );

                return newsResponse.data.articles;
            } catch (error) {
                throw new Error('Error fetching news data');
            }
        },
        onSuccess: (data) => {
            console.log('News data fetched successfully:', data);
        },
        onError: (error) => {
            console.error('Error fetching news data:', error);
        },
    });

    return { data, isLoading, isError, error, refetch,handleNextPage,handlePrevPage,currentPage,handleSearch,handleSearchButtonClick };
};

export default useFetchNews;
