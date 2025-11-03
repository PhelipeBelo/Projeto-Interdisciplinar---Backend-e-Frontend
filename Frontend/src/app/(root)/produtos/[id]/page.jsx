"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import './id.css'; 

export default function ProductDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/produtos/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((err) => console.error("Erro ao buscar produto:", err));
  }, [id]);

  if (!item) {
    return <p className="text-center mt-5 text-nexus-dark h4">Carregando...</p>;
  }

  return (
    <>
      <div className="container py-5">
        <div className="row">
          {/* Imagem do Produto */}
          <div className="col-md-6 mb-4">
            <div className="product-detail-image-wrapper"> {/* CLASSE CUSTOMIZADA MAIS ROBUSTA */}
              <img
                src={item.img}
                className="img-fluid rounded-4"
                alt="Product Image"
              />
            </div>
          </div>

          {/* Detalhes do Produto */}
          <div className="col-md-6">
            <h1 className="display-5 text-nexus-dark mb-3 fw-bold">{item.nome}</h1>

            {/* Preço e Avaliação */}
            <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
              <span className="me-4 product-price-highlight">{item.preco}</span> {/* CLASSE DE PREÇO */}
              <div className="d-flex align-items-center">
                <div className="text-warning me-2 fs-5">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star-half-alt" />
                </div>

              </div>
            </div>

            {/* Descrição */}
            <h5 className="text-nexus-dark fw-bold mt-2">Detalhes do Produto:</h5>
            <p className="mb-4 text-muted">
              {item.des}
            </p>

            {/* Quantidade */}
            <div className="mb-4 d-flex align-items-center">
              <label className="me-3 fw-bold text-nexus-dark">Quantidade:</label>
              <select className="form-select w-auto select-custom-style"> {/* CLASSE PARA ESTILIZAR SELECT */}
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
              </select>
            </div>

            {/* Ações */}
            <div className="d-grid gap-2 d-md-flex justify-content-start">
              <button className="btn btn-nexus-primary btn-lg px-5" type="button">
                Adicionar ao Carrinho
              </button>
              <button className="btn btn-nexus-secondary btn-lg" type="button">
                <i className="far fa-heart me-2" />
                Lista de Desejos
              </button>
            </div>

            {/* Informações Adicionais */}
            <div className="mt-5 pt-3 border-top info-block-nexus">
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-truck text-nexus-accent me-3 fs-5" /> {/* CLASSE DE COR */}
                <span className="text-nexus-dark">**Frete grátis** em pedidos acima de 30 unidades.</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-undo text-nexus-accent me-3 fs-5" />
                <span className="text-nexus-dark">**Política de devolução** de 30 dias.</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="fas fa-shield-alt text-nexus-accent me-3 fs-5" />
                <span className="text-nexus-dark">**Garantia de 3 meses**.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}