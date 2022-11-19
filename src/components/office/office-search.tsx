export function FoodSearchInput() {
    return (
        <>
            <input
                type="text"
                className="bg-white caret-[#FF7A1F] font-light relative rounded-md py-[9px] px-8 focus:outline-none placeholder:font-light placeholder:text-sm text-sm"
                placeholder="Хайх"
            />
            <div className="absolute left-[30px] icon-Search---Light-icon-2 top-[28px]"></div>
        </>
    );
}
