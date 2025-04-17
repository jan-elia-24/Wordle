import 'bootstrap/dist/css/bootstrap.min.css';

export function GameStats({ attempts, elapsedTime }) {
  return (
    <div
      className="position-fixed top-50 start-0 translate-middle-y bg-light p-4 shadow-lg rounded-end"
      style={{ minWidth: '180px', zIndex: 999 }}
    >
      <h5 className="text-primary mb-4 text-center">
        <i className="bi bi-bar-chart-fill me-2"></i>Game Stats
      </h5>

      <div className="mb-3 text-center">
        <span className="text-muted">⏱️ Time Elapsed</span>
        <h4 className="fw-bold">{elapsedTime} sec</h4>
      </div>

      <div className="text-center">
        <span className="text-muted">🎯 Attempts</span>
        <h4 className="fw-bold">{attempts}</h4>
      </div>
    </div>
  );
}
