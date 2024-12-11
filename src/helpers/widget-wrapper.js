export class NousWidget {
  constructor(target) {
    this.target = target;
  }

  mount() {
    const shadow = this.target.attachShadow({mode: 'open'});
    const mountPoint = document.createElement('div');
    shadow.appendChild(mountPoint);

    const style = document.createElement('style');
    style.textContent = Nous.styles;
    shadow.appendChild(style);

    const app = Nous.createApp();
    app.mount(mountPoint);
  }
}

// Create the IIFE wrapper template
export function createIIFEWrapper(code) {
  return `(function(global){
    const process = { env: { NODE_ENV: 'production' } };
    ${code}
    global.NousWidget = ${NousWidget.toString()};
  })(typeof window !== 'undefined' ? window : this);`;
}