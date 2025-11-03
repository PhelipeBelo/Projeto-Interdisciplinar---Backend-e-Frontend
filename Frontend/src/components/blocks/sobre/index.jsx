"use client"

import "./sobre.css"
import { useEffect } from "react"
import Link from "next/link";


export default function Sobre() {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.min.js")
    }, [])
    return (<>

        <>

            <section className="about-us py-5 bg-light" style={{ backgroundColor: "#F6F5F5" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2 className="font-weight-bold mb-4">Nossa Missão no Setor de Saúde</h2>
                            <p className="text-muted mb-4">
                            Na Nexus Suprimentos, entendemos que a saúde de um paciente depende da eficiência na cadeia de suprimentos. Nossa plataforma foi desenvolvida para ser a espinha dorsal de hospitais, clínicas, laboratórios e secretarias de saúde, garantindo que o material certo chegue no tempo exato. Focamos em otimizar a compra e gestão de suprimentos médico-hospitalares, oferecendo um catálogo abrangente e uma logística transparente. Conectamos fornecedores certificados a gestores de compras, farmacêuticos e administradores, transformando a complexidade do B2B em uma operação simples, confiável e totalmente rastreável. Estamos aqui para garantir que o seu foco seja sempre o paciente.
                            </p>
                            <div className="row">
                                <div className="col-md-6">
                                    <h5 className="text-primary coloricons">Nossa Missão</h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <i className="bi bi-check-circle me-2 text-primary coloricons" />
                                            Conectividade Essencial
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle me-2 text-primary coloricons" />
                                            Otimização de Processos
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle me-2 text-primary coloricons" />
                                            Cuidado e Qualidade
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <h5 className="text-primary coloricons">Nossa Visão de Futuro</h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <i className="bi bi-bullseye me-2 text-primary coloricons" />
                                            Saúde Acessível
                                        </li>
                                        <li>
                                            <i className="bi bi-bullseye me-2 text-primary coloricons" />
                                            Liderança em Suprimentos
                                        </li>
                                        <li>
                                            <i className="bi bi-bullseye me-2 text-primary coloricons" />
                                            Inovação Contínua
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <Link href="/produtos" className="btn mt-4 coloriconsb">
                                Venha Conheça Nossos Produtos
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb21wYW55fGVufDB8MHx8fDE3MjEyMTE5MDZ8MA&ixlib=rb-4.0.3&q=80&w=1080"
                                alt="About Us"
                                className="img-fluid rounded shadow"
                            />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-3 col-6 mb-4">
                            <div className="text-center">
                                <i className="bi-hospital fs-1 text-primary mb-2 coloricons" />
                                <h2 className="fw-bold">500+</h2>
                                <p className="text-muted">Hospitais Conectados</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-6 mb-4">
                            <div className="text-center">
                                <i className="bi-lightbulb-fill fs-1 text-primary mb-2 coloricons" />
                                <h2 className="fw-bold">1000+</h2>
                                <p className="text-muted">Soluções Entregues</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-6 mb-4">
                            <div className="text-center">
                                <i className="bi-calendar-event fs-1 text-primary mb-2 coloricons" />
                                <h2 className="fw-bold">12+</h2>
                                <p className="text-muted">Anos de Experiência</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-6 mb-4">
                            <div className="text-center">
                                <i className="bi-geo-alt-fill fs-1 text-primary mb-2 coloricons" />
                                <h2 className="fw-bold">20+</h2>
                                <p className="text-muted">Cidades Parceiras</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>


    </>)
}