let name = prompt('请输入您的昵称：');

var socket = io(); // 建立socket链接，返回id信息
// 设置昵称
socket.emit('my name', { from: socket.id, msg: name });

console.log(socket);
var targetid = ''; // 保存目标id，给你发信息的对方id

let button = document.getElementById('toSubmit');
/**
 * 发送消息事件
 * 消息格式 {from: 自己的id, msg: 消息内容, to: 对方id}
 */
button.onclick = function () {
    if (!targetid) {
        alert('请先选择要聊天的好友');
        return;
    }
    let info = document.getElementById('Info').value;
    socket.emit('chat message', { from: socket.id, msg: info, to: targetid, name });

    document.getElementById('Info').value = '';
}
/**
 * 接收消息
 */
socket.on('chat message', function (chat) {
    // 显示消息到消息栏,包括时间和消息内容
    let msgbox = document.getElementById('Message');
    let p_time = document.createElement('p');
    p_time.innerText = chat.time;
    p_time.className = chat.from == socket.id ? 'time from' : 'time to';
    msgbox.appendChild(p_time);
    let p_info = document.createElement('p');
    p_info.innerHTML = `<span>${chat.msg}</span>`;
    p_info.className = chat.from == socket.id ? 'info from' : 'info to';
    msgbox.appendChild(p_info);

    // // 记录消息来源id，显示消息提醒
    // let infobox = document.getElementById('Friends');
    // let info = document.createElement('h1');
    // info.innerText = `${chat.from} 给你发消息了`;
    // infobox.appendChild(info);

    // 如果有人给你发消息，自动弹出发消息框
    if (chat.from != socket.id) {
        document.getElementById('Target').innerHTML = `给${chat.name}发送消息`;
        targetid = chat.from;
    }
})
// socket.on('server message', function (svchat) {
//     let msgbox = document.getElementById('Friends');
//     let p = document.createElement('h1');
//     p.innerText = `${svchat.id} 上线了`;

//     msgbox.appendChild(p);

//     targetid = svchat.id;
// })
socket.on('friend list', function (list) {
    let msgbox = document.getElementById('Friends');
    msgbox.innerHTML = '';
    console.log(list);
    list.forEach(v => {
        let p = document.createElement('p');
        p.innerHTML = socket.id == v.id ? `用户（自己）：${v.name}` : `用户：${v.name} <a class="send" href="javescript:void(0)" onclick="setTarget('${v.id}', '${v.name}')">发送消息</a>`;

        msgbox.appendChild(p);
    });

    if (!list.find(v => v.id == targetid)) {
        // 如果有人给你发消息，自动弹出发消息框
        document.getElementById('Target').innerHTML = `发送消息`;
        targetid = '';
    }
})
socket.on('disconnect', () => {

})

function setTarget(id, name) {
    targetid = id;
    document.getElementById('Target').innerHTML = `给${name}发送消息`;
}