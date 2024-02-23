import { useEffect, useState } from 'react';

const useFetchSeenNews = () => {
    const [seen, setSeen] = useState([]);


    useEffect(() => {
        setSeen(JSON.parse(localStorage.getItem('seen')) || []);
    }, []);

    const setSeenNews = (news) => {
        const isSeen = !seen.find(
            (item) => item?.title === news.title
        );
        if(!isSeen) {
            return;
        }
        const updatedFavorites = isSeen && [...seen, news];

        localStorage.setItem('seen', JSON.stringify(updatedFavorites));
        setSeen(updatedFavorites);

    };

    return {
        setSeenNews,
        seen,


    };
};

export default useFetchSeenNews;