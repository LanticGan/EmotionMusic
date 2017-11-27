# EmotionMusic

能识别情绪的网页音乐播放器

## 描述

我们一直想借助现有的技术开发一个能识别情绪的音乐播放器，最初的想法来源于[@lcyzgdy](https://github.com/lcyzgdy)。这一版本的作品很简单但也具有趣味性，希望能激发你的创意。

## 展示
[Demo](http://139.199.84.28:3000)

## 工作原理

利用[Microsoft Azure Emotion API](https://azure.microsoft.com/en-us/services/cognitive-services/emotion/)进行情绪识别，再通过[网易云音乐API](https://github.com/Binaryify/NeteaseCloudMusicApi)来根据情绪标签完成从歌单到歌曲的搜索。

## 环境要求

1. NodeJS 6.0+ 环境
2. 兼容 MediaDevices.getUserMedia() API的浏览器，具体可查看[MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
3. Microsoft Azure Emotion API Key，可在[官网](https://azure.microsoft.com/en-us/try/cognitive-services/?api=emotion-api)申请。

## 安装

``` shell
$ git clone https://github.com/LanticGan/EmotionMusic
$ cd EmotionMusic
$ npm install
```

## 运行

运行服务器

``` shell
$ node app.js
```

默认开放端口为3000，通过浏览器访问[127.0.0.1:3000](127.0.0.1:3000)即可
