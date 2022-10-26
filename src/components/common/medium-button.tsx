import { useAppState } from "lib/context/app";

export default function MediumButton({
    text,
    onClick,
    secondLineText = "",
    white = false,
    additionalClass = "",
}: any) {
    const [state]: any = useAppState();

    return (
        <button
            onClick={onClick}
            type="button"
            className={`flex flex-col items-center justify-center px-6 py-2 text-sm font-medium ${
                white ? `text-[#647382] font-normal` : `text-white`
            } ${additionalClass ? additionalClass : ``} rounded-xl`}
            style={{
                backgroundColor: white ? "#ffffff" : state.themeColor,
                boxShadow: "0 5px 5px 0 rgba(30, 35, 53, 0.05)",
            }}
        >
            {secondLineText && (
                <div className="font-light ">{secondLineText}</div>
            )}
            {text}
        </button>
    );
}
