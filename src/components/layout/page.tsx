import { withRouter } from "next/router";

import Header from "./header";
import Footer from "./footer";

const NonFooterRoutes = ["/", "/cart/[merchantId]", "/order-detail/[orderId]"];

const Page = ({ router, children }: any) => {
    const isNonFooter = NonFooterRoutes.includes(router.pathname);

    return (
        <div className="flex flex-col min-h-screen bg-[#f5f5fa] ">
            <Header routerPathName={router.pathname} />

            <main
                className={`flex-initial overflow-auto scrollbar-hide rounded-t-[] -mt-[25px] h-[calc(-125px+100vh)] bg-inherit ${
                    !isNonFooter
                        ? "h-[calc(-125px+100vh)]"
                        : "h-[calc(-53px+100vh)]"
                } page-top-border`}
                style={{
                    WebkitBorderTopLeftRadius: "25px",
                    WebkitBorderTopRightRadius: "25px",
                    overscrollBehaviorY: "none",
                }}
            >
                {children}
            </main>

            {!isNonFooter && <Footer routerPathName={router.pathname} />}
        </div>
    );
};

export default withRouter(Page);
