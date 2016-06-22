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
* 清除浮动(带来的影响)
  * 底部插入clear: both;
    * html block水平元素 `<div ...></div>` -> 冗余标签
    * CSS after伪元素 `.clearfix:after{}` -> IE6, 7不支持伪元素 -> zoom: 1
      ```
      .clearfix:after{content: ''; display: block; height: 0; overflow: hidden; clear: both;}
      ```
  * 父元素BFC(gte IE8)或haslayout(IE6, 7)
