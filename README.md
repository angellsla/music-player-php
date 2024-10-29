 使用`` PHP+MySQL ``重构了我的另一个项目
 `` https://github.com/angellsla/music-player ``<br>
----

**创建表**: 
```txt
CREATE TABLE music (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,  
    audio_url VARCHAR(255),  
    singer VARCHAR(255),  
    album VARCHAR(255),  
    cover VARCHAR(255),  
    time VARCHAR(10)  
);
```

**表名称**：`music`

**表数据示例**：

| id | name                  | audio_url                                                   | singer   | album                                         | cover                                                   | time   | list_name  |
|----|-----------------------|--------------------------------------------------------------|----------|-----------------------------------------------|---------------------------------------------------------|--------|---------------|
| 1  | 1番輝く星             | ./audios/不时轻声地以俄语遮羞的邻座艾莉同学/1番輝く星.mp3      | 上坂堇    | 《不时轻声地以俄语遮羞的邻座艾莉同学》         | https://y.qq.com/music/photo_new/..._1.jpg?max_age=...   | 03:55  | 遮羞艾莉    |
| 2  | 另一首歌的标题        | ./audios/另一首歌的音频链接.mp3                              | 另一歌手 | 另一专辑名称                                  | https://y.qq.com/music/photo_new/..._2.jpg?max_age=...   | 04:20  | 列表名，select标签筛选用的|
| ...| ...                   | ...                                                          | ...      | ...                                           | ...                                                     | ...    | ...  |
