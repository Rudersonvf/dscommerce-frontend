import { useState } from "react";
import "./styles.css";

/*
 * O evento é uma Prop do tipo function com "F" maiúsculo
 */

type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSearch: Function;
};

export default function SearchBar({ onSearch }: Props) {
  const [text, setText] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    onSearch(text);
  }

  function handleChange(event: any) {
    setText(event.target.value);
  }

  function handleResetClick(){
    setText("");
    onSearch(text);
  }

  /*
   * Sempre que o formulário for enviado, é executada a função onSearch passando como argumento
   * o valor contido na variavel text do useState, que por sua vez é o handleSearch do componente Catalog
   */

  return (
    <form className="dsc-search-bar" onSubmit={handleSubmit}>
      <button type="submit">🔎︎</button>
      <input
        value={text}
        type="text"
        placeholder="Nome do produto"
        onChange={handleChange}
      />
      <button onClick={handleResetClick}>x</button>
    </form>
  );
}
