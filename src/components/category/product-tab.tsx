import bg from "date-fns/esm/locale/bg/index.js";
import { productFilters } from "lib/types/dummy-data";

export default function ProductTab({
    activeTab,
    setActiveTab,
}: {
    activeTab: string;
    setActiveTab: any;
}) {
    return (
        <div className="flex items-center justify-between px-5">
            {productFilters?.map((filter) => {
                return (
                    <div
                        onClick={() => setActiveTab(filter)}
                        id={
                            activeTab === filter ? "gradient-border" : undefined
                        }
                        className={
                            "bg-white relative bg-clip-padding text-sm rounded-md z-10 shadow-merchant-card p-2.5 " +
                            (activeTab === filter ? "text-main " : "text-gray")
                        }
                    >
                        {filter}
                    </div>
                );
            })}
        </div>
    );
}
