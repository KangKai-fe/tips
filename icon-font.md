## icon font的使用


* 字体的定制和下载:
    * [http://www.iconfont.cn/](http://www.iconfont.cn/)
    * [https://icomoon.io/](https://icomoon.io/)

* 法一: 将字体编号写入html中

    * 引入@font-face
    
        ```
        @font-face {font-family: 'iconfont';
            src: url('iconfont.eot'); /* IE9 */
            src: url('iconfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
            url('iconfont.woff') format('woff'), /* chrome、firefox */
            url('iconfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
            url('iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
        }
        ```
    * 设置iconfont类的样式
    
        ```
        .iconfont{
            font-family:"iconfont" !important;
            font-size:16px;
            font-style:normal;
            font-weight:normal;
            -webkit-font-smoothing: antialiased; // 抗锯齿
            -moz-osx-font-smoothing: grayscale;
            -webkit-text-stroke-width: 0.2px; // 设置文字的描边厚度
        }
        .icon-name{
            font-size: ;
            color: ;
            ...
        }
        ```
    * 插入dom结构
    
        ```
        <i class="iconfont icon-name">&#x3459;</i> -> 16进制编码
        ```
* 法二: 用:before伪元素, 在css中引入(gt IE7)
        ```
        .icon-name:before{
            content: "\3459";  // 输入\转义十六进制编码
        }
        其他同上
        ```
