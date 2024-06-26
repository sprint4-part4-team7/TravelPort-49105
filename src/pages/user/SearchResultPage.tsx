import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useProductsWithMinPrice from '@/hooks/products/useProductsWithMinPrice';
import useProductAllQuery from '@/hooks/reactQuery/product/useProductAllQuery';
import Layout from '@/components/common/layout/Layout';
import SearchResultSection from '@/components/searchResult/SearchResultSection';
import Pagination from '@/components/common/pagination/Pagination';
import Loading from '@/components/common/Loading';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultPage = () => {
  const query = useQuery();
  const searchQuery = query.get('query') || '';
  const search = searchQuery.toLowerCase();
  const { productAll, isLoadingProducts } = useProductAllQuery();
  const [selectedTab, setSelectedTab] = useState('all');
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setItemsPerPage(8);
    } else if (width >= 768 && width < 1200) {
      setItemsPerPage(6);
    }
  };

  useEffect(() => {
    updateItemsPerPage(); // 컴포넌트가 처음 렌더링될 때 화면 크기를 기반으로 설정
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const filteredProducts = productAll?.filter((product: any) => {
    if (selectedTab === 'all') return true;
    return (
      product.product_categoryId === (selectedTab === 'accommodation' ? 1 : 2)
    );
  });

  const productsWithMinPrice = useProductsWithMinPrice(
    filteredProducts,
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
    if (productAll) {
      const allProducts = productAll.filter(
        (product: any) =>
          (product.product_categoryId === 1 ||
            product.product_categoryId === 2) &&
          (product.productName?.toLowerCase().includes(search) ||
            product.productAddress?.toLowerCase().includes(search)),
      );

      const accommodationCount = allProducts.filter(
        (product: any) => product.product_categoryId === 1,
      ).length;

      const experienceCount = allProducts.filter(
        (product: any) => product.product_categoryId === 2,
      ).length;

      setCategoryCounts({
        all: allProducts.length,
        accommodation: accommodationCount,
        experience: experienceCount,
      });
    }
  }, [productAll, search]);

  useEffect(() => {
    setPageNum(1);
  }, [selectedTab, search]);

  if (isLoadingProducts) return <Loading />;

  return (
    <div>
      <Layout noSearch={false}>
        <div className="flex py-32 font-semibold text-20 ">
          <p className="text-blue-6">{search}</p>
          <p>에 대한 결과</p>
        </div>
        <div className="text-20 text-black-5 my-28">
          <button
            type="button"
            className={`tab-btn ${
              selectedTab === 'all'
                ? 'active text-black-12 border-b-2 border-black-12 border-solid'
                : ''
            } p-10 `}
            onClick={() => setSelectedTab('all')}
          >
            전체({categoryCounts.all})
          </button>
          <button
            type="button"
            className={`tab-btn ${
              selectedTab === 'accommodation'
                ? 'active text-black-12 border-b-2 border-black-12 border-solid'
                : ''
            } p-10 `}
            onClick={() => setSelectedTab('accommodation')}
          >
            숙박({categoryCounts.accommodation})
          </button>
          <button
            type="button"
            className={`tab-btn ${
              selectedTab === 'experience'
                ? 'active text-black-12 border-b-2 border-black-12 border-solid'
                : ''
            } p-10 `}
            onClick={() => setSelectedTab('experience')}
          >
            체험({categoryCounts.experience})
          </button>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-20">
          {productsWithMinPrice?.length !== 0 ? (
            <SearchResultSection productsWithMinPrice={paginatedProducts} />
          ) : (
            <div className="font-semibold text-22 text-black-6">
              상품이 존재하지 않습니다 :)
            </div>
          )}
          {productsWithMinPrice?.length !== 0 && (
            <Pagination
              pageNum={pageNum}
              setPageNum={setPageNum}
              allCardNum={productsWithMinPrice?.length || 0}
              divNum={itemsPerPage}
            />
          )}
        </div>
      </Layout>
    </div>
  );
};

export default SearchResultPage;
