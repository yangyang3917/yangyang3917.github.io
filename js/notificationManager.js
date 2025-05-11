// scripts/notificationManager.js
import Notification from './notification.js';

export default class NotificationManager {
    static instance;
    queue = [];
    
    static getInstance() {
        if (!this.instance) {
            this.instance = new NotificationManager();
        }
        return this.instance;
    }

    async add(type, title, content, options) {
        const notification = new Notification(
            type, 
            title, 
            content, 
            options // 传递自定义参数
        );
        
        // 队列管理
        this.queue.unshift(notification);
        if (this.queue.length > 5) {
            const oldest = this.queue.pop();
            oldest.hide();
        }
        
        // 显示并调整位置
        await notification.show();
        this.adjustPositions();
    }

    adjustPositions() {
        this.queue.forEach((note, index) => {
            const top = 20 + index * 80; // 80px为每个通知的高度+间距
            note.element.style.top = `${top}px`;
        });
    }
}