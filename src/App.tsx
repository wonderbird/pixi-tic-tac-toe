import * as PIXI from 'pixi.js';
import React from 'react';
import './App.css';
import createScene from "./createScene";

function App() {
  const app = new PIXI.Application();
  app.init({background: "#1099bb", resizeTo: window, hello: true})
    .then(async () => {
      const appContainer = document.body.querySelector('#root .App');
      if (typeof appContainer === 'undefined' || appContainer === null) {
        console.error("App container not found");
        return;
      }

      const existingCanvas = appContainer?.querySelector('canvas');
      if (typeof existingCanvas !== 'undefined' && existingCanvas !== null) {
        existingCanvas.remove();
      }

      appContainer.appendChild(app.canvas);

      await createScene(app);
    });

  return (
    <div className="App">
    </div>
  );
}

export default App;
