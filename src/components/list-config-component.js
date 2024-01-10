export const ListConfig = ({ totalNumberOfMessages, handlePageChange, handleSort, page }) => {

    return (
        <div className="flex config">
            Sort By (Timestamp): <select onChange={(e) => handleSort(e.target.value)}>
                <option value={1}>ASC</option>
                <option value={-1}>DESC</option>
            </select>
            Page: <select value={page} onChange={(e) => handlePageChange(e.target.value)}>
                {new Array(Math.ceil(totalNumberOfMessages / 5)).fill(0).map((_, index) => index + 1).map((pageNumber) => {
                    return <option key={pageNumber} value={pageNumber}> {pageNumber} </option>
                })}
            </select>
        </div>
    )

}