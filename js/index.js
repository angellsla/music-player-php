// 保存音乐列表信息
var musicList = [];
// 声明变量，保存当前播放的是哪一首歌曲
var currentIndex = 0;

// 加载音乐列表信息
function loadMusicList(listName) {
  $.ajax({
    type: "GET",
    url: "loadMusic.php?listName=" + encodeURIComponent(listName),
    dataType: "json",
    success: function(data) {
      musicList = data;
      if (musicList.length > 0) {
        currentIndex = 0;
        render(musicList[currentIndex]);
        renderMusicList(musicList);
        $("audio").get(0).load(); // 加载音频
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Error loading the music list: " + textStatus + ", " + errorThrown);
    }
  });
}

// 填充 select 元素
function populateMusicSelect() {
  var select = $('#musicSelect');
  select.empty(); // 清空现有选项
  select.append($('<option></option>').val('default').html('默认'));
  // 其他列表选项可以在这里添加
  select.val('default'); // 默认选择第一个列表
}

// 给 select 元素绑定 change 事件
$('#musicSelect').on('change', function() {
  var selectedListName = $(this).val();
  loadMusicList(selectedListName); // 根据选择的列表名称加载音乐列表
});

// 页面加载完成后，填充 select 元素并加载默认音乐列表
$(document).ready(function() {
  populateMusicSelect();
  loadMusicList('default'); // 默认加载全部音乐列表
});

// 根据信息，设置页面对应标签中的内容
function render(data) {
  $(".name").text(data.name);
  $(".singer-album").text(`${data.singer} - ${data.album}`);
  $(".time").text(data.time);
  $(".cover img").attr("src", data.cover);
  $("audio").attr("src", data.audio_url);
  $(".mask_bg").css({
    background: `url("${data.cover}") no-repeat center center`
  });
  $("audio").get(0).load(); // 重置音频元素
}

// 根据音乐列表数据，创建li
function renderMusicList(list) {
  $(".music-list").empty();
  list.forEach(function(item, index) {
    var $li = $("<li>")
      .addClass(index === currentIndex ? "playing" : "")
      .append($("<span>").text(`${index + 1}. ${item.name} - ${item.singer}`))
      .append($("<span>")
        .addClass("fa")
        .addClass(index === currentIndex && $("audio").get(0).paused ? "fa-pause-circle" : "fa-play-circle")
        .attr("data-index", index)
        .attr("aria-hidden", true));
    $(".music-list").append($li);
  });
}

// 格式化时间
function formatTime(time) {
  var min = parseInt(time / 60, 10);
  var sec = parseInt(time % 60, 10);
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  return `${min}:${sec}`;
}

// 监听audio标签的 timeupdate 事件
$("audio").on("timeupdate", function () {
  var audio = $("audio").get(0);
  var currentTime = audio.currentTime || 0;
  var duration = audio.duration || 0;
  $(".current-time").text(formatTime(currentTime));
  var value = (currentTime / duration) * 100;
  $(".music_progress_line").css({
    width: value + "%"
  });
});

// 监听音乐播放完毕的事件
$("audio").on("ended", function () {
  $("#playBtn").removeClass("fa-pause").addClass("fa-play");
  $(".cover").css({
    "animation-play-state": "paused"
  });
  if (currentIndex < musicList.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  render(musicList[currentIndex]);
  $("#playBtn").trigger("click");
});

// 通过事件委托给音乐列表的播放按钮绑定点击事件
$(".music-list").on("click", ".play-circle", function () {
  var index = $(this).attr("data-index");
  currentIndex = parseInt(index, 10);
  render(musicList[currentIndex]);
  $("#playBtn").trigger("click");
});

// 给播放按钮绑定点击事件
$("#playBtn").on("click", function () {
  var audio = $("audio").get(0);
  if (audio.paused) {
    $(this).removeClass("fa-play").addClass("fa-pause");
    $(".player-info").animate({
      top: "-120%",
      opacity: 1
    }, "slow");
    $(".cover").css({
      "animation-play-state": "running"
    });
    audio.play();
  } else {
    $(this).removeClass("fa-pause").addClass("fa-play");
    $(".player-info").animate({
      top: "0%",
      opacity: 0
    }, "slow");
    $(".cover").css({
      "animation-play-state": "paused"
    });
    audio.pause();
  }
});

// 给上一首按钮绑定点击事件
$("#prevBtn").on("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = musicList.length - 1;
  }
  render(musicList[currentIndex]);
  $("#playBtn").trigger("click");
});

// 给下一首按钮绑定点击事件
$("#nextBtn").on("click", function () {
  if (currentIndex < musicList.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  render(musicList[currentIndex]);
  $("#playBtn").trigger("click");
});

// 监听音量控制滑块变化
document.addEventListener('DOMContentLoaded', function() {
  var audioPlayer = document.getElementById('audio');
  var volumeControl = document.getElementById('volumeControl');
  audioPlayer.volume = volumeControl.value; // 设置初始音量
  volumeControl.addEventListener('input', function() {
    audioPlayer.volume = this.value; // 监听滑条变化事件
  });
});