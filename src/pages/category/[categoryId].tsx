import MerchantCard from "components/cards/product-card";
import CategoryProduct from "components/category/product-list";
import ProductTab from "components/category/product-tab";
import CategoryTab from "components/category/tab";
import { Oops } from "components/icons";
import { useAppState } from "lib/context/app";
import { dummyProducts, productFilters } from "lib/types/dummy-data";
import { Merchant } from "lib/types/office.type";
import { useRouter } from "next/router";
import { useState } from "react";
import { Accordion } from "react-accessible-accordion";

export default function Category() {
    const router = useRouter();
    const [state, dispatch]: any = useAppState();
    const categoryName = router.query.categoryId;
    const [activeTab, setActiveTab] = useState<string>(categoryName as string);
    const [productTab, setProductTab] = useState<string>(productFilters[0]);
    const { merchants, products } = state;

    return (
        <div className="flex flex-col gap-y-2.5 w-full h-[calc(100vh-50px)] overflow-hidden">
            <div className="bg-white rounded-2.5xl shadow-delivery flex flex-col gap-y-5 py-5">
                <div className="px-5">
                    <CategoryTab
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>
                <CategoryProduct />
            </div>
            <ProductTab activeTab={productTab} setActiveTab={setProductTab} />
            <div className="relative w-full h-full overflow-y-scroll scrollbar-hide py-5 -mt-2.5">
                {dummyProducts ? (
                    <Accordion
                        // allowMultipleExpanded
                        allowZeroExpanded
                        className="flex flex-col gap-y-2.5 px-5"
                    >
                        {dummyProducts?.map((product) => {
                            return (
                                <MerchantCard
                                    key={product.title}
                                    product={product}
                                />
                            );
                        })}
                    </Accordion>
                ) : (
                    <div className="absolute items-center text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-5">
                        <Oops />
                        <div className="font-light">
                            Урамшуулалтай газар байхгүй байна
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
