import { createApp } from 'vue'
import NousChat from './components/NousChat.vue'
import style from './style.css?inline'

const Nous = {
    init(config) {
        // Create container
        const container = document.createElement('div')
        document.body.appendChild(container)

        // Create shadow root
        const shadow = container.attachShadow({ mode: 'open' })

        // Create mount point for Vue app
        const mountPoint = document.createElement('div')
        shadow.appendChild(mountPoint)

        // Inject styles into shadow DOM
        const styleElement = document.createElement('style')
        styleElement.textContent = style
        shadow.appendChild(styleElement)

        // Create and mount Vue app inside shadow DOM
        const app = createApp(NousChat, config)
        app.mount(mountPoint)

        return {
            container,
            shadow,
            app
        }
    }
}

// Explicitly set Nous on window
if (typeof window !== 'undefined') {
    window.Nous = Nous
}

export default Nous