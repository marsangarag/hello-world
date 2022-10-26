import Spin from "./spin";

export default function LargeWhiteButton({
    type = "button",
    text,
    roundedClass,
    border,
    formId,
    onClick,
    loading = false,
}: any) {
    return formId ? (
        <button
            disabled={loading}
            onClick={onClick}
            type={type}
            className={`flex items-center justify-center w-full px-8 py-3 mt-[10px] font-normal text-[base]  text-[#1E2335] bg-[#F5F5FA] ${
                roundedClass ? roundedClass : "rounded-[15px]"
            }${border ? ` ${border}` : ""}`}
            form={formId}
        >
            {loading && (
                <span className="mr-2">
                    <Spin size={16} />
                </span>
            )}
            {text}
        </button>
    ) : (
        <button
            disabled={loading}
            onClick={onClick}
            type={type}
            className={`flex items-center justify-center w-full px-8 py-3 mt-[10px] text-base font-normal text-black xt-[#1E2335] bg-[#F5F5FA] ${
                roundedClass ? roundedClass : "rounded-[15px]"
            }${border ? ` ${border}` : ""}`}
        >
            {loading && (
                <span className="mr-2">
                    <Spin size={16} />
                </span>
            )}
            {text}
        </button>
    );
}
