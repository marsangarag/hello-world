import CategoryTitle from "components/common/category-title";
import CenteredSpin from "components/common/centered-spin";
import { FoodSearchInput } from "components/office/office-search";
import { CategoryCard } from "components/product-category/card";
import { useAppState } from "lib/context/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Office() {
    const [state, dispatch]: any = useAppState();
    const router = useRouter();
    const officeId = router.query.officeId;
    const [loading, setLoading] = useState<boolean>(false);

    const getProducts = async () => {};

    const getCategories = async () => {};

    useEffect(() => {
        if (officeId) {
        }
    }, [officeId]);

    const categories = [
        { title: "Монгол", img: "placeholder.png" },
        { title: "Ланч сэт", img: "placeholder.png" },
        { title: "Солонгос", img: "placeholder.png" },
        { title: "Япон", img: "placeholder.png" },
        { title: "Хятад", img: "placeholder.png" },
        { title: "Шөл", img: "placeholder.png" },
        { title: "Хуурга", img: "placeholder.png" },
        { title: "Ширхэгийн", img: "placeholder.png" },
        { title: "Тахиа", img: "placeholder.png" },
        { title: "Салад", img: "placeholder.png" },
        { title: "Бургер", img: "placeholder.png" },
        { title: "Бусад", img: "placeholder.png" },
    ];

    return loading ? (
        <CenteredSpin />
    ) : (
        <>
            <div className="p-5 flex flex-col gap-y-5 relative">
                {/* Search Input  */}
                <FoodSearchInput />
                <div className="grid grid-cols-4 items-center gap-y-3.75">
                    {categories?.map((category) => {
                        return (
                            <CategoryCard
                                category={category}
                                key={category.title}
                            />
                        );
                    })}
                </div>
                <div className="flex justify-between items-center">
                    <CategoryTitle title="Бүгд" />
                </div>
            </div>
        </>
    );
}
