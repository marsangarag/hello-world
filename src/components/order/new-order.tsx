import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

import LargeWhiteButton from "components/common/large-white-button";
import { toast } from "lib/utils/helpers";
import { useAppState } from "lib/context/app";
import Cart from "lib/types/cart.type";
import TokiAPI from "lib/api/toki";
import Toki from "lib/utils/toki-payment";
import { ModalContext } from "lib/context/modal";
import StoreyRadio from "./storey-radio";
import { CancelDeliveryTimetable } from "lib/types/office.type";

interface NewOrderPros {
    type: string;
    data: Cart;
}

function toDate(dStr: any, format: any) {
    var now = new Date();
    if (format == "h:m") {
        now.setHours(dStr.substr(0, dStr.indexOf(":")));
        now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
        now.setSeconds(0);
        return now;
    } else return "Invalid Format";
}

const validationSchema = yup.object().shape({
    type: yup.string().required(),
    delivery_floor: yup.number().when("type", {
        is: (type: string) => type === "delivery",
        then: yup
            .number()
            .min(1, "Хүргүүлэх давхараа сонгоно уу")
            .required("Хүргүүлэх давхараа сонгоно уу")
            .nullable(),
    }),
    delivery_address: yup.string().when("type", {
        is: (type: string) => type === "delivery",
        then: yup.string().required("Хаягаа бөглөнө үү"),
    }),
    ebarimt_type: yup.string().required("eBarimt төрлөө сонгоно уу").nullable(),
    company_reg_number: yup.string().when("ebarimt_type", {
        is: (ebarimt_type: string) => ebarimt_type === "company",
        then: yup.string().required("Байгууллагын РД бөглөнө үү"),
    }),
    delivery_instruction: yup
        .string()
        .max(60, "Нэмэлт мэдээлэл хамгийн ихдээ 60 тэмдэгт байна."),
});

const NewOrder: React.FC<NewOrderPros> = ({ type, data }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { handleModal }: any = useContext(ModalContext);
    const [ebarimtVisible, setEbarimtVisible] = useState(false);
    const [ebarimt, setEbarimt] = useState("");
    const [state]: any = useAppState();
    const [isDelivery, setIsDelivery] = useState(true);

    let deliveryOptions: any = {};

    if (typeof window !== "undefined") {
        deliveryOptions = JSON.parse(
            localStorage.getItem("deliveryOptions") || "{}"
        );
    }

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues:
            type === "delivery"
                ? {
                      type: type,
                      delivery_floor:
                          deliveryOptions &&
                          deliveryOptions.delivery_floor <= state.numberOfStorey
                              ? deliveryOptions.delivery_floor
                              : -1,
                      delivery_address:
                          deliveryOptions && deliveryOptions.delivery_address,
                      ebarimt_type:
                          deliveryOptions && deliveryOptions.ebarimt_type,
                      company_reg_number: deliveryOptions
                          ? deliveryOptions.company_reg_number
                          : "",
                      delivery_instruction: deliveryOptions
                          ? deliveryOptions.delivery_instruction
                          : "",
                  }
                : {
                      type: type,
                      ebarimt_type:
                          deliveryOptions && deliveryOptions.ebarimt_type,
                      company_reg_number: deliveryOptions
                          ? deliveryOptions.company_reg_number
                          : "",
                      delivery_instruction: deliveryOptions
                          ? deliveryOptions.delivery_instruction
                          : "",
                  },
        resolver: yupResolver(validationSchema),
    });

    const onSubmitHandler = async (values: any) => {
        localStorage.setItem("deliveryOptions", JSON.stringify(values));

        type === "delivery"
            ? state.cancelDeliveryTimetable.map(
                  (cancelDelivery: CancelDeliveryTimetable, index: number) =>
                      new Date().getDay() === cancelDelivery.day
                          ? cancelDelivery.closed === false
                              ? setIsDelivery(true)
                              : toDate(cancelDelivery.start_hour, "h:m") <=
                                    new Date() &&
                                toDate(cancelDelivery.end_hour, "h:m") >
                                    new Date()
                              ? setIsDelivery(false)
                              : setIsDelivery(true)
                          : null
              )
            : null;

        (type === "delivery" && isDelivery == true) || type === "take_away"
            ? handleModal(
                  true,
                  "",
                  <div>
                      {type === "delivery" ? (
                          <div
                              dangerouslySetInnerHTML={{
                                  __html: `Та
                <b className="font-medium">
                    ${state.officeName} оффисын ${values.delivery_floor} давхар,
                    ${values.delivery_address}-д
                </b>
                кофе хүргүүлэх гэж байна. Төлбөр төлсний дараа захиалгыг цуцлах
                болон өөрчлөх боломжгүйг анхаарна уу!`,
                              }}
                          />
                      ) : (
                          <div
                              dangerouslySetInnerHTML={{
                                  __html: `Та
                <b className="font-medium">
                    ${state.officeName} оффисын ${state.merchantName}-с
                </b> очиж авахаар захиалга өгөх гэж байна. Төлбөр төлсний дараа захиалгыг цуцлах болон өөрчлөх боломжгүй`,
                              }}
                          />
                      )}
                  </div>,
                  true,
                  <div className="flex">
                      <LargeWhiteButton
                          text="Буцах"
                          roundedClass="rounded-l-[15px]"
                          border="border-r-[0.5px] border-[#B3BFC6]"
                          onClick={() =>
                              handleModal(
                                  true,
                                  "Нэмэлт мэдээлэл оруулах",
                                  <NewOrder data={data} type={type} />,
                                  true,
                                  <div className="flex">
                                      <LargeWhiteButton
                                          text="Цуцлах"
                                          roundedClass="rounded-l-[15px]"
                                          border="border-r-[0.5px] border-[#B3BFC6]"
                                          onClick={() => handleModal()}
                                      />
                                      <LargeWhiteButton
                                          type="submit"
                                          text="Болсон"
                                          roundedClass="rounded-r-[15px]"
                                          formId="place-order-form"
                                      />
                                  </div>
                              )
                          }
                      />
                      <LargeWhiteButton
                          type="submit"
                          text="Төлөх"
                          roundedClass="rounded-r-[15px]"
                          onClick={async () => {
                              values["order_id"] = data._id;
                              values["order_type"] = type;

                              setLoading(true);

                              try {
                                  const placeOrderResponse =
                                      await TokiAPI.placeOrder(values);

                                  if (
                                      placeOrderResponse?.data?.status_code ===
                                      0
                                  ) {
                                      Toki.buy(
                                          data.merchant.toki_merchant_id,
                                          state.cartPrice,
                                          data._id,
                                          `Coffee_zahialah | ${localStorage.getItem(
                                              "phoneNumber"
                                          )}`,
                                          async (
                                              transactionID: any,
                                              orderID: any,
                                              status: any,
                                              statusCode: any,
                                              transRequestId: any
                                          ) => {
                                              if (
                                                  typeof window !== "undefined"
                                              ) {
                                                  if (
                                                      values &&
                                                      values.delivery_instruction
                                                  ) {
                                                      delete values.delivery_instruction;
                                                  }

                                                  localStorage.setItem(
                                                      "deliveryOptions",
                                                      JSON.stringify(values)
                                                  );
                                              }

                                              const upointResponse =
                                                  await TokiAPI.getUpoint(
                                                      data._id
                                                  );

                                              if (
                                                  upointResponse?.data
                                                      ?.status_code === 0 &&
                                                  upointResponse?.data?.data
                                                      ?.upoint_collect_amount
                                              ) {
                                                  router.push(
                                                      `/order-history?tokenid=${router.query.tokenid}&paymentStatusCode=${statusCode}&upoint=${upointResponse?.data?.data?.upoint_collect_amount}`
                                                  );
                                              } else {
                                                  router.push(
                                                      `/order-history?tokenid=${router.query.tokenid}&paymentStatusCode=${statusCode}`
                                                  );
                                              }
                                          },
                                          `${process.env.NEXT_PUBLIC_ENTRYPOINT}/coffee/thirdparty/paid`
                                      );
                                  } else {
                                      toast(placeOrderResponse?.data?.message);
                                  }
                              } finally {
                                  setLoading(false);
                                  reset();
                              }
                          }}
                      />
                  </div>
              )
            : handleModal(
                  true,
                  "",
                  <div>Кофе шопын хүргэлтийн хугацаа дууссан байна.</div>,
                  true,
                  <div className="flex">
                      <LargeWhiteButton
                          text="Ок"
                          onClick={() => handleModal()}
                      />
                  </div>
              );
    };

    return (
        <form
            id="place-order-form"
            onSubmit={handleSubmit(onSubmitHandler)}
            className="w-full"
        >
            <input type="hidden" {...register("type")} />

            {type === "delivery" && (
                <>
                    <StoreyRadio
                        control={control}
                        name="delivery_floor"
                        deliveryOptions={deliveryOptions}
                        numberOfStorey={state.numberOfStorey}
                    />

                    <input
                        className="w-full p-3 bg-[#F5F5FA] border-[#B3BFC6] rounded-xl border-[1px] mt-3 focus:ring-0  font-light text-sm"
                        placeholder="Тоот / Байгууллагын нэр"
                        type="input"
                        autoComplete="off"
                        {...register("delivery_address")}
                    />
                    <p className="mt-1 text-xs italic text-left text-red-500 ">
                        {errors.delivery_address?.message}
                    </p>
                </>
            )}

            <button
                type="button"
                onClick={() => setEbarimtVisible(ebarimtVisible ? false : true)}
                className={`w-full p-3 text-left cursor-pointer mt-3 bg-[#F5F5FA] border-[#B3BFC6] rounded-t-xl border-[1px]  flex font-light text-sm ${
                    ebarimtVisible ? "border-b-[0px]" : "rounded-b-xl"
                }`}
            >
                <div
                    className={`flex-grow mx-1 ${
                        deliveryOptions.ebarimt_type ||
                        ebarimt === "Байгууллага" ||
                        (ebarimt === "Хувь хүн" ? "" : "text-gray-400")
                    }`}
                >
                    {ebarimt
                        ? ebarimt
                        : deliveryOptions
                        ? deliveryOptions.ebarimt_type === "individual"
                            ? "Хувь хүн"
                            : deliveryOptions.ebarimt_type === "company"
                            ? "Байгууллага"
                            : "eBarimt"
                        : "eBarimt"}
                </div>
                <div className="shrink-0">
                    {ebarimtVisible ? (
                        <span
                            className="icon-Up-Arrow-1"
                            style={{ color: "#647382" }}
                        />
                    ) : (
                        <span
                            className="icon-Arrow---Down"
                            style={{ color: "#647382" }}
                        />
                    )}
                </div>
            </button>
            <div className={`${ebarimtVisible ? `block` : "hidden"}`}>
                <div
                    onClick={() => {
                        setEbarimt("Хувь хүн");
                        setEbarimtVisible(false);

                        let address = JSON.parse(
                            localStorage.getItem("deliveryOptions") || "{}"
                        );

                        if (address && address.ebarimt_type) {
                            address.ebarimt_type = "individual";

                            localStorage.setItem(
                                "deliveryOptions",
                                JSON.stringify(address)
                            );
                        }
                    }}
                >
                    <input
                        id={`ebarimt_type_individual`}
                        className="sr-only peer"
                        type="radio"
                        value={"individual"}
                        {...register("ebarimt_type")}
                    />
                    <label
                        className="flex px-3 font-light border border-gray-300 cursor-pointer text-[#647382]  hover:bg-gray-50 capitalize justify-center p-2 bg-[#F5F5FA] text-sm"
                        htmlFor={`ebarimt_type_individual`}
                    >
                        Хувь хүн
                    </label>
                </div>
                <div
                    onClick={() => {
                        setEbarimt("Байгууллага");
                        setEbarimtVisible(false);

                        let address = JSON.parse(
                            localStorage.getItem("deliveryOptions") || "{}"
                        );

                        if (address && address.ebarimt_type) {
                            address.ebarimt_type = "company";

                            localStorage.setItem(
                                "deliveryOptions",
                                JSON.stringify(address)
                            );
                        }
                    }}
                >
                    <input
                        id={`ebarimt_type_company`}
                        className="sr-only peer"
                        type="radio"
                        value={"company"}
                        {...register("ebarimt_type")}
                    />
                    <label
                        className="flex px-3 font-light border border-gray-300 rounded-b-lg border-t-0 cursor-pointer text-[#647382]  hover:bg-gray-50 capitalize justify-center p-2 bg-[#F5F5FA] text-sm"
                        htmlFor={`ebarimt_type_company`}
                    >
                        Байгууллага
                    </label>
                </div>
            </div>
            <p className="mt-1 text-xs italic text-left text-red-500">
                {errors.ebarimt_type?.message}
            </p>

            {(ebarimt === "Байгууллага" ||
                deliveryOptions.ebarimt_type === "company") && (
                <>
                    <input
                        className="w-full p-3 bg-[#F5F5FA] border-[#B3BFC6] rounded-xl border-[1px] mt-3 focus:ring-0  font-light text-sm"
                        placeholder="Байгууллагын РД"
                        type="input"
                        autoComplete="off"
                        {...register("company_reg_number")}
                    />
                    <p className="mt-1 text-xs italic text-left text-red-500 ">
                        {errors.company_reg_number?.message}
                    </p>
                </>
            )}

            <input
                {...register("delivery_instruction")}
                placeholder="Нэмэлт мэдээлэл: (соруул, сахар...)"
                type="input"
                autoComplete="off"
                className="w-full p-3 bg-[#F5F5FA] border-[#B3BFC6] rounded-xl border-[1px] mb-3 my-3 focus:ring-0  font-light text-sm"
            />
            <p className="mt-1 text-xs italic text-left text-red-500">
                {errors.delivery_instruction?.message}
            </p>
        </form>
    );
};

export default NewOrder;
