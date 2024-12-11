import {createApp} from 'vue';
import NousChat from './components/NeoChat/NeoChat.vue';
import style from './style.css?inline';

const Nous = {
  init(config) {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const shadow = container.attachShadow({mode: 'open'});
    const mountPoint = document.createElement('div');
    shadow.appendChild(mountPoint);

    const styleElement = document.createElement('style');
    styleElement.textContent = style;
    shadow.appendChild(styleElement);

    const app = createApp(NousChat, config);
    app.mount(mountPoint);

    return {container, shadow, app};
  },
};

// Explicitly set Nous on window
if (typeof window !== 'undefined') {
  window.Nous = Nous;
}

export default Nous;