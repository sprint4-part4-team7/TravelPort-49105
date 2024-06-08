import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useProductAll from '@/hooks/reactQuery/product/useProductAll';
import useProductsWithMinPrice from '@/hooks/useProductsWithMinPrice';
import useReviewAllQuery from '@/hooks/reactQuery/review/useReviewAllQuery';
import Footer from '@/components/common/Footer';
import Layout from '@/components/common/layout/Layout';
import SearchResultSection from '@/components/SearchResultSection';
import Pagination from '@/components/common/Pagination';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultPage = () => {
  const query = useQuery();
  const search = query.get('query')?.toLowerCase() || '';
  const { productAll } = useProductAll();
  const [selectedTab, setSelectedTab] = useState('all');
  const { optionAll } = useProductAll();
  const { data: reviewAll } = useReviewAllQuery();
  const [pageNum, setPageNum] = useState(1);
  const itemsPerPage = 10;

  const filteredProducts = productAll?.data?.filter((product: any) => {
    if (selectedTab === 'all') return true;
    return product.categoryId === (selectedTab === 'accommodation' ? 3 : 20);
  });

  const productsWithMinPrice = useProductsWithMinPrice(
    filteredProducts,
    optionAll,
    reviewAll,
    search,
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (pageNum - 1) * itemsPerPage;
    return productsWithMinPrice?.slice(startIndex, startIndex + itemsPerPage);
  }, [pageNum, productsWithMinPrice]);

  const [categoryCounts, setCategoryCounts] = useState({
    all: 0,
    accommodation: 0,
    experience: 0,
  });

  useEffect(() => {
    if (productAll?.data) {
      const allProducts = productAll.data.filter(
        (product: any) =>
          (product.categoryId === 3 || product.categoryId === 20) &&
          (product.name.toLowerCase().includes(search) ||
            product.productAddress.toLowerCase().includes(search)),
      );
      const accommodationCount = allProducts.filter(
        (product: any) => product.categoryId === 3,
      ).length;
      const experienceCount = allProducts.filter(
        (product: any) => product.categoryId === 20,
      ).length;
      setCategoryCounts({
        all: allProducts.length,
        accommodation: accommodationCount,
        experience: experienceCount,
      });
    }
  }, [productAll?.data, search]);

  useEffect(() => {
    setPageNum(1);
  }, [selectedTab, search]);

  return (
    <div>
      <Layout noSearch={false}>
        <div className="flex py-32 font-semibold text-20">
          <p className="text-blue-6">{search}</p>
          <p>에 대한 결과</p>
        </div>
        <div className="text-20 text-black-5 my-28">
          <button
            type="button"
            className={`tab-btn ${selectedTab === 'all' ? 'active text-black-12 border-b-2 border-black-12 border-solid' : ''} p-10 `}
            onClick={() => setSelectedTab('all')}
          >
            전체({categoryCounts.all})
          </button>
          <button
            type="button"
            className={`tab-btn ${selectedTab === 'accommodation' ? 'active text-black-12 border-b-2 border-black-12 border-solid' : ''} p-10 `}
            onClick={() => setSelectedTab('accommodation')}
          >
            숙박({categoryCounts.accommodation})
          </button>
          <button
            type="button"
            className={`tab-btn ${selectedTab === 'experience' ? 'active text-black-12 border-b-2 border-black-12 border-solid' : ''} p-10 `}
            onClick={() => setSelectedTab('experience')}
          >
            체험({categoryCounts.experience})
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-20">
          <SearchResultSection productsWithMinPrice={paginatedProducts} />
          <Pagination
            pageNum={pageNum}
            setPageNum={setPageNum}
            allCardNum={productsWithMinPrice?.length || 0}
            divNum={itemsPerPage}
          />
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

export default SearchResultPage;
