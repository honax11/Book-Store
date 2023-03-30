import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductList } from "shared/components/product-list/ProductList";
import "./booksContainer.scss";
import { ThreeDots } from "react-loader-spinner";
import { ProductColor } from "shared/models/clothes/ProductColor";
import { ProductFilters } from "shared/models/clothes/ProductFilters";
import { Helmet } from "react-helmet-async";
import { Category } from "shared/models/category/Category";
import { ProductType } from "shared/models/category/ProductType";
import { Size } from "shared/models/sizes/Size";
import { SortList } from "shared/models/enums/SortList";
import { MobileFiltersPopup } from "shared/components/popups/mobile-filters-popup/MobileFiltersPopup";
import { MobileSortingPopup } from "shared/components/popups/mobile-sorting-popup/MobileSortingPopup";
import { onRequestGetAllScroll } from "shared/services/customer-services/click/click-service";
import { Product } from "shared/models/product/Product";
import { get, postReturnBody } from "shared/services/HTTPUserService";
import { WebFilters } from "shared/components/web-filters/WebFilters";

interface Props {
    pageType: ProductType;
    pageTitle: string;
    pageDescription: string;
}
const BooksContainer = ({ pageType, pageTitle, pageDescription }: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
    const [selectedSize, setSelectedSize] = useState<Size[]>([]);
    const [selectedColor, setSelectedColor] = useState<ProductColor[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [colors, setColors] = useState<ProductColor[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [filters, setFilters] = useState<ProductFilters>({ categories: [], colors: [], sizes: [], type: pageType, page: 1, pageSize: 12, sortList: SortList.None });
    const [sortFilter, setSortFilter] = useState<SortList>(SortList.NewFirst);

    const [loadingTime, setLoadingTime] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [page, setPage] = useState(1);

    const [modalFiltersOpen, setFiltersOpen] = useState(false);
    const [modalSortOpen, setSortOpen] = useState(false);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [canonical, setCanonical] = useState<string>('');
    const [header, setHeader] = useState<string>('');

    const { id } = useParams();

    useEffect(() => {
        getAllCategories();
        getAllSizes();
        getAllColor();
    }, []
    );

    const loadMoreProducts = () => {
        if (hasMoreData) {
            setLoading(true);
            const tempPage = page + 1;
            setPage(tempPage);
            const tempFilters = { ...filters };
            tempFilters.page = tempPage;
            setFilters(tempFilters);
            getAllProducts(tempFilters, tempPage);
        }
    };

    const setFirstTimeFilter = (categories: Category[]) => {
        const categoryId = categories.find(item => {
            if (item.url == id) {
                return item;
            }
        })
        let tempFilter: ProductFilters = {
            sortList: SortList.None,
            type: pageType === ProductType.Sale ? ProductType.Sale : pageType,
            categories: [],
            sizes: [],
            colors: [],
            page: 1,
            pageSize: 12
        }
        if (categoryId) {
            tempFilter.categories?.push(categoryId.id);
        }
        setFilters(tempFilter);
        getAllProducts(tempFilter, 1);
    }

    const onSelectSorting = (selectedItem: SortList) => {
        let tempFilter = { ...filters };
        tempFilter.sortList = selectedItem;
        tempFilter.page = 1;

        setPage(1);
        setSortFilter(selectedItem)
        getAllProducts(tempFilter, 1);
    }

    const getAllProducts = (body: ProductFilters, page: number) => {
        postReturnBody(`Product/${pageType === ProductType.Sale ? 'GetAllForSale' : 'GetAllForCustomer'}`, body)
            .then((response) => {
                const tempProds = [...products];
                onRequestGetAllScroll(pageType, body);
                setTimeout(() => {
                    setLoading(false);
                    if (products.length == 0 || page == 1) {
                        setProducts(response.items);
                        setLoadingTime(500);
                    } else {
                        tempProds.push(...response.items);
                        setProducts(tempProds);
                    }
                }, loadingTime);
                setPage(response.page);
                setHasMoreData(response.hasMoreData);
            });
    };

    const getAllSizes = () => {
        get(`Size/GetAllByType?type=${pageType === ProductType.Sale ? 'Clothes' : pageType}`)
            .then((response) => {
                setSizes(response);
            });
    };

    const getAllCategories = () => {
        get(`Category/GetAllByType?type=${pageType === ProductType.Sale ? 'Clothes' : pageType}`)
            .then((response) => {
                setCategories(response);
                setFirstTimeFilter(response);
                setSEO(response);
            });
    };

    const getAllColor = () => {
        get(`Product/GetAllColors?type=${pageType === ProductType.Sale ? 'Clothes' : pageType}`)
            .then((response) => {
                const res = response.map((item: string) => {
                    return {
                        id: item,
                        name: item,
                    };
                });
                setColors(res);
            });
    };

    const onSelectSize = (selectedList: any, selectedItem: any) => {
        let tempSelectedSizes = [...selectedSize];
        tempSelectedSizes.push(selectedItem);
        setSelectedSize(tempSelectedSizes);

        let tempFilter = { ...filters };
        tempFilter.sizes?.push(selectedItem.id);
        tempFilter.page = 1;
        setPage(1);
        setFilters(tempFilter);
        getAllProducts(tempFilter, 1);
    }
    const onSelectColor = (selectedList: any, selectedItem: any) => {
        const tempSelectedColors = [...selectedColor];
        tempSelectedColors.push(selectedItem);
        setSelectedColor(tempSelectedColors);

        let tempFilter = { ...filters };
        tempFilter.colors?.push(selectedItem.id);
        tempFilter.page = 1;
        setPage(1);
        setFilters(tempFilter);
        getAllProducts(tempFilter, 1);
    }
    const onSelectCategory = (selectedList: any, selectedItem: any) => {
        let tempFilter = { ...filters };
        if (filters.categories.indexOf(selectedItem.id) < 0) {
            tempFilter.categories?.push(selectedItem.id);
            const tempSelectedCategories = [...selectedCategory];
            tempSelectedCategories.push(selectedItem);
            setSelectedCategory(tempSelectedCategories);
        }
        tempFilter.page = 1;
        setPage(1);
        setFilters(tempFilter);
        getAllProducts(tempFilter, 1);
    }

    const onRemoveCategory = (selectedList: any, selectedItem: any) => {
        let tempFilter = { ...filters };
        tempFilter.categories = filters.categories?.filter(x => x != selectedItem.id);
        tempFilter.page = 1;
        setPage(1);

        const tempSelectedCategories = selectedCategory.filter(x => x.id != selectedItem.id);
        setSelectedCategory(tempSelectedCategories);
        setFilters(tempFilter);
        getAllProducts(tempFilter, 1);
    }

    const onRemoveSize = (selectedList: any, selectedItem: any) => {
        let tempFilter = { ...filters };
        tempFilter.sizes = filters.sizes?.filter(x => x != selectedItem.id);

        let tempSelectedSizes = selectedSize.filter(x => x.id != selectedItem.id);

        setSelectedSize(tempSelectedSizes);

        tempFilter.page = 1;
        setPage(1);
        setFilters(tempFilter);
        getAllProducts(tempFilter, 1);
    }

    const onRemoveColor = (selectedList: any, selectedItem: any) => {
        let tempFilter = { ...filters };
        tempFilter.colors = filters.colors?.filter(x => x != selectedItem.id);
        tempFilter.page = 1;
        setPage(1);

        const tempSelectedColors = selectedColor.filter(x => x.id != selectedItem.id);
        setSelectedColor(tempSelectedColors);
        setFilters(tempFilter);
        getAllProducts(tempFilter, 1);
    }

    const setSEO = (categories: Category[]) => {
        if (id) {
            const tempCat = categories.find(x => x.url == id);
            setTitle(tempCat?.title!);
            setDescription(tempCat?.description!);
            setCanonical(process.env.REACT_APP_URL + `${getUrlByType()}/${id}`);
            setHeader(categories.find(x => x.url == id)?.name!);
        } else {
            setCanonical(process.env.REACT_APP_URL + getUrlByType());
            setTitle(pageTitle);
            setDescription(pageDescription);
            setHeader(getHeader());
        }
    }

    const getUrlByType = () => {
        if (pageType === ProductType.Accessories) {
            return '/accessories';
        }
        if (pageType === ProductType.Clothes) {
            return '/clothes';
        }
        if (pageType === ProductType.Sale) {
            return '/sale';
        }
        else {
            return '/shose';
        }
    }
    const getHeader = () => {
        if (pageType == ProductType.Accessories) {
            return 'Аксесуари';
        }
        if (pageType == ProductType.Clothes) {
            return 'Жіночий одяг';
        }
        if (pageType == ProductType.Sale) {
            return 'Товари зі знижками';
        }
        else {
            return 'Жіноче взуття';
        }
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
            </Helmet>
            <div className="clothes">
                <div className="container">
                    <div className="clothes__general">
                        <h1 className="clothes__title">{header}</h1>
                        <div className="clothes__filters">
                            <div className="clothes__filters--web">
                                <WebFilters
                                    categories={categories}
                                    onRemoveCategory={onRemoveCategory}
                                    onSelectCategory={onSelectCategory}
                                    sizes={sizes}
                                    onRemoveSize={onRemoveSize}
                                    onSelectSize={onSelectSize}
                                    colors={colors}
                                    onRemoveColor={onRemoveColor}
                                    onSelectColor={onSelectColor}
                                    onSelectSorting={onSelectSorting}
                                ></WebFilters>
                            </div>
                            <div className="clothes__filters--mobile">
                                <button className="btn-filters-mobile me-4" onClick={() => setFiltersOpen(true)}>Фільтри</button>
                                <button className="btn-filters-mobile" onClick={() => setSortOpen(true)}>Сортування</button>
                            </div>
                        </div>
                        <div>
                            {products &&
                                <ProductList
                                    isLoading={loading}
                                    hasMoreData={hasMoreData}
                                    loadOnMount={true}
                                    onBottomHit={loadMoreProducts}
                                    products={products}
                                ></ProductList>}
                            {products.length == 0 && !loading &&
                                <h1 className="no-filtrs">За обраним фільтром товарів не знайдено</h1>}
                        </div>
                        <ThreeDots visible={loading} color='black' wrapperStyle={{ "justifyContent": "center" }} />
                        <MobileFiltersPopup
                            closeModal={() => setFiltersOpen(false)}
                            modalFiltersOpen={modalFiltersOpen}
                            categories={categories}
                            colors={colors}
                            sizes={sizes}
                            onRemoveCategory={onRemoveCategory}
                            onRemoveColor={onRemoveColor}
                            onRemoveSize={onRemoveSize}
                            onSelectCategory={onSelectCategory}
                            onSelectColor={onSelectColor}
                            onSelectSize={onSelectSize}
                            selectedCategories={selectedCategory}
                            selectedColors={selectedColor}
                            selectedSizes={selectedSize}
                        ></MobileFiltersPopup>
                        <MobileSortingPopup setSortFilter={onSelectSorting} closeModal={() => setSortOpen(false)} modalSortOpen={modalSortOpen} sortType={sortFilter}></MobileSortingPopup>
                    </div>
                </div>
            </div>
        </>
    )
};

export default BooksContainer;
