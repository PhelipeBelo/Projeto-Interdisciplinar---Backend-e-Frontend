"use client"

import { useState, useEffect } from 'react';
import Link from "next/link";
import "./card.css"


export default function Home() {

  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log("Iniciando fetch de produtos...");

    const fetchProdutos = async () => {
      try {
        const res = await fetch("http://localhost:3001/produtos");
        const data = await res.json();
        setItens(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProdutos();
  }, []); 

  if (loading) {
    return <div className="text-center py-5">
      <h2 className="text-dark-blue">Carregando Produtos...</h2>
    </div>;
  }

  if (itens.length === 0 && !loading) {
    return <div className="text-center py-5">
      <h2 className="text-dark-blue">Nenhum produto encontrado.</h2>
    </div>;
  }


  return (
    <>
      <section className="hero" >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <h1 className="display-3 text-white-75 font-weight-bold">
                Nexus: Sua Conexão com Suprimentos de Saúde de Qualidade
              </h1>
              <p className="lead text-white-75 mb-4">
                Garanta a segurança e o estoque de sua equipe com produtos certificados e preços competitivos.
              </p>

              <a href="#produtoss" className="btn btn-lg">
                Explorar Nossos Produtos
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="produtoss">

        <div className="container py-5">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 text-center mb-5">
              <h2 className="display-5 fw-bold text-dark-blue">
                Soluções Essenciais para o Setor Hospitalar
              </h2>
              <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
                Navegue em nosso catálogo exclusivo de produtos B2B, selecionados com rigor para atender às normas de qualidade e otimizar a gestão de compras do seu almoxarifado.
              </p>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4">
            {itens.map((item, index) => (
              <div key={index} className="col">
                <div className="card product-card border-0 rounded-4 shadow-sm h-100">
                  <div className="position-relative overflow-hidden">
                    <img
                      src={item.img}
                      className="card-img-top product-image"
                      alt={`Imagem de ${item.nome}`}
                    />
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <h5 className="card-title mb-3 fw-bold">
                      {item.nome}
                    </h5>
                    <p className="card-text text-muted mb-4">
                      {item.modelo}
                    </p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">

                      <span className="price">{item.preco}</span>

                      <Link href={`/produtos/${item.id}`}>
                        <button className="btn btn-custom text-white px-4 py-2 rounded-pill">
                          Saiba mais
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}