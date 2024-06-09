import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useTest from "../../Hooks/useTest";
import TestCard from "./TestCard";
import { useEffect, useState } from "react";
import axios from "axios";


const AllTest = () => {

    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [test] = useTest();
    const [allTest, setAllTest] = useState([]);
    const length = test.length;
    const numberOfPage = Math.ceil(length / itemsPerPage);
    // console.log(length);

    useEffect(() => {
        const getCount = async () => {
            const {data} = await axios(`http://localhost:5000/all-test?page=${currentPage}&size=${itemsPerPage}`)
            console.log(data);
            setCount(data)
        }
        getCount();
    }, [currentPage, itemsPerPage])


    useEffect(() => {
        const getCount = async () => {
            const {data} = await axios('http://localhost:5000/test-count')
            setCount(data.count)
        }
        getCount();
    }, [])

    console.log(count);


    const pages = [...Array(numberOfPage).keys()].map(element => element + 1);
    // const pages = [1, 2, 3, 4, 5];

    // handle pagination 
    const handlePaginationButton = (value) => {
        console.log(value);
        setCurrentPage(value);
    }

    return (
        <div>
            <Helmet>
                <title>SI | All Test</title>
            </Helmet>
            <SectionTitle
                heading={"All Test"}
                subHeading={"Find Your Test"}
            ></SectionTitle>
            <div>
                <h2>the: {test.length}</h2>
            </div>

            <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
                <div>
                    <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
                        <div>
                            <select
                                name='category'
                                id='category'
                                className='border p-4 rounded-lg'
                            >
                                <option value=''>Filter By Category</option>
                                <option value='Web Development'>Web Development</option>
                                <option value='Graphics Design'>Graphics Design</option>
                                <option value='Digital Marketing'>Digital Marketing</option>
                            </select>
                        </div>

                        <form>
                            <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                                <input
                                    className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                                    type='text'
                                    name='search'
                                    placeholder='Enter Job Title'
                                    aria-label='Enter Job Title'
                                />

                                <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                                    Search
                                </button>
                            </div>
                        </form>
                        <div>
                            <select
                                name='category'
                                id='category'
                                className='border p-4 rounded-md'
                            >
                                <option value=''>Sort By Deadline</option>
                                <option value='dsc'>Descending Order</option>
                                <option value='asc'>Ascending Order</option>
                            </select>
                        </div>
                        <button className='btn'>Reset</button>
                    </div>
                    <div className="mt-6 grid md:grid-cols-2 gap-10">
                        {
                            test?.map(item => <TestCard
                                key={item._id}
                                item={item}
                            ></TestCard>)
                        }
                    </div>
                </div>
                {/* pagination section */}
                <div className='flex justify-center mt-12'>
                    {/* previous button */}
                    <button className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'>
                        <div className='flex items-center -mx-1'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='w-6 h-6 mx-1 rtl:-scale-x-100'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M7 16l-4-4m0 0l4-4m-4 4h18'
                                />
                            </svg>

                            <span className='mx-1'>previous</span>
                        </div>
                    </button>
                    {/* Numbers */}
                    {pages.map(btnNum => (
                        <button
                        onClick={() => handlePaginationButton(btnNum) }
                            key={btnNum}
                            className={`hidden px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
                        >
                            {btnNum}
                        </button>
                    ))}
                    {/* Next button */}
                    <button className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
                        <div className='flex items-center -mx-1'>
                            <span className='mx-1'>Next</span>

                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='w-6 h-6 mx-1 rtl:-scale-x-100'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>



        </div>
    );
};

export default AllTest;