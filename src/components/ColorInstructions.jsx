import 'bootstrap/dist/css/bootstrap.min.css';

export function ColorInstructions() {
  return (
    <div
      className="position-fixed top-50 end-0 translate-middle-y bg-light p-4 shadow-lg rounded-start"
      style={{ minWidth: '180px', zIndex: 999 }}
    >
      <h5 className="text-primary mb-4 text-center">
        <i className="bi bi-palette-fill me-2"></i>Game Guide
      </h5>

      <ul className="list-unstyled mb-0">
        <li className="mb-3 d-flex align-items-center">
          <div 
            className="bg-success text-white fw-bold d-flex justify-content-center align-items-center rounded me-2" 
            style={{ width: '32px', height: '32px' }}
          >
            A
          </div>
          Correct
        </li>
        <li className="mb-3 d-flex align-items-center">
          <div 
            className="bg-warning text-white fw-bold d-flex justify-content-center align-items-center rounded me-2" 
            style={{ width: '32px', height: '32px' }}
          >
            R
          </div>
          Misplaced
        </li>
        <li className="d-flex align-items-center">
          <div 
            className="bg-danger text-white fw-bold d-flex justify-content-center align-items-center rounded me-2" 
            style={{ width: '32px', height: '32px' }}
          >
            B
          </div>
          Incorrect
        </li>
      </ul>
    </div>
  );
}