import "./Loading.css";

export default function Loading() {
  return (
    <main className="app-container" role="main">
      <h1 className="visually-hidden">Multi-Step Form</h1>
      <div className="loading-container">
        <div className="spinner" aria-hidden="true" />
        <p className="loading-text" role="status">
          Loading...
        </p>
      </div>
    </main>
  );
}
