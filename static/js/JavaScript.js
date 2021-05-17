var ednetLoginUrl = 'http://kefu.ednet.cn/handlers/userLogin.ashx?method='
var wsUrl = 'kefu.ednet.cn:4502'
var ednetHeadImageUrl = 'http://kefu.ednet.cn/dist/static/img/48.png'
var domain = 'tj_rikevita.com'
var companyName = '天津理研维他食品有限公司'
var kefuInfo = {}

var postJson = {
  domain: domain
}
if (!sessionStorage.getItem('chatUserInfo')) {
  var xmlhttp
  xmlhttp = null
  if (window.XMLHttpRequest) {
    // code for Firefox, Opera, IE7, etc.
    xmlhttp = new XMLHttpRequest()
  }
  else if (window.ActiveXObject) {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
  }
  if (xmlhttp != null) {
    xmlhttp.onreadystatechange = stateChange
    xmlhttp.open('POST', ednetLoginUrl + 'GetSign', false)
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xmlhttp.send(JSON.stringify(postJson))
  }
  else {
    console.log('Your browser does not support XMLHTTP.')
  }
}
function stateChange() {
  if (xmlhttp.readyState === 4) {
    // 4 = 'loaded'
    if (xmlhttp.status === 200) {
      // 200 = 'OK'
      sessionStorage.setItem('chatUserInfo', xmlhttp.response)
    }
    else {
      console.log('Problem retrieving data:' + xmlhttp.statusText)
    }
  }
}
var userInfoJson = JSON.parse(sessionStorage.getItem('chatUserInfo'))
console.log(userInfoJson.username)

var css = document.createElement('style')
css.type = 'text/css'
css.innerHTML = 'html { height:100%;}'
css.innerHTML += '.ednet-panel{position: fixed;right: 15px; bottom:15px;border-radius: 4px; z-index: 1000; box-shadow: 0 0 5px rgba(0,0,0,0.1); border: 1px solid #ccc;font-size:14px;font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;}'

css.innerHTML += '#ednet-waitting { color: #333; width:240px; background:#e0f2f1; }'
css.innerHTML += '#ednet-messageBoard { color: #333; width:480px;height:480px; background:#FFF;}'

css.innerHTML += '.ednet-waitting-body{padding:0 20px;}'
css.innerHTML += '.ednet-messageBoxCell{padding:10px; overflow-y:auto; overflow-x:hidden; height:300px; background:#FFF; }'



css.innerHTML += '.ednet-button { margin: 0; padding:5px 10px; border: none; outline: none; display: inline-block; cursor: pointer; text-align: center; text-decoration: none; text-shadow: 0 1px 1px rgba(0,0,0,0); border-radius: 0.2em; box-shadow: 0 1px 2px rgba(0,0,0,.1); font-family: "微软雅黑"; }'
css.innerHTML += '.ednet-button:hover { text-decoration: none; }'
css.innerHTML += '.ednet-green { color: #fff !important; border: solid 1px #26a69a; background: #4db6ac !important; } .ednet-green:hover { background: #80cbc4!important; }'
css.innerHTML += '.ednet-waitting-title{width:100%; height:30px;background:-moz-linear-gradient(60deg, #00897b 35%, #7e57c2); background:-webkit-linear-gradient(60deg, #00897b 35%, #7e57c2);background:-ms-linear-gradient(60deg, #00897b 35%, #7e57c2); background:linear-gradient(60deg, #00897b 35%, #7e57c2);position:fix; top:0; left:0; border-top-right-radius: 4px; border-top-left-radius: 4px; padding:5px; color:white; box-sizing:border-box;}'
css.innerHTML += '.ednet-waitting-title> i{position:absolute; right:10px;top:5px; width: 20px; height: 20px; overflow: hidden; display:inline-block;cursor:pointer;color:#ccc; -ms-user-select: none;user-select: none; }'
css.innerHTML += '.ednet-waitting-title> i:hover::before, .ednet-waitting-title> i:hover::after { background: #FFF; }'
css.innerHTML += '.ednet-waitting-title> i::before, .ednet-waitting-title> i::after { content: ""; position: absolute; height: 2px; width: 100%; top: 50%; left: 0; margin-top: -1px; background: #ccc; }'
css.innerHTML += '.ednet-waitting-title> i::before { -webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg); transform: rotate(45deg); }'
css.innerHTML += '.ednet-waitting-title> i::after { -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); transform: rotate(-45deg); }'

//ednet-message-in
css.innerHTML += '.ednet-messageBoxCell > li{margin-bottom:15px;}'
css.innerHTML += '.ednet-messageBoxCell > li >p{padding:8px; margin:10px 0 0 20px; border:1px solid #CCC; min-height:24px;box-sizing: border-box;border-radius:4px;  box-shadow: 0 0 5px rgba(0,0,0,0.1); display:block; float:left; min-width:60px;max-width:360px; min-height:38px;position:relative;}'
css.innerHTML += '.ednet-messageBoxCell > li >p:after{ content: ""; display: block; width: 0; height: 0; position: absolute; border-top: 6px solid transparent; border-bottom: 6px solid transparent; }'
css.innerHTML += '.ednet-messageBoxCell > li >p:before { content: ""; display: block; width: 0; height: 0; position: absolute; border-top: 8px solid transparent; border-bottom: 8px solid transparent; }'


css.innerHTML += '.ednet-message-headimg{display:block; width:32px; height:32px; border-radius:100%; float:left; margin-top:10px;}'

css.innerHTML += '.ednet-message-in .ednet-message-content{background:#EEE;}'
css.innerHTML += '.ednet-message-in .ednet-message-content:before { top: 10px; left: -10px; border-right: 10px solid #ccc; }'
css.innerHTML += '.ednet-message-in .ednet-message-content:after{ top: 12px; left: -8px; border-right: 8px solid #EEE; }'

css.innerHTML += '.ednet-message-out .ednet-message-content{background:#4db6ac; color:white; border-color:#4db6ac}'
css.innerHTML += '.ednet-message-out .ednet-message-content:before { top: 10px; left: -10px; border-right: 10px solid #4db6ac; }'
css.innerHTML += '.ednet-message-out .ednet-message-content:after{ top: 12px; left: -8px; border-right: 8px solid #4db6ac; }'
css.innerHTML += '.ednet-clear{clear:both; padding:0; margin:0; height:0;}'

css.innerHTML += '.ednet-typeinput{clear:both; padding:15px;}'
css.innerHTML += '.ednet-typeinput > textarea{padding:0; float:left; width:360px; margin-right:10px; border-radius:4px; box-shadow: 0 0 5px rgba(0,0,0,0.1); height:70px; resize:none; box-sizing:border-box; padding:10px;font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;}'
css.innerHTML += '.ednet-typeinput > button{padding:15px 20px; float:left; margin-top:10px;}'



document.body.appendChild(css)

var parent = document.body
var div = document.createElement('div')
//设置 div 属性，如 id
div.setAttribute('id', 'ednet-waitting')
div.setAttribute('class', 'ednet-panel')
div.innerHTML += '<div class="ednet-waitting-title">' + companyName + '<i onClick="ednetClose()"></i></div>'
parent.appendChild(div)

var messageBoxCell = document.createElement('div')
messageBoxCell.setAttribute('class', 'ednet-waitting-body')
div.appendChild(messageBoxCell)


messageBoxCell.innerHTML += '<p style="text-align:center;">欢迎您，在线客服为您服务</p>'
messageBoxCell.innerHTML += '<p style="text-align:center;"><button type="button" class="ednet-button ednet-green" onClick="ednetConnect()">接通客服</button></p>'



var wsServer = 'ws://' + wsUrl + '/token?name=' + userInfoJson.username + '&sign=' + encodeURIComponent(userInfoJson.sign) + '&domain=' + domain + '&admin=false&islogin=false&uniqueid=none'
var noSupportMessage = '抱歉！当前您使用的浏览器已不再被支持，请尝试更新或者安全其它浏览器'
var ws
// enter to send message
function enterSend(e) {
  e = e || window.event
  var charCode = (typeof e.which === 'number') ? e.which : e.keyCode
  if (!e.shiftKey && charCode === 13) {
    sendMessage()
    e.preventDefault()
    return false
  }
}
// scroll to bottom
function scrollToBottom(target) {
  target.scrollTop = target.scrollHeight
}
// connect to server
function ednetConnect() {
  document.getElementById('ednet-waitting').style.display = 'none'
  var div = document.createElement('div')
  div.setAttribute('id', 'ednet-messageBoard')
  div.setAttribute('class', 'ednet-panel')
  div.innerHTML += '<div class="ednet-waitting-title">' + companyName + '<i onClick="ednetClose()"></i></div>'
  document.body.appendChild(div)


  var messageBoxCell = document.createElement('ul')
  messageBoxCell.setAttribute('id', 'messageBoxCell')
  messageBoxCell.setAttribute('class', 'ednet-messageBoxCell')
  div.appendChild(messageBoxCell)

  div.innerHTML += '<hr style="margin:0; "/>'
  div.innerHTML += '<div class="ednet-typeinput"><textarea id="ednet-messageBox"  onkeydown="enterSend(event)"></textarea><button id="ednet-btnSend"" class="ednet-button ednet-green"  onClick="sendMessage()">发送</button></div>'

  connectSocketServer(wsServer)
}

function sendMessage() {
  if (ws) {
    var messageBoard = document.getElementById('ednet-messageBoard')
    var messageBox = document.getElementById('ednet-messageBox')

    if (ws.readyState === 3) {
      _innerMessage('* 您的会话已经被关闭. 如果您需要重连，请刷新页面')
    }
    else {
      if (!sessionStorage.getItem('kefuInfoName'))
        _innerMessage('* 客服未接入，您的消息将无法送出......')
      else if (messageBox.value == null || messageBox.value === '')
        alert('* 您还没有输入对话内容')
      else {
        _MessageFormat(0, ednetFilter(messageBox.value))
        _outMessage(messageBox.value)
      }
    }
    messageBox.value = null
  } else {
    alert(noSupportMessage)
  }
}
function _MessageFormat(code, content) {
  var json = {
    'id': 0,
    'fromUser': userInfoJson.username,
    'toUser': sessionStorage.getItem('kefuInfoName'),
    'content': content,
    'code': 0,
    'addTime': new Date()
  }
  ws.send(JSON.stringify(json))
}
function _outMessage(val) {
  var messageBoxCell = document.getElementById('messageBoxCell')
  messageBoxCell.innerHTML += '<li class="ednet-message-out"><img class="ednet-message-headimg" src="' + ednetHeadImageUrl + '"/><p class="ednet-message-content">' + val + '</p></li>'
  messageBoxCell.innerHTML += '<li class="ednet-clear"></li>'
  scrollToBottom(messageBoxCell)
}
function _innerMessage(val) {
  var messageBoxCell = document.getElementById('messageBoxCell')
  messageBoxCell.innerHTML += '<li class="ednet-message-in"><img class="ednet-message-headimg" src="' + ednetHeadImageUrl + '"/><p class="ednet-message-content">' + val + '</p></li>'
  messageBoxCell.innerHTML += '<li class="ednet-clear"></li>'
  scrollToBottom(messageBoxCell)
}
function _innerInfo(val) {
  var messageBoxCell = document.getElementById('messageBoxCell')
  messageBoxCell.innerHTML += '<li>' + val + '<br/></li>'
  scrollToBottom(messageBoxCell)
}
// connect to server
function connectSocketServer(url) {
  var support = 'MozWebSocket' in window ? 'MozWebSocket' : ('WebSocket' in window ? 'WebSocket' : null)

  if (support == null) {
    _innerMessage('* ' + noSupportMessage)
    return
  }
  _innerInfo('* Connecting to server ..')
  ws = new window[support](url)
  ws.onopen = function () {
    _innerInfo('* Connection open')
  }
  ws.onmessage = function (evt) {
    try {
      var messageJson = JSON.parse(evt.data)
      if (messageJson.code === 40) {
        _innerMessage(':( 很抱歉，客服好像掉线了')
        kefuClose()
      }
      else {
        if (messageJson.code === 2001)
          sessionStorage.setItem('kefuInfoName', messageJson.fromUser)
        _innerMessage(messageJson.content)
      }
    }
    catch (e) {
      _innerMessage('* ' + evt.data)
      console.log(e)
    }
  }
  ws.onclose = function () {
    sessionStorage.removeItem('kefuInfoName')
  }
}
window.onload = function () {
  sessionStorage.removeItem('kefuInfoName')
}
function ednetClose() {
  var parent = document.body
  parent.removeChild(document.getElementById('ednet-waitting'))
  parent.removeChild(document.getElementById('ednet-messageBoard'))
  if (ws) {
    ws.close()
  }
}
function kefuClose() {
  if (ws) {
    ws.close()
  }
  _innerMessage('您的会话已经关闭')
}
function ednetFilter(str) {
  if (str !== null && str !== '') {
    var regex = /(<([^>]+)>)/ig
    var result = str.replace(regex, '')
    return result
  }
  else
    return str
}
