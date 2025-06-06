"use client";

import { FC, useEffect, useState } from "react";
import classes from "./CatalogPage.module.css";
import { ProductData } from "@/types/type";
import catalogService from "@/shared/service/catalog-service";
import NoProductFound from "../../ui/NoProductFound/NoProductFound";
import LoadMore from "../../ui/LoadMore/LoadMore";
import Pagination from "../../ui/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import { convertStringToNumber } from "@/lib/convertStringToNumber";
import SortBlock from "./SortBlock/SortBlock";
import CardList from "./CardList/CardList";
import Loader from "@/components/ui/Loader/Loader";
import useAddToBasket from "@/shared/hooks/useAddToBasket";

export const Catalog: FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [selectedCategory] = useState<string | null>(category);

  const [products, setProducts] = useState<ProductData>({
    data: [],
    total: 0,
    page: 1,
    limit: 1,
    totalPages: 2,
    minPrice: 1,
    maxPrice: 1,
  });

  const [brand, setBrand] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [noProductsFound, setNoProductsFound] = useState<boolean>(false);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const [maxPrice, setMaxPrice] = useState<number>();
  const [minPrice, setMinPrice] = useState<number>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countItemInPage] = useState<number>(2);

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);

  const fetchBrands = async () => {
    const listBrands = await catalogService.getBrands(selectedCategory ?? "");
    console.log(listBrands);
    setBrand(listBrands);
  };
  useEffect(() => {
    fetchBrands();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [selectedBrands, selectedCategory, currentPage]);

  const fetchProducts = async (min?: number, max?: number) => {
    setIsLoading(true);
    const params: {
      category?: string | null;
      price?: string;
      brand?: string;
      page?: number;
      limit?: number;
    } = {
      category: selectedCategory,
      page: currentPage,
      limit: countItemInPage,
    };
    if (min && max) {
      params.price = [min, max].join("-");
    } else {
      if (priceRange && priceRange.length > 0) {
        params.price = priceRange.join("-");
      }
    }
    if (selectedBrands && selectedBrands.length > 0) {
      params.brand = selectedBrands.join(",");
    }
    try {
      const productsData = await catalogService.get(params);

      if (productsData.data.length > 0) {
        if (isLoadingMore) {
          setProducts((prevProducts) => ({
            ...productsData,
            data: [...prevProducts.data, ...productsData.data],
          }));
        } else {
          setProducts(productsData);
        }
        if (!minPrice && !maxPrice) {
          // console.log(productsData);
          const minPrice = productsData.minPrice;
          const maxPrice = productsData.maxPrice;
          setMaxPrice(maxPrice);
          setMinPrice(minPrice);
          if (priceRange.length === 0) {
            setPriceRange([minPrice, maxPrice]);
          }
        }

        setNoProductsFound(false);
      } else {
        setNoProductsFound(true);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoadingMore(false);
      setIsLoading(false);
    }
  };
  const handlePriceInputChange = (
    min: number | string,
    max: number | string
  ) => {
    min = convertStringToNumber(min);

    max = convertStringToNumber(max);
    setPriceRange([min, max]);
  };
  const handleOnKeyDownChange = (
    event: React.KeyboardEvent,
    min: number | string,
    max: number | string
  ) => {
    if (event.key === "Enter") {
      min = convertStringToNumber(min);
      max = convertStringToNumber(max);
      if (maxPrice !== undefined) {
        if (minPrice !== undefined) {
          if (min > maxPrice) {
            min = maxPrice;
            max = maxPrice;
          }
          if (max > maxPrice) {
            max = maxPrice;
          }
          if (min < minPrice) {
            min = minPrice;
          }
          if (max < minPrice) {
            max = maxPrice;
          }
          setPriceRange([min, max]);
          fetchProducts();
        }
      }
    }
  };
  const handleSliderPriceChange = (range: number[]) => {
    setPriceRange(range);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedBrands((prevSelectedBrands) => [...prevSelectedBrands, value]);
    } else {
      setSelectedBrands((prevSelectedBrands) =>
        prevSelectedBrands.filter((brand) => brand !== value)
      );
    }
    setCurrentPage(1);
  };

  const { HandleAddBasket } = useAddToBasket();

  const handlePageChange = (page: number): void => {
    // console.log(page);
    setCurrentPage(page);
    setProducts((prevProducts) => ({
      ...prevProducts,
      data: [],
    }));
    setIsLoadingMore(false);
  };
  const loadMoreItems = () => {
    if (currentPage < products.totalPages) {
      setIsLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    products && (
      <div className={classes.catalogPage}>
        <SortBlock
          fetchProducts={fetchProducts}
          handleCheckboxChange={handleCheckboxChange}
          minPrice={minPrice ?? 0}
          maxPrice={maxPrice ?? 0}
          priceRange={priceRange}
          brand={brand}
          selectedBrands={selectedBrands}
          handleOnKeyDownChange={handleOnKeyDownChange}
          handlePriceInputChange={handlePriceInputChange}
          handleSliderPriceChange={handleSliderPriceChange}
        />
        {noProductsFound ? (
          <NoProductFound />
        ) : (
          <div className={classes.catalogBlock}>
            <CardList products={products} HandleAddBasket={HandleAddBasket} />
            <LoadMore
              showMoreProducts={loadMoreItems}
              totalPages={products.totalPages}
              currentPage={currentPage}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={products.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    )
  );
};
