import "./Loading.css";

export default function Loading() {
  return (
    <main className="app-container" role="main">
      <div className="loading-container">
        <div className="spinner" />
        <p className="loading-text">Loading...</p>
      </div>
    </main>
  );
}
