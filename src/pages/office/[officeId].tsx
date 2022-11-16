import Recommended from "components/cards/recommended-card";
import GradientMerchantCard from "components/cards/gradient-merchant-card";
import CategoryTitle from "components/common/category-title";
import CenteredSpin from "components/common/centered-spin";
import { FilterIcon } from "components/icons";
import { FoodSearchInput } from "components/office/office-search";
import CategoryCard from "components/product-category/card";
import { useAppState } from "lib/context/app";
import { categoryDummyData, recommendedDummyData } from "lib/types/dummy-data";
import { Merchant } from "lib/types/office.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Office() {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();
    const officeId = router.query.officeId;
    const [loading, setLoading] = useState<boolean>(false);
    const filterNames = [
        "Үнэлгээгээр",
        "Үнээр",
        "Хүргэлтээр",
        "Урамшуулалтай",
        "Шинэ",
    ];
    const [activeFilter, setActiveFilter] = useState<string>(filterNames[0]);

    const getMerchants = async () => {};
    const { merchants } = state;

    const getCategories = async () => {};

    useEffect(() => {
        if (officeId) {
        }
    }, [officeId]);

    return loading ? (
        <CenteredSpin />
    ) : (
        <>
            <div className="p-5 flex flex-col gap-y-5 relative">
                {/* Search Input  */}
                <FoodSearchInput />
                <div className="grid grid-cols-4 items-center gap-y-3.75">
                    {categoryDummyData?.map((category) => {
                        return (
                            <CategoryCard
                                category={category}
                                key={category.title}
                            />
                        );
                    })}
                </div>
                <div>
                    <div className="flex justify-between pb-[15px] items-center">
                        <CategoryTitle title="Бүгд" />
                        <div className="flex gap-x-2.5 items-center">
                            <div className="text-xs font-light text-gray">
                                {activeFilter}
                            </div>
                            <FilterIcon />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2.5">
                        {merchants?.slice(0, 2).map((merchant: Merchant) => {
                            return (
                                <GradientMerchantCard
                                    key={merchant._id}
                                    merchant={merchant}
                                />
                            );
                        })}
                        <div className="overflow-x-scroll scrollbar-hide -mx-5 px-5 flex items-start gap-x-2.5">
                            {recommendedDummyData?.map((data) => {
                                return (
                                    <Recommended key={data.name} data={data} />
                                );
                            })}
                        </div>
                        {merchants?.slice(3).map((merchant: Merchant) => {
                            return (
                                <GradientMerchantCard
                                    key={merchant._id}
                                    merchant={merchant}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
