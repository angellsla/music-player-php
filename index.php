<!DOCTYPE html>
<html lang="zh_cn">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Music-Player</title>
    <link rel="stylesheet" href="./css/font-awesome.min.css" />
    <link rel="stylesheet" href="./css/index.css" />
</head>
<body>
    <!-- 音乐播放器 -->
    <div class="player-warp">
        <!-- 歌曲信息卡片 -->
        <div class="player-info">
            <div class="info">
                <div class="name">CHE.R.RY</div>
                <div class="singer-album">上坂堇</div>
                <!-- 进度条 -->
                <div class="music_progress">
                    <div class="music_progress_top">
                        <span class="current-time">00:00</span>
                        <span class="time">03:29</span>
                    </div>
                    <div class="music_progress_bar">
                        <div class="music_progress_line"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="player-control">
            <div class="cover">
                <img src="" alt="cover" />
            </div>
            <div class="control">
                <i id="prevBtn" class="fa fa-step-backward"></i>
                <i id="playBtn" class="fa fa-play"></i>
                <i id="nextBtn" class="fa fa-step-forward"></i>
                <i id="openModal" class="fa fa-reorder"></i>
            </div>
        </div>
    </div>

    <div class="mask_bg"></div>

    <!-- 模态框 -->
    <div class="modal">
        <div class="modal-box">
            <div class="modal-box-top">
                <div class="modal-title">音乐列表</div>
                <div class="modal-close">
                    <i class="fa fa-remove"></i>
                </div>
            </div>
            
            <div class="list-select">
                <label for="musicSelect">当前列表 </label>
                <select id="musicSelect">
                    <!-- 动态填充列表信息 -->
                </select>
                <!-- audio音量控制 -->
                <div class="volume-controls">
                    <span class="fa fa-volume-up volume"></span>
                    <input type="range" id="volumeControl" min="0" max="1" step="0.01" value="0.3">
                </div>
            </div>

            <div class="modal-wrapper">
                <ul class="music-list">
                    <!-- 动态填充音乐列表 -->
                </ul>
            </div>
        </div>
    </div>

    <audio id="audio" src=""></audio>

    <script src="./js/jquery.js"></script>
    <script src="./js/index.js"></script>
</body>
</html>