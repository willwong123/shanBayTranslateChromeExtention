"use strict";

const APIURL = 'https://api.shanbay.com/bdc/search/?word='
let ex,ey,body

let getWord = () => document.getSelection().toString().replace(/^\s/g,'').replace(/$\s/g,'')

let positionPop = (x,y) => {
	let pop = document.querySelector("#popupShanbay")
	let popH = pop.offsetHeight
	let popW = pop.offsetWidth
	let bodyH = body.offsetHeight > document.documentElement.clientHeight ? body.offsetHeight : document.documentElement.clientHeight
	let bodyW = body.offsetWidth > document.documentElement.clientWidth ? body.offsetWidth : document.documentElement.clientWidth
	
	// 情形一：单词在底部边界
	// 判断：e.pageY + popup.height >= body.offsetHeight
	// 弹窗在单词的上方
	// 设置弹窗的top的值
	if (y + popH >= bodyH) {
		pop.style.top = y - popH - 10 + "px"
	} else {
		pop.style.top = y + 10 + "px"
	}
	
	// 情形二：单词在右部边界
	// 判断：e.pageX + popup.width >= body.offsetWidth
	// 弹窗在单词的左方
	// 设置弹窗的left的值
		
	// 情形三： 单词在中间，弹窗左右都会被遮挡
	// 判断：单词在右边界 && 单词也在左边界
	// 弹窗设置在单词的中间
	// 计算left的值为e.pageX - popup.width/2
	
	if (x + popW >= bodyW && x < popW) {
		pop.style.left = x - popW/2 + "px"
	} else if (x + popW >= bodyW) {
		pop.style.left = x - popW + "px"		
	} else {
		pop.style.left = x+ "px"
	}
}

let pronunceWord = () => {
	document.querySelector("audio").src = document.querySelector("audio").getAttribute("data-src")
}

let createPop = res => {
	while (!document.querySelector("#popupShanbay")) {
		let pop = document.createElement("div")
		let popInnerHtml
		pop.id = "popupShanbay"
		pop.classList.add("popup")
		if (res.status_code) {
			popInnerHtml = `<section>
				<p><b class="content">${res.msg}</b></p>
			</section>`;
		} else {
			popInnerHtml = `<section>
				<p><b class="content">${res.data.content}</b></p>
				<p hidden><audio autoplay controls src="" data-src="${res.data.audio}"/></p>
				<p>发音：[<span class="pronunciation">${res.data.pronunciation}</span>] <a href="javascript:;" class="sayWord">发音</a></p>
				<p>翻译：<span class="definition">${res.data.definition}</span></p>
			</section>`;
		}
		
		pop.innerHTML = popInnerHtml
		body.appendChild(pop)
		if (document.querySelector(".sayWord")) {
			document.querySelector(".sayWord").addEventListener("click",e => {
				e.stopPropagation()
				pronunceWord()
			},false)
		}
		pop.addEventListener("click",e => {e.stopPropagation()},false)
		pop.addEventListener("dblclick",e => {e.stopPropagation()},false)
	}
}

let translate = word => {
	let req = APIURL + word
	fetch(req)
		.then(res => res.json())
		.then(res => {
			createPop(res)
		})
		.then(() => {positionPop(ex,ey)})
		.catch(err => console.log(err))
}

let showPop = e => {
	let word = getWord()
	if (!word) return;
	ex = e.pageX
	ey = e.pageY
	translate(word)
}

let removePop = () => {
	while (document.querySelector("#popupShanbay")) {
		body.removeChild(document.querySelector("#popupShanbay"))
	}
}

let styl = document.createElement("style")

let stylContent = document.createTextNode("#popupShanbay{display: block !important;}#popupShanbay [hidden]{display:none !important;}.popup{position:absolute;z-index:12340000;width:200px;line-height:1.5;border:1px solid #ddd;color:#333;background:#fff}.popup header{height:25px;font-size:14px;font-weight:700;padding:2px 10px}.popup section{padding:0 10px}.popup section p{margin:0;padding:2px 0;text-align:left;}.sayWord{display: inline-block;vertical-align:middle;position:relative;width:18px;height:18px;overflow:hidden;border-radius:50%;border: 1px solid #333;text-indent:-99em;}.sayWord:before{content:'';position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-35%);border:6px solid #333;border-right-width:0;border-top-color:transparent;border-bottom-color:transparent;}")

styl.styleSheet ? (styl.styleSheet.cssText = stylContent.nodeValue) : styl.appendChild(stylContent)
	
body = document.getElementsByTagName("body")[0]
document.getElementsByTagName("head")[0].appendChild(styl)
document.body.removeEventListener("dblclick")
document.body.addEventListener("dblclick",showPop,false)
document.addEventListener("click",removePop,false)
