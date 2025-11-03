"use client"
import "./footer.css"
import { useEffect } from "react"
import Link from "next/link";


export default function Footer() {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.min.js")
    }, [])
    return (
        <>
            <footer className="py-5">
                <div className="container">
                    <div className="row g-4">
                        {/* Informações da Empresa (Sobre Nós) */}
                        <div className="col-lg-4 col-md-6">
                            <h5 className="mb-4">Sobre Nós</h5>
                            <p className="mb-4">
                                Somos a plataforma B2B especializada na distribuição e venda de suprimentos médico-hospitalares para hospitais, clínicas e laboratórios. Conectando a saúde com a eficiência.
                            </p>
                            <div className="social-links">
                                <Link href="#" className="social-icon bg-primary">
                                    <i className="bi bi-facebook"></i>
                                </Link>
                                <Link href="#" className="social-icon bg-info">
                                    <i className="bi bi-twitter-x"></i>
                                </Link>
                                <Link href="#" className="social-icon bg-danger">
                                    <i className="bi bi-instagram"></i>
                                </Link>
                                <Link href="#" className="social-icon bg-dark">
                                    <i className="bi bi-linkedin"></i>
                                </Link>
                            </div>
                        </div>
                        {/* Links Rápidos (Navegação) */}
                        <div className="col-lg-2 col-md-6">
                            <h5 className="mb-4">Navegação</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <Link href="/" className="footer-link">
                                        Início
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="/produtos" className="footer-link">
                                        Produtos
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="/login" className="footer-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="#" className="footer-link">
                                        Política de Privacidade
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="#" className="footer-link">
                                        Termos de Uso
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* Seções (Foco B2B / Suprimentos) */}
                        <div className="col-lg-2 col-md-6">
                            <h5 className="mb-4">Suprimentos</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <Link href="#" className="footer-link">
                                        Consumíveis Básicos
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="#" className="footer-link">
                                        Equipamentos Médicos
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="#" className="footer-link">
                                        Higiene e Esterilização
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="#" className="footer-link">
                                        Medicamentos Básicos
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="#" className="footer-link">
                                        Novos Fornecedores
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* Informações de Contato */}
                        <div className="col-lg-4 col-md-6">
                            <h5 className="mb-4">Informações de Contato</h5>
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    <i className="fas fa-map-marker-alt me-2" />
                                    Rua das Compras, 123, São Paulo, SP
                                </li>
                                <li className="mb-3">
                                    <i className="fas fa-phone me-2" />
                                    <Link href="tel:+5511987654321" className="footer-link">
                                        +55 (11) 98765-4321
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <i className="fas fa-envelope me-2" />
                                    <Link href="mailto:contato@healthsupply.com" className="footer-link">
                                        contato@nexus.com
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Copyright */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <hr className="mb-4" />
                            <div className="text-center">
                                <p className="mb-0">© 2025 Nexus Suprimentos. Todos os direitos reservados.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}