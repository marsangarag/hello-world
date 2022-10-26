import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";

import Category from "components/category/index";
import ProductCard from "components/product/card";
import CenteredSpin from "components/common/centered-spin";
import { Product } from "lib/types/merchant-product.type";
import { useAppState } from "lib/context/app";

const ProductList: NextPage = () => {
    const router = useRouter();
    const merchantId = router.query.merchantId;
    const categoryId = router.query.categoryId;
    const [state, dispatch]: any = useAppState();
    const [categoryTabId, setCategoryTabId] = useState<string>("");
    const [collapseId, setCollapseId] = useState<any>(false);
    const [alreadyOpened, setAlreadyOpened] = useState<boolean>(true);

    const toggle = (productId: any) => {
        setAlreadyOpened(false);
        setCollapseId(collapseId === productId ? null : productId);
    };

    const productId = router.query.productId ? router.query.productId : "";

    const apiUrl = `/coffee/app/merchant/${
        merchantId ? merchantId.toString() : 0
    }/product/${
        categoryTabId ? categoryTabId : categoryId ? categoryId.toString() : 0
    }/office/${state.officeId}`;

    const { data, error } = useSWR(`${apiUrl}`);

    useEffect(() => {
        if (data?.data?.data) {
            dispatch({
                type: "cartCount",
                cartCount: data?.data?.data?.cart.total_qty,
            });
            dispatch({
                type: "cartPrice",
                cartPrice: data?.data?.data?.cart.total,
            });
        }
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    if (error) return null;

    if (!error && !data) return <CenteredSpin />;

    return (
        data && (
            <div className="w-full p-5">
                <div
                    className="h-[50px] mt-[-20px] w-[calc(-40px+100vw)] rounded-xl
                     absolute"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(245,245,250,1) 0%, rgba(245,245,250,0) 80%)",
                    }}
                ></div>
                {categoryId && data?.data?.data?.categories.length > 0 && (
                    <Category
                        categories={data?.data?.data?.categories}
                        defaultCategoryId={
                            categoryTabId
                                ? categoryTabId
                                : categoryId.toString()
                        }
                        setCategoryTabId={setCategoryTabId}
                    />
                )}
                <div className="pt-14">
                    {merchantId &&
                        data?.data?.data?.products.length > 0 &&
                        data?.data?.data?.products.map(
                            (product: Product, index: number) => (
                                <ProductCard
                                    key={product._id + index}
                                    collapseId={collapseId}
                                    productId={product._id}
                                    merchantId={merchantId.toString()}
                                    categoryId={
                                        categoryTabId
                                            ? categoryTabId
                                            : categoryId
                                            ? categoryId.toString()
                                            : ""
                                    }
                                    product={product}
                                    isAlreadyOpened={
                                        productId
                                            ? productId == product._id
                                                ? true
                                                : false
                                            : index == 0
                                            ? true
                                            : false
                                    }
                                    alreadyOpened={alreadyOpened}
                                    toggle={toggle}
                                />
                            )
                        )}
                </div>
            </div>
        )
    );
};

export default ProductList;
