import { useContext } from "react";

import { ProductContext } from "../../Providers/products"

import "./style.css"

function CategList(){

    const {productList, setFilteredProducts} = useContext(ProductContext)

    function handleFilter(e){

        if(e.currentTarget.type === "Todos"){
            setFilteredProducts([])
        }else{
            const filterOnProducts = productList.filter((product) => {
                    return product.category.toLowerCase() === e.currentTarget.type.toLowerCase()
                })
            
            setFilteredProducts(filterOnProducts)
        }
  
    }

    return(
        <section className="categoryContainer">
            <ul className="categoryList">
                <li onClick={(e) => handleFilter(e)} type="laticínios">
                    <img src="Laticíneos.png" alt="Laticíneos"/>
                    <h3>Laticínios</h3>
                </li>
                <li onClick={(e) => handleFilter(e)} type="grãos">
                    <img src="Grãos.png" alt="Grãos"/>
                    <h3>Grãos</h3>
                </li>
                <li onClick={(e) => handleFilter(e)} type="massas">
                    <img src="Massas.png" alt="Massas"/>
                    <h3>Massas</h3>
                </li>
                <li onClick={(e) => handleFilter(e)} type="farináceos">
                    <img src="Farináceos.png" alt="Farináceos"/>
                    <h3>Farináceos</h3>
                </li>
                <li onClick={(e) => handleFilter(e)} type="outros">
                    <img src="Outros.png" alt="Outros"/>
                    <h3>Outros</h3>
                </li>
                <li onClick={(e) => handleFilter(e)} type="todos">
                    <img src="Todos.png" alt="Todos"/>
                    <h3>Todos</h3>
                </li>
            </ul>
        </section>
    )
}

export default CategList