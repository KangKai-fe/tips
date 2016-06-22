## 深入理解float

* 初衷: 实现图片的文字环绕效果
* 包裹性:
    * display: inline-block/ table-cell/ ...
    * position: absolute/ fixed/ static
    * overflow: hidden/ scroll
* 破坏性: 父容器被破坏 - 父容器高度塌陷
    * display: none
    * position: absolute/ fixed/ static
* BFC(Block formatting context): "块级格式化上下文" 
    * BFC/haslayout通常声明:
    * float: left/ right
    * position: absolute/ fixed
    * overflow: hidden/ scroll (IE7+)
    * display: inline-block/ table-cell (IE8+)
    * width/ height/ zoom: 1/ ... (IE6, 7)
* 清除浮动(带来的影响) - 父元素BFC(gte IE8)或haslayout(IE6, 7)
    * 底部插入clear: both;
    * html block水平元素 `<div ...></div>` -> 冗余标签
    * CSS after伪元素 `.clearfix:after{}` -> IE6, 7不支持伪元素 -> zoom: 1
    ```
    .clearfix:after{
        content: '';
        display: block;
        height: 0;
        overflow: hidden;
        clear: both;
    }
    /* 
    .clearfix:after{
        content: '';
        display: table;
        clear: both;
    }    
    */
    .clearfix{
        *zoom: 1;
    }
    ```
* 元素block块状化; 破坏性造成的紧密排列(去空格化);
* IE6bug
    * 浮动双倍边距
    * 跟随浮动元素3px
    * 浮动元素后面的斜体元素会有下沉的bug
* IE7
    * 含clear的浮动元素包裹不正确的问题
    * 浮动元素倒数2个莫名垂直间距问题（超过3个浮动元素）
        ```
        <style type="text/css">
            html, body {
                background: #fff;
                color: #333;
            }
            
            div {
                width: 100px;
            }
            
            p {
                margin-right: 1px;
            }
            
            span {
                border: 1px solid #aaa;
                float: left;
                width: 120px;
                padding: 5px;
            }
        </style>
        
        
            <div>
                <p>
                    <span>A</span>
                    <span>B</span>
                    <span>C</span>
                    <span>D</span>
                </p>
            </div>
        ```
    * 浮动元素最后一个字符重复问题
    ```
    <style type="text/css">
    html, body {
        background: #fff;
        color: #333;
    }
    
    div {
        width: 100px;
    }
    
    p {
        margin-right: 1px;
    }
    
    span {
        float: left;
        width: 120px;
    }
    </style>
    
    <div>
        <p>
            <span>A</span>
            <span>B</span>
            <span>C</span>
        </p>
    </div>
    ```
    
    * 浮动元素楼梯排列问题
    * 浮动元素和文本不在同一行的问题
        ```
        <div>
            内容
            <span>右浮动内容</span>
        </div>
        
        -> 为"内容"添加span标签, 然后左浮动, 右浮动内容右浮动
        -> 或者将右浮动内容放到前边
        ```
