import { useContext, useState, useEffect, useReducer } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { yupResolver } from "@hookform/resolvers/yup";

import TokiAPI from "lib/api/toki";
import { toast } from "lib/utils/helpers";
import { ReviewType } from "lib/types/review-type";
// import { ModalContext } from "lib/context/modal";
import CenteredSpin from "components/common/centered-spin";
import { useAppState } from "lib/context/app";

interface SubmitReviewProps {
    orderId: string | string[];
}

const SubmitReview: React.FC<SubmitReviewProps> = ({ orderId }) => {
    const [state, dispatch]: any = useAppState();
    // const { handleModal }: any = useContext(ModalContext);
    const [data, setData] = useState([]);
    const [star, setStar] = useState(state.star);
    const [types, setTypes] = useState<any>([]);
    const [count, setCount] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    console.log(state.star);
    const validationSchema = yup.object().shape({
        star: yup
            .number()
            .required("Оноо өгнө үү")
            .default(state.star ? state.star : 5)
            .nullable(),
        type: yup.string().nullable(),
        comment: yup.string(),
    });

    const apiUrl = `/coffee/app/order/merchant/${state.merchantId}?status=completed&page_size=10&page=1`;

    useEffect(() => {
        if (orderId) {
            setLoading(true);

            const fetchDatas = async () => {
                try {
                    const { data } = await TokiAPI.getReviewTypes();

                    if (data.status_code === 0) {
                        setData(data.data);
                    } else {
                        toast(data.message);
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchDatas();
        }
    }, [orderId]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({ resolver: yupResolver(validationSchema) });

    useEffect(() => {
        if (state.star) {
            setValue("star", state.star);
        }
    }, [state.star]);

    useEffect(() => {
        if (errors.star?.message) {
            toast("Та одноос сонгож үнэлгээ өгнө үү");
        }
    }, [errors]);

    const onSubmitHandler = async (values: any) => {
        values["order_id"] = orderId;

        let type = types;

        let uniqueTypes = type.filter((c: any, index: any) => {
            return type.indexOf(c) === index;
        });

        values["type"] = uniqueTypes.join(", ");

        setLoading(true);

        try {
            const { data } = await TokiAPI.submitReview(values);

            if (data?.status_code === 0) {
            } else {
                toast(data?.message);
            }
        } finally {
            await mutate(apiUrl);
            setLoading(false);
            // handleModal();
            dispatch({
                type: "star",
                star: 0,
            });
            reset();
        }
    };

    const renderClickableStars = () => {
        const stars: any[] = [];

        for (let i = 1; i <= 5; i++) {
            let item;

            item = (
                <li
                    key={i}
                    className="cursor-pointer"
                    onClick={() => (setStar(i), types.splice(0))}
                >
                    {star > i - 1 ? (
                        <>
                            <input
                                id={`star_${i}`}
                                className="sr-only peer"
                                type="radio"
                                value={i}
                                {...register("star")}
                            />
                            <label htmlFor={`star_${i}`}>
                                <span className="ml-1 text-lg icon-Star---Yellow-icon"></span>
                            </label>
                        </>
                    ) : (
                        <>
                            <input
                                id={`star_${i}`}
                                className="sr-only peer"
                                type="radio"
                                value={i}
                                {...register("star")}
                            />
                            <label htmlFor={`star_${i}`}>
                                <span className="ml-1 text-lg icon-Star---Gray-icon"></span>
                            </label>
                        </>
                    )}
                </li>
            );

            stars.push(item);
        }

        return stars;
    };

    function contains(array: any, type: string) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === type) {
                return true;
            }
        }
        return false;
    }

    // function arrayAddElement(value: string) {
    //     types && types.indexOf(String(value)) !== -1
    //         ? setTypes((current: any) =>
    //               current.filter((element: any) => {
    //                   return element !== value;
    //               })
    //           )
    //         : setTypes((current: any) => [...current, value]);
    //     console.log("test", types);
    // }

    function arrayAddElement(value: string) {
        types && types.includes(String(value)) === true
            ? setTypes((current: any) =>
                  current.filter((element: any) => {
                      return element !== value;
                  })
              )
            : setTypes((current: any) => [...current, value]);
    }

    return (
        <>
            {loading && (
                <>
                    <div
                        className={`fixed h-full  w-full top-0 overflow-auto scrollbar-hide bg-black z-50 bg-opacity-25`}
                    />
                    <CenteredSpin size={8} />
                </>
            )}
            <form
                id="submit-review-form"
                onSubmit={handleSubmit(onSubmitHandler)}
                className="w-full divide-y divide-dashed"
            >
                <div>
                    <div className="flex justify-between w-full ">
                        <p className="text-sm font-light break-normal leading-loose text-[#647382]">
                            {!star
                                ? "Үнэлнэ үү"
                                : star > 3
                                ? "Үйлчилгээ сайн"
                                : star < 3
                                ? "Үйлчилгээ муу"
                                : star == 3
                                ? "Үйлчилгээ дунд"
                                : "Үнэлнэ үү"}{" "}
                            :
                        </p>

                        <ul className="flex justify-center">
                            {renderClickableStars()}
                        </ul>
                    </div>
                    <p className="mt-1 mb-3 text-xs italic text-right text-red-500">
                        {errors.star?.message}
                    </p>
                </div>

                <div className="pt-[20px]">
                    <ul className="flex flex-wrap ">
                        {data &&
                            data.map(
                                (reviewType: ReviewType, index: number) =>
                                    reviewType.star == star &&
                                    star != 3 && (
                                        <ul
                                            className="flex flex-wrap "
                                            key={index}
                                        >
                                            {reviewType.choices &&
                                                reviewType.choices.map(
                                                    (
                                                        reviewType: ReviewType,
                                                        index: number
                                                    ) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                className="relative mb-2 mr-2 cursor-pointer w-fit"
                                                            >
                                                                {types &&
                                                                types.includes(
                                                                    String(
                                                                        reviewType
                                                                    )
                                                                ) === true ? (
                                                                    <div
                                                                        className={`border-[#1E2335] text-[#1E2335] ring-[#1E2335]  ring-2 font-md  border-transparent text-sm flex  font-light  border rounded-[10px] cursor-pointer focus:outline-none  px-[15px] py-[10px] hover:bg-gray-50 peer-checked:ring-[#1E2335]  peer-checked:text-[#1E2335] peer-checked:ring-2 peer-checked:font-md  peer-checked:border-transparent `}
                                                                        onClick={() => {
                                                                            arrayAddElement(
                                                                                String(
                                                                                    reviewType
                                                                                )
                                                                            );
                                                                        }}
                                                                    >
                                                                        {" "}
                                                                        {
                                                                            reviewType
                                                                        }
                                                                    </div>
                                                                ) : (
                                                                    <div
                                                                        className={`border-[#a5aeb8]  text-[#a5aeb8] flex  font-light  border rounded-[10px] cursor-pointer focus:outline-none  px-[15px] py-[10px] hover:bg-gray-50 peer-checked:ring-[#1E2335]  peer-checked:text-[#1E2335] peer-checked:ring-2 peer-checked:font-md  peer-checked:border-transparent text-sm`}
                                                                        onClick={() => {
                                                                            arrayAddElement(
                                                                                String(
                                                                                    reviewType
                                                                                )
                                                                            );
                                                                        }}
                                                                    >
                                                                        {" "}
                                                                        {
                                                                            reviewType
                                                                        }
                                                                    </div>
                                                                )}
                                                            </li>
                                                        );
                                                    }
                                                )}
                                        </ul>
                                    )
                            )}
                    </ul>

                    <p className="mt-1 mb-3 text-xs italic text-left text-red-500">
                        {errors.type?.message}
                    </p>
                    <input
                        {...register("comment")}
                        placeholder="Нэмэлт санал гомдол бичих"
                        type="input"
                        autoComplete="off"
                        className="w-full px-[15px] py-[10px] bg-transparent  border-[#B3BFC6] rounded-xl border-[1px]  focus:ring-0 focus:outline-none font-light text-sm"
                    />
                    <p className="mt-1 mb-3 text-xs italic text-left text-red-500">
                        {errors.comment?.message}
                    </p>
                </div>
            </form>
        </>
    );
};

export default SubmitReview;
