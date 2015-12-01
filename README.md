# 扇贝翻译chrome插件

本插件是基于扇贝API而开发的chrome浏览器英语翻译插件

## 功能

安装好插件之后，在单词上双击，插件会根据选中的单词调用扇贝API进行翻译，并将翻译后的结果显示出来

## 浏览器支持

+ chrome45+（仅适用于支持fetch方法的浏览器）

## 安装方法

1. 下载本项目
	
	> git clone https://github.com/willwong123/shanBayTranslateChromeExtention.git

2. 在chrome中打包插件

	> 打开chrome浏览器“扩展程序”，勾选上“开发者模式”开启开发者模式，点击“打包扩展程序”，选中到刚刚下载的目录，生成`.crx`插件
	
3. 安装插件

	> 将生成的插件拖到“扩展程序”中即可

## 鸣谢

感谢扇贝API

## License

[MIT](https://github.com/dhg/Skeleton/blob/master/LICENSE.md)