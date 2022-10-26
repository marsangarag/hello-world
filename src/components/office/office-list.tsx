import CenteredSpin from "components/common/centered-spin";
import Overlay from "components/common/overlay";
import OfficeCard from "./card";
import Office from "lib/types/office.type";

interface OfficeListProps {
    title: string;
    offices: Office[];
    loading: boolean;
    height: string;
    setHeight: any;
    setMaxHeight: any;
}

const OfficeList: React.FC<OfficeListProps> = ({
    title,
    offices,
    loading,
    height,
    setHeight,
    setMaxHeight,
}) => {
    const heightHandler = async () => {
        height == "340px"
            ? (setHeight("100%"), setMaxHeight("90vh"))
            : (setHeight("340px"), setMaxHeight("40vh"));
    };

    return (
        <div className="relative w-full">
            <div className="drag-indicator"></div>
            {loading && (
                <>
                    {/* <Overlay isOfficeList={true} />
                    <CenteredSpin size={8} /> */}
                </>
            )}
            <div
                className="mt-[-20px] pt-[20px] mx-[-20px] px-[20px]"
                onTouchEnd={() => heightHandler()}
            >
                {title && (
                    <h3 className="text-center text-[#1E2335] text-base font-medium mb-5">
                        {title}
                    </h3>
                )}
            </div>
            <div
                className={`scrollbar-hide h-full pb-6 px-5 mx-[-20px] pt-5 mt-[-20px] ${
                    !loading && height != "340px" && "overflow-auto"
                }`}
            >
                {offices &&
                    offices.map((office: Office, index: number) => (
                        <OfficeCard key={index} office={office} />
                    ))}
            </div>
        </div>
    );
};

export default OfficeList;
