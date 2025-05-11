// scripts/notification.js
export default class Notification {
    constructor(type, title, content, options = {}) {
        this.options = {
            enterDuration: 300,
            exitDuration: 200,
            displayDuration: 5000,
            ...options // 合并自定义参数
        };

        this.element = this.createDOM(type);
        this.createContent(title, content);
        this.applyCustomDurations();
    }

    createDOM(type) {
        const div = document.createElement('div');
        div.className = `notification ${type}`;
        return div;
    }

    createContent(title, content) {
        const titleEl = document.createElement('div');
        titleEl.className = 'title';
        titleEl.textContent = title;

        const contentEl = document.createElement('div');
        contentEl.textContent = content;

        this.element.append(titleEl, contentEl);
    }

    applyCustomDurations() {
        // 动态设置CSS变量
        this.element.style.setProperty(
            '--enter-duration', 
            `${this.options.enterDuration}ms`
        );
        this.element.style.setProperty(
            '--exit-duration', 
            `${this.options.exitDuration}ms`
        );
    }

    show() {
        return new Promise(resolve => {
            document.body.appendChild(this.element);
            
            // 下一帧触发进入动画
            requestAnimationFrame(() => {
                this.element.classList.add('active');
                this.startDismissTimer();
                resolve();
            });
        });
    }

    startDismissTimer() {
        this.timer = setTimeout(
            () => this.hide(),
            this.options.displayDuration
        );
    }

    async hide() {
        this.element.classList.add('exiting');
        
        await new Promise(resolve => {
            this.element.addEventListener(
                'transitionend', 
                resolve, 
                { once: true }
            );
        });
        
        this.element.remove();
    }
}
