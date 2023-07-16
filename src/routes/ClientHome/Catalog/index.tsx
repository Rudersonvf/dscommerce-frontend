import "./styles.css";

import SearchBar from "../../../components/SearchBar";
import CatalogCard from "../../../components/CatalogCard";
import ButtonNextPage from "../../../components/ButtonNextPage";
import * as productService from "../../../services/product-service";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";

export default function Catalog() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [prodName, setProdName] = useState("");

  useEffect(() => {
    productService.findPageRequest(0, prodName).then((response) => {
      setProducts(response.data.content);
    });
  }, [prodName]); //<- Lista de dependẽncias do useEffect. Sempre que o valor mudar o useEffect executa a função novamente

  function handleSearch(searchText: string) {
    setProdName(searchText);
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
        <ButtonNextPage />
      </section>
    </main>
  );
}
