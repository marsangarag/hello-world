import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CategoryCard({
    category,
}: {
    category: { title: string; img: string };
}) {
    const { title, img } = category;
    const router = useRouter();
    const onCategoryCardClick = async () => {
        router.push(`/category/${title}`);
    };
    return (
        // <Link href={`/office/${router.query.officeId}/category/${title}`}>
        <div
            onClick={onCategoryCardClick}
            className="flex flex-col items-center gap-y-1.25"
        >
            <Image
                src={`/images/${img}`}
                alt={img}
                width={72.5}
                height={72.5}
                className="rounded-md object-cover"
            />
            <div className="text-xs">{title}</div>
        </div>
        // </Link>
    );
}
