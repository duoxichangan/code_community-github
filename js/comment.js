(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const usernameInput = document.getElementById('username');
        const commentInput = document.getElementById('comment-content');
        const submitBtn = document.getElementById('submit-comment');
        const todayCommentsList = document.getElementById('today-comments-list');
        const dateSelector = document.getElementById('date-selector');
        const loadDateBtn = document.getElementById('load-date');
        const emojiPicker = document.getElementById('emoji-picker');
        const emojiToggle = document.getElementById('emoji-toggle');

        // 常用 emoji 列表
        const emojis = ['😊', '😂', '👍', '🎉', '❤️', '🤔', '😢', '🥳'];

        const today = new Date();
        // 用于提交时保存的显示日期字符串
        const formattedDate = formatDate(today);

        // 设置日期选择器默认值为今天
        dateSelector.valueAsDate = today;

        // 渲染 emoji 选择器
        renderEmojiPicker();

        // 初始渲染“今日已打卡”
        loadComments(today);

        // 文本区域自动伸缩
        function adjustTextareaHeight() {
            commentInput.style.height = 'auto';
            commentInput.style.height = commentInput.scrollHeight + 'px';
        }
        commentInput.addEventListener('input', adjustTextareaHeight);

        // Emoji 面板切换
        emojiToggle.addEventListener('click', () => {
            const open = emojiPicker.style.display !== 'block';
            emojiPicker.style.display = open ? 'block' : 'none';
        });

        // 提交按钮事件
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const username = usernameInput.value.trim();
            const content = commentInput.value.trim();
            if (!username || !content) {
                alert('请填写完整信息');
                return;
            }

            // 添加加载状态
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // 模拟异步操作
            setTimeout(() => {
                try {
                    const timestamp = Date.now();
                    // 这里用当前提交时的日期格式，也可以用用户选择的日期
                    const comment = { username, content, date: timestamp, displayDate: formattedDate };
                    saveComment(comment);
                    commentInput.value = '';
                    adjustTextareaHeight();
                    loadComments(today);

                    // 添加提交成功动画
                    submitBtn.classList.add('success');
                    setTimeout(() => {
                        submitBtn.classList.remove('success');
                    }, 1000);
                } catch (error) {
                    console.error('提交失败:', error);
                    alert('提交失败，请重试');
                } finally {
                    // 恢复按钮状态
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
            }, 800); // 模拟网络延迟
        });

        // 查看历史
        loadDateBtn.addEventListener('click', function() {
            const selectedDate = new Date(dateSelector.value);
            loadComments(selectedDate);
        });

        // 插入 emoji
        function insertEmoji(emoji) {
            commentInput.value += emoji;
            adjustTextareaHeight();
            commentInput.focus();
        }

        // 渲染 emoji 按钮
        function renderEmojiPicker() {
            if (!emojiPicker) return;
            emojiPicker.innerHTML = '';
            emojis.forEach(emoji => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'emoji-btn';
                btn.textContent = emoji;
                btn.addEventListener('click', () => insertEmoji(emoji));
                emojiPicker.appendChild(btn);
            });
            // 默认隐藏
            emojiPicker.style.display = 'none';
        }

        // 删除评论
        function deleteComment(ts, date) {
            let all = JSON.parse(localStorage.getItem('dailyComments') || '[]');
            all = all.filter(c => c.date !== ts);
            localStorage.setItem('dailyComments', JSON.stringify(all));
            loadComments(date);
        }

        function saveComment(comment) {
            const arr = JSON.parse(localStorage.getItem('dailyComments') || '[]');
            arr.push(comment);
            localStorage.setItem('dailyComments', JSON.stringify(arr));
        }

        function loadComments(date) {
            const start = new Date(date); start.setHours(0,0,0,0);
            const end = new Date(date); end.setHours(23,59,59,999);
            const all = JSON.parse(localStorage.getItem('dailyComments') || '[]');
            const filtered = all.filter(c => {
                const t = new Date(c.date);
                return t >= start && t <= end;
            });
            todayCommentsList.innerHTML = '';
            if (filtered.length === 0) {
                todayCommentsList.innerHTML = `<p>${isToday(date) ? '今日暂无打卡' : '暂无打卡记录'}</p>`;
                return;
            }
            filtered.forEach(c => {
                const item = document.createElement('div');
                item.className = 'comment-item';
                item.innerHTML = `
          <div class="comment-header">
            <strong>${c.username}</strong> <span>${c.displayDate}</span>
          </div>
          <div class="comment-content">${c.content}</div>
          <button class="delete-btn" data-ts="${c.date}">删除</button>
        `;
                const delBtn = item.querySelector('.delete-btn');
                delBtn.addEventListener('click', () => deleteComment(c.date, date));
                todayCommentsList.appendChild(item);
            });
        }

        function formatDate(d) {
            const opts = { year:'numeric', month:'long', day:'numeric', weekday:'long' };
            return d.toLocaleDateString('zh-CN', opts);
        }
        function isToday(d) {
            const n = new Date();
            return d.getDate()===n.getDate() && d.getMonth()===n.getMonth() && d.getFullYear()===n.getFullYear();
        }
    });
})();
