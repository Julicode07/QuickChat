import { createRoot } from 'react-dom/client';
import './index.css';
import RoutesApp from './Routes';

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <RoutesApp />
  );
}

