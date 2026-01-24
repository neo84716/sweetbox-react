import Header from "../layouts/Header"
import Footer from "../layouts/Footer"

function EmptyCart() {
    return (
        <>
            <Header />
            <div className="bg-neutral-300">
                <div className="empty-cart-main bg-empty-cart">
                    <div className="container px-0">
                        <h1 className="cart-title p-3 py-lg-2 px-lg-4 cart-empty">購物車</h1>
                        <div className="empty-cart-wrapper text-center">
                            <div className="empty-cart-img mx-auto mb-6 mb-sm-8">
                                <img src="/assets/images/Cart_Page/pic_empty.svg" alt="空的購物車圖片" />
                            </div>
                            <h1 className="empty-cart-title mb-2">購物車裡還沒有甜點呢</h1>
                            <p className="lh-base mb-6 mb-sm-8">快來挑選一盒，讓生活多一點甜</p>
                            <button className="btn-primary-icon fw-bold px-lg-8">
                                帶我去挑甜點
                                <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M15 7.586L22.414 15H2v-2h15.586l-4-4z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EmptyCart