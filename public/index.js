$(function() {
  var videoProps = {
    video: {}
  };
  var p = navigator.mediaDevices.getUserMedia(videoProps);
  p.then(function(mediaStream) {
    var video = document.querySelector("video");
    video.src = window.URL.createObjectURL(mediaStream);
  });
  p.catch(function(err) {
    console.log(err.name);
  });

  var canvas = document.querySelector("#canvas"),
    context = canvas.getContext("2d"),
    snap = document.querySelector("#snap"),
    imgData = "";

  snap.addEventListener("click", function() {
    document.getElementById("zhebi").style.display = "flex";
    context.drawImage(video, 0, 0, 640, 480);
    // 获取情绪
    canvas.toBlob(function(blob) {
      $.ajax({
        url:
          "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize",
        beforeSend: function(xhrObj) {
          xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
          xhrObj.setRequestHeader(
            "Ocp-Apim-Subscription-Key",
            "875163198352454c8de4b3dcfee4ff95"
          );
        },
        processData: false,
        type: "POST",
        data: blob
      })
        .done(function(data) {
          document.getElementById("zhebi").style.display = "none";
          if (data.length) {
            var scores = data[0].scores,
              emotionsScores = [],
              trueEmotion = "",
              trueEmotionScore = "";
            // 原API neutral值太高，这里做了一些调整。
            console.log(scores);
            scores.neutral = scores.neutral * 0.02;
            for (var emotion in scores) {
              var number = Number();
              emotionsScores.push(scores[emotion]);
            }
            emotionsScores.sort(function(n1, n2) {
              return n1 - n2;
            });
            trueEmotionScore = emotionsScores[emotionsScores.length - 1];
            for (emotion in scores) {
              if (scores[emotion] == trueEmotionScore) {
                trueEmotion = emotion;
              }
            }
            document.querySelector(
              "#emotion"
            ).textContent = `你的情绪被识别为: ${trueEmotion}`;
          } else {
            alert("Please take photo agian!");
          }

          //情绪对应歌单
          var playList = {
            neutral: "933900516",
            happiness: "56634288",
            anger: "14423685",
            contempt: "14423685",
            disgust: "14423685",
            fear: "313617826",
            sadness: "402924168",
            surprise: "933900516"
          };

          //获取情绪歌单详情
          var emotionPL = playList[trueEmotion];

          $.ajax({
            url: `http://127.0.0.1:3000/playlist/detail?id=${emotionPL}`,
            type: "GET",
            success: function(res) {
              var data = JSON.parse(res);
              var musicList = data.playlist.tracks;
              var randomNumber = Math.random();
              var randomMusicIndex = Math.floor(
                randomNumber * (musicList.length - 1)
              );
              var musicName = musicList[randomMusicIndex].name,
                musicId = musicList[randomMusicIndex].id;
              document.querySelector(
                "#musicname"
              ).textContent = `正在为你播放: ${musicName}`;
              // 获取歌曲url
              $.ajax({
                url: `http://127.0.0.1:3000/music/url?id=${musicId}`,
                type: "GET",
                success: function(res) {
                  var musciURL = res.data[0].url,
                    audioObj = document.querySelector("#audio");
                  console.log(musciURL);
                  audioObj.src = musciURL;
                  audioObj.addEventListener("loadeddata", function(e) {
                    audioObj.play();
                  });
                }
              });
              console.log(musicName, musicId);
            }
          });
        })
        .fail(function(err) {
          alert("Error: " + JSON.stringify(err));
        });
    });
  });
});
