'use client';

import {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@mui/material/Pagination';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import useAppLocale from '@/app/Hooks/GetLocale';
import RichText from '@/app/Hooks/Richtext';
import {Projects} from '@/app/Intarfaces/intarfaces';
import {BASE_API_URL} from '@/constant';

interface Props {
    event: Projects[];
    itemsPerPage?: number;
}

const fixImageUrl = (url: string): string => {
    if (!url) return '/default-image.png';
    const norm = url.replace(/\\/g, '/');
    if (norm.startsWith('http') || norm.startsWith('/')) return norm;
    return `${BASE_API_URL.slice(0, -3)}${norm}`;
};

const ProjectsCardProps: React.FC<Props> = ({event, itemsPerPage = 9}) => {
    const locale = useAppLocale();
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(event.length / itemsPerPage));

    /* сбрасываем страницу, если изменился массив проектов */
    useEffect(() => {
        if (page > totalPages) setPage(1);
    }, [event, itemsPerPage, totalPages, page]);


    const current = event.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="container mx-auto px-2">
            <div className="pb-10">
                {/* карточки */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {current.map((pr) => {
                        const title = pr[locale];
                        return (
                            <Link href={`/projects/${pr.id}`} key={pr.id}>
                                <div className="relative shadow-2xl h-80 md:h-96 rounded-xl">
                                    <Image
                                        src={fixImageUrl(pr.image)}
                                        alt={pr.image}
                                        width={800}
                                        height={600}
                                        quality={90}
                                        className="rounded-xl object-cover w-full h-full"
                                    />
                                    <div className="absolute bottom-0 inset-x-0 bg-white rounded-xl p-4 h-40 space-y-2">
                                        <div className="flex items-center divide-x-2 text-xs space-x-2">
                      <span>
                         {new Date(pr.date).toLocaleDateString("tm-TM")}
                      </span>
                                            <span className="pl-2 flex items-center">
                        <LocationPinIcon
                            className="text-gray-500 mr-1"
                            style={{width: 15, height: 15}}
                        />
                                                {pr[`location_${locale}`]}
                      </span>
                                        </div>

                                        <div className="md:text-lg text-md text-mainBlue font-semibold">
                                            <RichText
                                                htmlContent={
                                                    title.length > 100 ? `${title.slice(0, 100)}…` : title
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* пагинация */}
                {totalPages > 1 && (
                    <div className="flex justify-center pt-4">
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, v) => setPage(v)}
                            variant="outlined"
                            shape="rounded"
                            siblingCount={1}
                            sx={{
                                '& .MuiPaginationItem-root.Mui-selected': {
                                    backgroundColor: '#002A5F',
                                    color: '#fff',
                                    transform: 'scale(1.1)',
                                },
                                '& .MuiPaginationItem-root': {
                                    color: '#fff',
                                    backgroundColor: '#002A5F66',
                                    m: '2px',
                                    p: '8px',
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsCardProps;
