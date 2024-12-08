import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function wrapIIFE() {
    return {
        name: 'wrap-iife',
        generateBundle(options, bundle) {
            const fileName = 'nous-chat.js'
            const file = bundle[fileName]
        if (file) {
            file.code = `(function(global){
    var process = { env: { NODE_ENV: 'production' } };
    ${file.code}
    // Create a class to handle Shadow DOM initialization
    class NousWidget {
        constructor(target) {
            this.target = target;
        }

        mount() {
            // Create shadow root
            const shadow = this.target.attachShadow({ mode: 'open' });
            
            // Create mount point
            const mountPoint = document.createElement('div');
            shadow.appendChild(mountPoint);
            
            // Create and inject style element for Tailwind
            const style = document.createElement('style');
            style.textContent = Nous.styles; // CSS will be injected here by Vite
            shadow.appendChild(style);
            
            // Initialize Vue app in shadow DOM
            const app = Nous.createApp();
            app.mount(mountPoint);
        }
    }
    
    global.NousWidget = NousWidget;
            })(typeof window !== 'undefined' ? window : this);`;
        }   
        }
    }
}

export default defineConfig({
    plugins: [vue(), wrapIIFE()],
    build: {
        lib: {
            entry: 'src/main.js',
            name: 'Nous',
            fileName: () => 'nous-chat.js',
            formats: ['iife']
        },
        rollupOptions: {
            external: [], // Empty array means no external dependencies
            output: {
                globals: {} // Empty object as we're not using any globals
            }
        },
        cssCodeSplit: false,
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify('production')
    },
    server: {
        open: './index.html'
    }
})