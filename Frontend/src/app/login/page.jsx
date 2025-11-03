'use client';

import { useState } from 'react';

export default function Home() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const handleLogin = (e) => {
    e.preventDefault(); 

    if (email === 'admin@nexus.com' && password === 'admin123') {
      setError(''); 
      window.location.href = '/adm'; 
    } else {
      setError('E-mail ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#276678" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10 " >
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="/img/medica.jpg"
                      alt="Imagem de fundo para Login de Colaboradores"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center" style={{ backgroundColor: "#F6F5F5", borderRadius: "0 1rem 1rem 0" }}>
                    <div className="card-body p-4 p-lg-5 text-black">
                      
                      <form onSubmit={handleLogin}>
                        <div className="d-flex align-items-center mb-3 pb-1" style={{color :"#1687A7" }}>
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          />
                          <span className="h1 fw-bold mb-0">Nexus</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1, color :"#1687A7"  }}
                        >
                          Acesso ao Sistema Interno
                        </h5>

                        {error && (
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        )}

                        <div data-mdb-input-init="" className="form-outline mb-4" style={{color :"#1687A7" }}>
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form2Example17">
                            E-mail Corporativo
                          </label>
                        </div>
                        <div data-mdb-input-init="" className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form2Example27">
                            Senha
                          </label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            data-mdb-button-init=""
                            data-mdb-ripple-init=""
                            className="btn btn-lg btn-block"
                            style={{ backgroundColor: "#1687A7", color :"#F6F5F5" }}
                            type="submit"
                          >
                            Entrar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

