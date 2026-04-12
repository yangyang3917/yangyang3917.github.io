class ChatApp {
    constructor() {
        this.initializeElements();
        this.loadSettings();
        this.loadChatHistory();
        this.setupEventListeners();
        this.setupAutoSave();
    }

    initializeElements() {
        // 主元素
        this.chatContainer = document.getElementById('chatContainer');
        this.emptyState = document.getElementById('emptyState');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.errorMessage = document.getElementById('errorMessage');
        this.successMessage = document.getElementById('successMessage');

        // 控制按钮
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.clearChatBtn = document.getElementById('clearChatBtn');
        this.saveSettingsBtn = document.getElementById('saveSettingsBtn');
        this.closeSettingsBtn = document.getElementById('closeSettingsBtn');
        this.fileInput = document.getElementById('fileInput');

        // 设置相关
        this.settingsModal = document.getElementById('settingsModal');
        this.apiUrlInput = document.getElementById('apiUrl');
        this.apiKeyInput = document.getElementById('apiKey');
        this.modelNameInput = document.getElementById('modelName');
        this.systemPromptInput = document.getElementById('systemPrompt');
        this.autoSaveCheckbox = document.getElementById('autoSave');
        this.streamOutputCheckbox = document.getElementById('streamOutput');

        // 状态栏
        this.messageCount = document.getElementById('messageCount');
        this.contextCount = document.getElementById('contextCount');
        this.storageStatus = document.getElementById('storageStatus');
        this.storageStatusIcon = document.getElementById('storageStatusIcon');

        // 聊天记录
        this.messages = [];
        this.isGenerating = false;
        this.currentStreamMessageIndex = null; // 当前流式输出的消息索引
    }

    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('ai_chat_settings') || '{}');
        this.settings = {
            apiUrl: settings.apiUrl || 'https://120101.xyz/v1',
            apiKey: settings.apiKey || '',
            modelName: settings.modelName || 'gemini-gemma-4-31B-200K',
            systemPrompt: settings.systemPrompt || '你是一个乐于助人的AI助手。',
            autoSave: settings.autoSave !== false,
            streamOutput: settings.streamOutput !== false
        };

        // 更新输入框
        this.apiUrlInput.value = this.settings.apiUrl;
        this.apiKeyInput.value = this.settings.apiKey;
        this.modelNameInput.value = this.settings.modelName;
        this.systemPromptInput.value = this.settings.systemPrompt;
        this.autoSaveCheckbox.checked = this.settings.autoSave;
        this.streamOutputCheckbox.checked = this.settings.streamOutput;
    }

    saveSettings() {
        this.settings = {
            apiUrl: this.apiUrlInput.value.trim(),
            apiKey: this.apiKeyInput.value.trim(),
            modelName: this.modelNameInput.value.trim(),
            systemPrompt: this.systemPromptInput.value.trim(),
            autoSave: this.autoSaveCheckbox.checked,
            streamOutput: this.streamOutputCheckbox.checked
        };

        try {
            localStorage.setItem('ai_chat_settings', JSON.stringify(this.settings));
            this.showMessage('设置保存成功！', 'success');
            setTimeout(() => this.settingsModal.style.display = 'none', 1000);
        } catch (e) {
            this.showMessage('保存设置失败：' + e.message, 'error');
        }
    }

    loadChatHistory() {
        try {
            const history = localStorage.getItem('ai_chat_history');
            if (history) {
                this.messages = JSON.parse(history);
                this.renderChatHistory();
                this.updateStatusBar();
            }
        } catch (e) {
            console.error('加载聊天记录失败:', e);
            this.showMessage('加载聊天记录失败', 'error');
        }
    }

    saveChatHistory() {
        if (!this.settings.autoSave) return;

        try {
            localStorage.setItem('ai_chat_history', JSON.stringify(this.messages));
            this.storageStatus.textContent = '已保存到本地';
            this.storageStatusIcon.className = 'fas fa-database status-connected';
        } catch (e) {
            console.error('保存聊天记录失败:', e);
            this.storageStatus.textContent = '保存失败';
            this.storageStatusIcon.className = 'fas fa-database status-disconnected';
        }
    }

    setupAutoSave() {
        setInterval(() => {
            this.saveChatHistory();
        }, 3000);
    }

    setupEventListeners() {
        // 发送消息
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            } else if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.messageInput.value += '\n';
            }
        });

        // 控制按钮
        this.exportBtn.addEventListener('click', () => this.exportChat());
        this.importBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.importChat(e));
        this.settingsBtn.addEventListener('click', () => this.showSettings());
        this.closeSettingsBtn.addEventListener('click', () => this.settingsModal.style.display = 'none');
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.clearChatBtn.addEventListener('click', () => this.clearChatHistory());

        // 点击外部关闭设置
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.settingsModal.style.display = 'none';
            }
        });
    }

    showSettings() {
        this.settingsModal.style.display = 'flex';
    }

    showMessage(message, type) {
        const element = type === 'error' ? this.errorMessage : this.successMessage;
        const otherElement = type === 'error' ? this.successMessage : this.errorMessage;
        
        otherElement.style.display = 'none';
        element.textContent = message;
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }

    updateStatusBar() {
        const totalMessages = this.messages.length;
        const contextMessages = this.messages.filter(m => m.includeInContext).length;
        
        this.messageCount.textContent = `${totalMessages} 条消息`;
        this.contextCount.textContent = `${contextMessages} 条上下文`;
    }

    createMessageElement(message, index) {
        const isUser = message.role === 'user';
        const messageElement = document.createElement('div');
        messageElement.className = `message ${isUser ? 'message-user' : 'message-ai'}`;
        
        const checkboxId = `msg-checkbox-${index}`;
        const pairCheckboxId = isUser ? 
            `msg-checkbox-${index + 1}` :  // 用户消息对应后面的AI消息
            `msg-checkbox-${index - 1}`;   // AI消息对应前面的用户消息

        messageElement.innerHTML = `
            ${!isUser ? `
                <div class="message-checkbox">
                    <input type="checkbox" id="${checkboxId}" 
                           ${message.includeInContext ? 'checked' : ''}
                           data-index="${index}"
                           data-pair-id="${pairCheckboxId}">
                </div>
            ` : ''}
            
            <div class="message-content ${index === this.currentStreamMessageIndex ? 'message-streaming' : ''}">
                <div>${this.formatMessageContent(message.content)}</div>
                <div class="message-meta">
                    <i class="fas fa-clock"></i>
                    ${new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
            </div>

            ${isUser ? `
                <div class="message-checkbox">
                    <input type="checkbox" id="${checkboxId}" 
                           ${message.includeInContext ? 'checked' : ''}
                           data-index="${index}"
                           data-pair-id="${pairCheckboxId}">
                </div>
            ` : ''}
        `;

        // 添加复选框事件监听
        const checkbox = messageElement.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', (e) => {
                this.handleCheckboxChange(e, index, isUser);
            });
        }

        return messageElement;
    }

    handleCheckboxChange(e, index, isUser) {
        const isChecked = e.target.checked;
        
        // 更新当前消息
        this.messages[index].includeInContext = isChecked;
        
        // 找到并更新配对的消息
        const pairCheckboxId = e.target.dataset.pairId;
        if (pairCheckboxId) {
            const pairCheckbox = document.getElementById(pairCheckboxId);
            if (pairCheckbox) {
                pairCheckbox.checked = isChecked;
                const pairIndex = parseInt(pairCheckbox.dataset.index);
                if (!isNaN(pairIndex) && this.messages[pairIndex]) {
                    this.messages[pairIndex].includeInContext = isChecked;
                }
            }
        }
        
        this.saveChatHistory();
        this.updateStatusBar();
    }

    formatMessageContent(content) {
        if (!content) return '';
        return content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br>')
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>');
    }

    renderChatHistory() {
        this.chatContainer.innerHTML = '';
        
        if (this.messages.length === 0) {
            this.emptyState.style.display = 'flex';
            return;
        }
        
        this.emptyState.style.display = 'none';
        
        this.messages.forEach((message, index) => {
            const messageElement = this.createMessageElement(message, index);
            this.chatContainer.appendChild(messageElement);
        });
        
        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        }, 100);
    }

    async sendMessage() {
        const content = this.messageInput.value.trim();
        if (!content || this.isGenerating) return;

        // 添加用户消息
        this.addMessage('user', content);
        this.messageInput.value = '';
        
        // 显示输入指示器
        this.typingIndicator.style.display = 'block';
        this.isGenerating = true;
        this.sendBtn.disabled = true;
        
        try {
            // 构建上下文消息
            const contextMessages = [];
            
            // 添加系统提示
            if (this.settings.systemPrompt) {
                contextMessages.push({
                    role: 'system',
                    content: this.settings.systemPrompt
                });
            }
            
            // 添加被勾选的历史消息
            this.messages.forEach(msg => {
                if (msg.includeInContext && msg.role !== 'system') {
                    contextMessages.push({
                        role: msg.role,
                        content: msg.content
                    });
                }
            });
            
            // 添加当前用户消息
            contextMessages.push({
                role: 'user',
                content: content
            });
            
            // 发送请求
            const response = await this.sendAPIRequest(contextMessages);
            
            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
            }
            
            if (this.settings.streamOutput) {
                await this.handleStreamResponse(response);
            } else {
                await this.handleJsonResponse(response);
            }
            
        } catch (error) {
            console.error('发送消息失败:', error);
            this.showMessage(`发送失败: ${error.message}`, 'error');
            this.addMessage('assistant', `抱歉，出现了错误: ${error.message}`);
        } finally {
            this.typingIndicator.style.display = 'none';
            this.isGenerating = false;
            this.sendBtn.disabled = false;
            this.saveChatHistory();
        }
    }

    async sendAPIRequest(messages) {
        const requestBody = {
            model: this.settings.modelName,
            messages: messages,
            max_tokens: 2000,
            temperature: 0.7
        };

        if (this.settings.streamOutput) {
            requestBody.stream = true;
        }
        
        return fetch(`${this.settings.apiUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.settings.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
    }

    async handleStreamResponse(response) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';
        
        // 创建AI消息占位符
        const messageIndex = this.messages.length;
        this.messages.push({
            role: 'assistant',
            content: '',
            timestamp: new Date().toISOString(),
            includeInContext: true
        });
        
        // 创建消息元素
        this.currentStreamMessageIndex = messageIndex;
        const messageElement = this.createMessageElement(this.messages[messageIndex], messageIndex);
        this.chatContainer.appendChild(messageElement);
        this.emptyState.style.display = 'none';
        
        const contentElement = messageElement.querySelector('.message-content div');
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.trim() === '') continue;
                    if (line.trim() === 'data: [DONE]') continue;
                    
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.substring(6));
                            const content = data.choices[0]?.delta?.content || '';
                            if (content) {
                                fullResponse += content;
                                this.messages[messageIndex].content = fullResponse;
                                // 直接更新文本内容，不进行格式转换
                                contentElement.innerHTML = fullResponse.replace(/\n/g, '<br>');
                                this.scrollToBottom();
                            }
                        } catch (e) {
                            console.warn('解析流数据失败:', e, '行内容:', line);
                        }
                    }
                }
            }
        } finally {
            this.currentStreamMessageIndex = null;
            // 重新渲染以移除streaming样式
            this.renderChatHistory();
        }
        
        this.updateStatusBar();
    }

    async handleJsonResponse(response) {
        const data = await response.json();
        const reply = data.choices[0]?.message?.content || '（无回复内容）';
        this.addMessage('assistant', reply);
    }

    addMessage(role, content) {
        const message = {
            role: role,
            content: content,
            timestamp: new Date().toISOString(),
            includeInContext: true
        };
        
        this.messages.push(message);
        
        if (role === 'assistant') {
            this.renderChatHistory();
        } else {
            const messageElement = this.createMessageElement(message, this.messages.length - 1);
            this.chatContainer.appendChild(messageElement);
            this.emptyState.style.display = 'none';
            this.scrollToBottom();
        }
        
        this.updateStatusBar();
    }

    exportChat() {
        try {
            const chatData = {
                messages: this.messages,
                settings: this.settings,
                exportTime: new Date().toISOString(),
                version: '1.0'
            };
            
            const dataStr = JSON.stringify(chatData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `ai-chat-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showMessage('聊天记录导出成功！', 'success');
        } catch (e) {
            console.error('导出失败:', e);
            this.showMessage('导出失败: ' + e.message, 'error');
        }
    }

    async importChat(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        try {
            // 先导出当前记录
            if (this.messages.length > 0) {
                this.exportChat();
            }
            
            const text = await file.text();
            const data = JSON.parse(text);
            
            if (!data.messages || !Array.isArray(data.messages)) {
                throw new Error('无效的聊天记录文件');
            }
            
            this.messages = data.messages;
            
            // 恢复设置（如果存在）
            if (data.settings) {
                Object.assign(this.settings, data.settings);
                this.apiUrlInput.value = this.settings.apiUrl || '';
                this.apiKeyInput.value = this.settings.apiKey || '';
                this.modelNameInput.value = this.settings.modelName || '';
                this.systemPromptInput.value = this.settings.systemPrompt || '';
                this.autoSaveCheckbox.checked = this.settings.autoSave !== false;
                this.streamOutputCheckbox.checked = this.settings.streamOutput !== false;
                
                // 保存设置
                localStorage.setItem('ai_chat_settings', JSON.stringify(this.settings));
            }
            
            this.renderChatHistory();
            this.updateStatusBar();
            this.fileInput.value = '';
            
            this.showMessage('聊天记录导入成功！', 'success');
        } catch (e) {
            console.error('导入失败:', e);
            this.showMessage('导入失败: ' + e.message, 'error');
        }
    }

    clearChatHistory() {
        if (this.messages.length === 0) {
            this.showMessage('没有聊天记录可清除', 'error');
            return;
        }
        
        if (confirm('确定要清除聊天记录吗？系统会先导出当前记录。')) {
            // 先导出
            this.exportChat();
            
            // 清除记录
            this.messages = [];
            this.renderChatHistory();
            this.updateStatusBar();
            
            this.showMessage('聊天记录已清除', 'success');
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.chatApp = new ChatApp();
});