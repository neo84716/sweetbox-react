// function Pagination({ pagination, onChangePage }) {
//     const handleClick = (e, page) => {
//         e.preventDefault();
//         onChangePage(page)

import { Icon } from "@iconify/react"

//     }
function Pagination() {

    return (
        <>
            {/* <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${!pagination.has_pre && 'disabled'}`}>
                        <a className="page-link" href="#" aria-label="Previous" onClick={(e) => handleClick(e, pagination.current_page - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {
                        Array.from({ length: pagination.total_pages }, (_, index) => (
                            <li className={`page-item ${pagination.current_page === index + 1 && "active"}`} key={`${index}_page`}>
                                <a className="page-link" href="#" onClick={(e) => handleClick(e, index + 1)}>
                                    {index + 1}
                                </a>
                            </li>
                        ))
                    }


                    <li className={`page-item ${!pagination.has_next && 'disabled'}`}>
                        <a className="page-link" href="#" aria-label="Next" onClick={(e) => handleClick(e, pagination.current_page + 1)}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav> */}
            {/* 桌面板 */}
            <nav aria-label="Page navigation example" className="d-none d-lg-block">
                <ul className="pagination sub-pagination">
                    <li className={`page-item`}>
                        <a className="page-link" href="#" aria-label="Previous">
                            <Icon icon="iconamoon:arrow-left-2-bold" width="14" height="14" />
                        </a>
                    </li>
                    <li className={`page-item active`} >
                        <a className="page-link" href="#">
                            1
                        </a>
                    </li>
                    <li className={`page-item`} >
                        <a className="page-link" href="#">
                            2
                        </a>
                    </li>
                    <li className={`page-item`} >
                        <a className="page-link" href="#">
                            3
                        </a>
                    </li>
                    <li className={`page-item`}>
                        <a className="page-link" href="#" aria-label="Next">
                            <Icon icon="iconamoon:arrow-right-2-bold" width="14" height="14" />
                        </a>
                    </li>
                </ul>
            </nav>
            {/* 手機板 */}
            <nav aria-label="Page navigation example" className="d-lg-none d-block">
                <ul className="pagination sub-pagination">
                    <li className={`page-item`}>
                        <a className="page-link" href="#" aria-label="Previous">
                            <Icon icon="iconamoon:arrow-left-2-bold" width="14" height="14" />
                        </a>
                    </li>
                    <li className={`page-item active`} >
                        <a className="page-link" href="#">
                            1
                        </a>
                    </li>
                    <li className={`page-item`} >
                        <a className="page-link" href="#">
                            <Icon icon="iconoir:slash" width="16" height="16" />
                        </a>
                    </li>
                    <li className={`page-item`} >
                        <a className="page-link" href="#">
                            5
                        </a>
                    </li>
                    <li className={`page-item`}>
                        <a className="page-link" href="#" aria-label="Next">
                            <Icon icon="iconamoon:arrow-right-2-bold" width="14" height="14" />
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination