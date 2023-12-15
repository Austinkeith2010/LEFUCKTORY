nav.style.top = "26px";
twstyle = document.createElement("style");
twstyle.innerText = `
.ui-vis {
    padding: 5px;
    border-radius: 10px;
    background: #0009 !important;
    border: none !important;
    color: white !important;
    border-top: 2px solid #777;
    font-family: Consolas;
    font-size: 14px !important;
}
#nav {
    width: 12em;
}
#nav li {
    padding: 4px;
    border-radius: 2px;
}
#nav li.hover {
    background: #3339;
}
.modal_frame, .modal_client, #chat_window {
    background: #0009;
    border-radius: 10px;
    color: white;
    padding: 5px;
}
.color_btn {
    border: 1px solid white;
    color: black;
}
.chatfield {
    color: black;
    padding: 5px;
    border-radius: 10px
}
input, button {
    padding: 4px;
    border-radius: 10px;
    font-family: inherit;
    border: 2px solid black;
}
.jscolor {
    padding: 2px;
    border-radius: 5px;
}
#chat_close {
    border-radius: 6px;
    background: #d22;
    border: none;
}
.chat_tab_button {
    background: #000;
    color: white;
    border-radius: 10px;
    padding: 2px 8px;
    font-family: inherit;
    font-size: 14px;
    border: none;
    position: relative;
    top: -2px;
}
.chat_tab_selected {
    background: #fff;
    color: black
}`;
document.body.appendChild(twstyle);
[...document.getElementsByClassName("chat_tab_button")].forEach(e=>{e.style.minWidth = ""; e.firstChild.textContent = e.firstChild.textContent.replaceAll(" ", "")});
