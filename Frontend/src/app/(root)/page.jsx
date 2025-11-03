import Contato from "@/components/blocks/contato";
import "./page.module.css"
import Sobre from "@/components/blocks/sobre";


export default function Home() {

  return (
    <>

      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/img/banner1.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/img/banner2.png" className="d-block w-100" alt="..." />
          </div>

        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <Sobre/>
      <Contato/>


    </>
  );
}
