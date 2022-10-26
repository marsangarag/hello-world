import Link from "next/link";
import { useRouter } from "next/router";

import { Category } from "lib/types/merchant-menu-category.type";
import { useAppState } from "lib/context/app";

interface CategoryCardProps {
    merchantId: string;
    category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    merchantId,
    category,
}) => {
    const router = useRouter();
    const [state, dispatch]: any = useAppState();

    return (
        <Link
            href={`/product-list/${merchantId}/${category._id}?tokenid=${router.query.tokenid}`}
        >
            <a
                onClick={() =>
                    dispatch({
                        type: "categoryId",
                        categoryId: category._id,
                    })
                }
            >
                <div
                    className="w-full p-[10px] mb-3 bg-white justify-items-center rounded-3xl"
                    style={{
                        boxShadow: "5px 5px 10px 0 rgba(30, 35, 53, 0.05)",
                    }}
                >
                    <img
                        src={category.logo}
                        alt={category.name}
                        className="object-contain w-[40px] h-[40px] mx-auto mb-[8px] rounded-2xl"
                    />
                    <p className="overflow-hidden text-xs font-light text-center truncate">
                        {category.name}
                    </p>
                </div>
            </a>
        </Link>
    );
};

export default CategoryCard;
