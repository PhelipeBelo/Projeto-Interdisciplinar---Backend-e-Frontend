"use client"
import "./contato.css"
import {useEffect} from "react"
import Link from "next/link";


export default function Contato() {
    useEffect(()=>{
        require("bootstrap/dist/js/bootstrap.min.js")
    },[])
    return (<>
        

        <section className="container py-5 cb" style={{ backgroundColor: "#F6F5F5"}} id="contact">
        <h2 className="text-center mb-5">Entre em contato com a gente</h2>
        <div className="row g-4">
          {/* Form */}
          <div className="col-lg-6">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Digite o nome da sua empresa aqui"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Digite seu e-mail"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Mensagem
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows={5}
                  placeholder="Escreva aqui sua mensagem"
                  defaultValue={""}
                />
              </div>
              <button type="submit" className="btn btn-custom">
                Enviar
              </button>
            </form>
          </div>
          {/* Google Maps */}
          <div className="col-lg-6">
            <div className="ratio ratio-4x3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.9982121735464!2d-122.08424948469245!3d37.4219999798259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5cb29975b69%3A0x77b7b4e528b0c6b6!2sGoogleplex!5e0!3m2!1sen!2sid!4v1618477596623!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
        {/* Horizontal Contact Info */}
        <div className="row text-center mt-5 gy-4">
          <div className="col-md-3 col-6">
            <i className="bi bi-telephone-fill fs-4 contact-icon" />
            <p className="mb-0">+55 (11) 98765-4321</p>
          </div>
          <div className="col-md-3 col-6">
            <i className="bi bi-envelope-fill fs-4 contact-icon" />
            <p className="mb-0">contato@nexus.com</p>
          </div>
          <div className="col-md-3 col-6">
            <i className="bi bi-instagram fs-4 contact-icon" />
            <p className="mb-0">@nexussuprimentos</p>
          </div>
          <div className="col-md-3 col-6">
            <i className="bi bi-facebook fs-4 contact-icon" />
            <p className="mb-0">Nexus Suprimentos</p>
          </div>
        </div>
      </section>


    </>)
}