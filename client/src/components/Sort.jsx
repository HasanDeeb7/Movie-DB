export const Sort = (props) =>{
    function handleSort(e){
        props.setSort(e.target.id)
    }
    const sortItems = document.querySelectorAll('.sort-item')
    sortItems.forEach(item=> {
        item.addEventListener('click', ()=>{
            sortItems.forEach(item => item.classList.remove('selected'))
            item.classList.add('selected')
        })
    })

    return(
        <section className="sort-container">
            <span onClick={(e)=> handleSort(e)} id="by-title" className="sort-item">Title</span>
            <span onClick={(e)=> handleSort(e)} id="by-year" className="sort-item">Year</span>
            <span onClick={(e)=> handleSort(e)} id="by-rating" className="sort-item">Rating</span>
        </section>
    )
}