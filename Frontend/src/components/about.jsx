import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export function About() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 shadow-lg p-5 bg-white rounded-4 text-center">
          <img
            src="/IMG_8807.webp"
            alt="Profile"
            className="rounded-circle shadow mb-4"
            width="140"
            height="140"
          />

          <h1 className="fw-bold mb-3">About Me</h1>
          <p>
            Hi! My name is <strong>Jan Elia</strong>, a programming student passionate about
            building modern, responsive, and user-friendly web applications. This project is part of
            my fullstack development course where I focus on technologies like <strong>React</strong> and <strong>Node.js</strong>.
          </p>

          <hr className="my-4" />

          <div className="mt-4 text-start">
            <h4 className="fw-semibold text-center mb-3">
              <i className="bi bi-person-lines-fill me-2"></i>Contact Details
            </h4>
            <ul className="list-unstyled fs-5">
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-envelope-fill text-primary me-2"></i>
                <a
                  href="mailto:jan.elia995@hotmail.com"
                  className="text-decoration-none text-dark"
                >
                  jan.elia995@hotmail.com
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-linkedin text-primary me-2"></i>
                <a
                  href="https://www.linkedin.com/in/jan-elia-8001a7231/"
                  className="text-decoration-none text-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/jan-elia-8001a7231
                </a>
              </li>
              <li className="d-flex align-items-center">
                <i className="bi bi-github text-dark me-2"></i>
                <a
                  href="https://github.com/jan-elia-24"
                  className="text-decoration-none text-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/jan-elia-24
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
