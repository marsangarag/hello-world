import CategoryTab from "components/category/tab";
import { useAppState } from "lib/context/app";
import { categoryDummyData } from "lib/types/dummy-data";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Category() {
    const router = useRouter();
    const [state, dispatch]: any = useAppState();
    const categoryName = router.query.categoryId;
    const [activeTab, setActiveTab] = useState<string>(categoryName as string);
    return (
        <div className="flex flex-col gap-y-2.5">
            <div className="bg-white rounded-2.5xl shadow-merchant-card flex flex-col gap-y-5 p-5">
                <CategoryTab
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>
        </div>
    );
}
