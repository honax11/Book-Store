import React, { useEffect, useState } from "react";
import "./brandContainer.scss";
import { useParams } from "react-router-dom";
import { ProductList } from "shared/components/product-list/ProductList";
import { getAllCategories, getAllColor, getAllSizes } from "shared/services/customer-services/brand/brand-service";
import { BrandProductFilters } from "shared/models/brand/BrandProductFilters";
import { Brand } from "shared/models/brands/Brand";
import { ProductColor } from "shared/models/clothes/ProductColor";
import { Helmet } from "react-helmet-async";
import { Category } from "shared/models/category/Category";
import { Size } from "shared/models/sizes/Size";
import { SortList } from "shared/models/enums/SortList";
import { MobileFiltersPopup } from "shared/components/popups/mobile-filters-popup/MobileFiltersPopup";
import { MobileSortingPopup } from "shared/components/popups/mobile-sorting-popup/MobileSortingPopup";
import { getBrandClick } from "shared/services/customer-services/click/click-service";
import { Product } from "shared/models/product/Product";
import { get, postReturnBody } from "shared/services/HTTPUserService";
import { WebFilters } from "shared/components/web-filters/WebFilters";

const BrandContainer = () => {
    const [brand, setBrand] = useState<Brand>();
    const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
    const [selectedSize, setSelectedSize] = useState<Size[]>([]);
    const [selectedColor, setSelectedColor] = useState<ProductColor[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [colors, setColors] = useState<ProductColor[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<BrandProductFilters>({ categories: [], colors: [], sizes: [], brandId: '' });
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [page, setPage] = useState(1);

    const [modalFiltersOpen, setFiltersOpen] = useState(false);
    const [modalSortOpen, setSortOpen] = useState(false);
    const [sortFilter, setSortFilter] = useState<SortList>(SortList.NewFirst);

    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    const [transformImageWidth, setTransformImageWidth] = useState(0);
    const [transformImageHeight, setTransformImageHeight] = useState(0);

    useEffect(() => {
        getAllBrand();
        getInitialData();
    }, []
    );

    useEffect(() => {
        if (window.innerWidth < 577) {
            setTransformImageHeight(205);
            setTransformImageWidth(350);

            setImageHeight(205);
            setImageWidth(350);
        }
        else {
            setTransformImageHeight(339);
            setTransformImageWidth(578);

            setImageHeight(339);
            setImageWidth(578);
        }
    }, [])

    const loadMoreProducts = () => {
        setPage((page) => page + 1);
    };

    const getInitialData = () => {
        getAllCategories(setCategories, id ? id : '');
        getAllSizes(setSizes, id ? id : '');
        getAllColor(setColors, id ? id : '');
        setFirstTimeFilter();
    }

    const getAllBrand = () => {
        get(`Designer/Get?id=${id}`)
            .then((item: Brand) => {
                setBrand(item);
            });
    };

    const setFirstTimeFilter = () => {
        let tempFilter: BrandProductFilters = {
            brandId: id!,
            categories: [],
            sizes: [],
            colors: []
        };

        setFilters(tempFilter);
        getAllProducts(tempFilter);
    }

    const getAllProducts = (body: BrandProductFilters) => {
        postReturnBody(`Product/GetAllForBrand`, body).then((response) => {
            setTimeout(() => {
                setProducts(response);
            }, 700)
        });
        getBrandClick(id!)
    };
    const onSelectSize = (selectedList: any, selectedItem: any) => {
        let tempSelectedSizes = [...selectedSize];
        tempSelectedSizes.push(selectedItem);
        setSelectedSize(tempSelectedSizes);

        let tempFilter = { ...filters };
        tempFilter.sizes?.push(selectedItem.id);
        setPage(1);
        setFilters(tempFilter);
        getAllProducts(tempFilter);
    }
    const onSelectColor = (selectedList: any, selectedItem: any) => {
        const tempSelectedColors = [...selectedColor];
        tempSelectedColors.push(selectedItem);
        setSelectedColor(tempSelectedColors);

        let tempFilter = { ...filters };
        tempFilter.colors?.push(selectedItem.id);
        setPage(1);
        setFilters(tempFilter);
        getAllProducts(tempFilter);
    }
    const onSelectCategory = (selectedList: any, selectedItem: any) => {
        let tempFilter = { ...filters };
        if (filters.categories.indexOf(selectedItem.id) < 0) {
            tempFilter.categories?.push(selectedItem.id);
            const tempSelectedCategories = [...selectedCategory];
            tempSelectedCategories.push(selectedItem);
            setSelectedCategory(tempSelectedCategories);
        }
        setPage(1);
        setFilters(tempFilter);
        getAllProducts(tempFilter);
    }

    const onRemoveCategory = (selectedList: any, selectedItem: any) => {
        let tempFilter = { ...filters };
        tempFilter.categories = filters.categories?.filter(x => x != selectedItem.id);
        setPage(1);

        const tempSelectedCategories = selectedCategory.filter(x => x.id != selectedItem.id);
        setSelectedCategory(tempSelectedCategories);
        setFilters(tempFilter);
        getAllProducts(tempFilter);
    }

    const onRemoveSize = (selectedList: any, selectedItem: any) => {
        let tempFilter = { ...filters };
        tempFilter.sizes = filters.sizes?.filter(x => x != selectedItem.id);

        let tempSelectedSizes = selectedSize.filter(x => x.id != selectedItem.id);

        setSelectedSize(tempSelectedSizes);

        setPage(1);
        setFilters(tempFilter);
        getAllProducts(tempFilter);
    }

    const onRemoveColor = (selectedList: any, selectedItem: any) => {
        let tempFilter = { ...filters };
        tempFilter.colors = filters.colors?.filter(x => x != selectedItem.id);
        setPage(1);

        const tempSelectedColors = selectedColor.filter(x => x.id != selectedItem.id);
        setSelectedColor(tempSelectedColors);
        setFilters(tempFilter);
        getAllProducts(tempFilter);
    }

    const onSelectSorting = (selectedItem: SortList) => {
        let tempFilter = { ...filters };
        // tempFilter.sortList = selectedItem;
        // tempFilter.page = 1;

        setPage(1);
        setSortFilter(selectedItem)
        // getAllProducts(tempFilter, 1);
    }

    return (
        <>
            <Helmet>
                <title>{`${brand?.firstName} ${brand?.lastName}`}</title>
                <meta name="description" content={brand?.description} />
                <link rel="canonical" href={process.env.REACT_APP_URL + `/clothes/${id}`} />
            </Helmet>
            <div className="brand">
                <div className="container">
                    <div className="brand__general">
                        <img
                            className="brand__imgImg"
                            alt={brand?.imageAlt}
                            height={imageHeight}
                            width={imageWidth}
                            title={brand?.imageAlt}
                            src={`https://ik.imagekit.io/mlrsaclra/tr:h-${transformImageHeight},w-${transformImageWidth}/` + brand?.pictures[0].url.substring(57)}
                        />
                        <div>
                            <h1 className="brand__title">{brand?.firstName} {brand?.lastName}</h1>
                            <div className="brand__text">{brand?.description}</div>
                        </div>
                    </div>

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
                    </div>
                </div>
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
                <MobileSortingPopup setSortFilter={setSortFilter} closeModal={() => setSortOpen(false)} modalSortOpen={modalSortOpen} sortType={sortFilter}></MobileSortingPopup>
            </div>
        </>
    )
}
export default BrandContainer;