import "./styles.css";

import SearchBar from "../../../components/SearchBar";
import CatalogCard from "../../../components/CatalogCard";
import ButtonNextPage from "../../../components/ButtonNextPage";
import * as productService from "../../../services/product-service";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";

type QueryParams = {
  page: number;
  name: string;
};

export default function Catalog() {
  const [isLastPage, setIsLastPage] = useState(false);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  useEffect(() => {
    productService
      .findPageRequest(queryParams.page, queryParams.name)
      .then((response) => {
        const nextPage = response.data.content; //adiciona os products na variavel;
        setProducts(products.concat(nextPage)); //concatena no arry de products os valorem que chegaram no array nextPage
        setIsLastPage(response.data.last)
      });
  }, [queryParams]); //<- Lista de dependẽncias do useEffect. Sempre que o valor mudar o useEffect executa a função novamente

  function handleSearch(searchText: string) {
    setProducts([]);
    setQueryParams({ ...queryParams, page: 0, name: searchText });
  }

  function handleNextPageClick() {
    setQueryParams({ ...queryParams, page: queryParams.page + 1 });
  }

  /* O componente catalogo vai observar o evento onSearch do componente SearchBar
   * que quando for executada, vai executar a funcao handleSearch "lançar um evento"
   * que por sua vez vai atualizar o prodName usando de argumento o resultado da função
   * onSearch do componente SearchBar, que por sua vez vai disparar o useEffect que está observando
   * o prodName nas dependências que irá executar novamente a função.
   * Ver o componente SearchBar para saber mais sobre o evento onSearch.
   */

  return (
    <main>
      <section id="catalog-section" className="dsc-container">
        <SearchBar onSearch={handleSearch} />

        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
          {products.map((product) => (
            <CatalogCard key={product.id} product={product} />
          ))}
        </div>
        {!isLastPage && (
          <div onClick={handleNextPageClick}>
            <ButtonNextPage />
          </div>
        )}
      </section>
    </main>
  );
}
