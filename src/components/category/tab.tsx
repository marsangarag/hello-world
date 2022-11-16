import { categoryDummyData } from "lib/types/dummy-data";

export default function CategoryTab({
    activeTab,
    setActiveTab,
}: {
    activeTab: string;
    setActiveTab: any;
}) {
    return (
        <div className="flex overflow-x-scroll scrollbar-hide gap-x-5 items-stretch -mx-5 px-[30px]">
            <div
                onClick={() => setActiveTab("Бүгд")}
                className="flex flex-col gap-y-2 whitespace-nowrap"
            >
                <div
                    className={
                        "Бүгд" === activeTab
                            ? "text-main font-medium"
                            : "text-gray"
                    }
                >
                    Бүгд
                </div>
                {"Бүгд" === activeTab && (
                    <div className="h-0.5 bg-gradient-to-r from-gradient-start to-gradient-end rounded-sm"></div>
                )}
            </div>
            {categoryDummyData?.map((category) => {
                const { title } = category;
                return (
                    <div
                        onClick={() => setActiveTab(title)}
                        key={title}
                        className="flex flex-col gap-y-2 whitespace-nowrap"
                    >
                        <div
                            className={
                                title === activeTab
                                    ? "text-main font-medium"
                                    : "text-gray"
                            }
                        >
                            {title}
                        </div>
                        {title === activeTab && (
                            <div className="h-0.5 bg-gradient-to-r from-gradient-start to-gradient-end rounded-sm"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
