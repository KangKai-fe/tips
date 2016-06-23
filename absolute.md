## 深入理解absolute

* 同float, 有包裹性(将元素转换为内联块元素)和破坏性

* 不受relative限制的absolute定位(无依赖绝对定位): 不使用top/ right/ bottom/ left任何一个值, 或使用auto作为值 -> 当父级`overflow:hidden;`时, 同时用margin定位, 该元素不会隐藏
    * 脱离文档流
    * 去浮动: `float: left;` 和`position: absolute`同时存在的时候, float无效
    * 跟随性: 使用前在哪儿, 使用后还在那儿
    ```
    // 居中以及边缘对齐定位
    <!-- html -->
    <div class="course-content">
        <div class="course-list-x">
        </div>
        <div class="course-loading-x">
        	&nbsp;<img src="http://img.mukewang.com/5453077400015bba00010001.gif" class="course-loading" alt="加载中...">
        </div>
        <div class="course-fixed-x">
        	&nbsp;<div class="course-fixed">
                <a href="javascript:;" class="goto_top_diaocha">调查</a>
                <a href="javascript:;" class="goto_top_app">返回</a>
                <a href="javascript:;" class="goto_top_feed">反馈</a>
            </div>
        </div>
    </div>
    <!-- css -->
    a {text-decoration: none; color: #a10;}
    .course-content { float: right; position: relative; width: 920px; min-height: 1200px; background: #fff; }
    .course-list-x { padding: 20px 10px; overflow: hidden; }
    .course-list { float: left; width: 280px; height: 240px; margin: 5px 10px 15px; border-radius: 0 0 1px 1px; background-color: #F7FAF9; background-color: rgba(255,255,255,1); box-shadow: 0 1px 2px #c5c5c5; text-decoration: none; }
    .goto_top_diaocha, .goto_top_app, .goto_top_feed { display: block; width: 48px; height: 48px; margin-top: 10px; background: #ccc; border-radius: 50%; text-align: center; line-height: 48px;}
    .course-loading-x { height: 0; margin-top: 20px; text-align: center; letter-spacing: -.25em; overflow: hidden; }
    .course-loading { position: absolute; margin-left: -26px; }
    .course-fixed-x { height: 0; text-align: right; overflow: hidden; }
    .course-fixed { display: inline; position: fixed; margin-left: 20px; bottom: 100px; }   
    ```
    
    * 无依赖绝对定位应用: "*号对齐", 小图标对齐, 文字溢出
    ```
    position: absolute; 后不会占据真实尺寸, 文字就可以对齐
    然后再用margin-left: -npx; 定位星号或icon
    文字溢出后不换行: 同样用position: absolute; 不占据真实尺寸, 可以突破总画面宽度限制
    <!-- html -->
    <span><i class="icon"></i>some text</span>
    ```
    * 在IE7下用`position:absolute;`时，元素会成为`inline-block` -> 在外层套div解决这个bug
    * 回流与重绘: Tip: 动画尽量作用在绝对定位元素上
    * z-index无依赖
        * 如果只有一个绝对定位元素, 自然不需要z-index, 自动覆盖普通元素
        * 如果两个绝对定位, 控制DOM流的前后顺序达到需要的覆盖效果, 依然无z-index
        * 如果多个绝对定位交错, 非常非常少见, z-index: 1 控制
        * 如果非弹框类的绝对定位元素z-index > 2, 必定z-index冗余, 需要优化
