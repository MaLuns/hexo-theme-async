---
title: Markdown
date: 2022-09-21 15:25:29
categories: 测试分类
katex: true
---

主题 Hexo-theme-async 文章页面适配预览。
<!--more-->

## Markdown 基础语法 

###  标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

### 字体

粗体、斜体、粗体和斜体，删除线，需要在文字前后加不同的标记符号。如下：

**这个是粗体**

*这个是斜体*

***这个是粗体加斜体***

~~这里想用删除线~~

注：如果想给字体换颜色、字体或者居中显示，需要使用内嵌HTML来实现。

### 无序列表

无序列表的使用，在符号`-`后加空格使用。如下：

- 无序列表 1
- 无序列表 2
- 无序列表 3

多层嵌套效果。如下：

- 无序列表 1
- 无序列表 2
  - 无序列表 2.1
  - 无序列表 2.2
    - 无序列表 2.2.1
    - 无序列表 2.2.2


### 有序列表

有序列表的使用，在数字及符号`.`后加空格后输入内容，如下：

1. 有序列表 1
2. 有序列表 2
3. 有序列表 3

### 引用

引用的格式是在符号`>`后面书写文字。如下：

> 读一本好书，就是在和高尚的人谈话。 ——歌德

> 雇用制度对工人不利，但工人根本无力摆脱这个制度。 ——阮一峰

### 链接

关于 `Hexo-theme-async` 的使用文档可以[点击这里](https://hexo-theme-async.imalun.com)查看

### 图片

插入图片，格式如下：

![这里写图片描述](https://hexo-theme-async.imalun.com/github_star.png)

![](https://markdown.com.cn/images/i-am-svg.svg)

<img src="https://hexo-theme-async.imalun.com/github_star.png" align="left">
<img src="https://hexo-theme-async.imalun.com/github_star.png" align="right">

<div class="row">
  <div class="col-lg-4">
    <img src="https://hexo-theme-async.imalun.com/github_star.png">
  </div>
  <div class="col-lg-4">
    <img src="https://hexo-theme-async.imalun.com/github_star.png">
  </div>
  <div class="col-lg-4">
    <img src="https://hexo-theme-async.imalun.com/github_star.png">
  </div>
</div>

### 分割线

可以在一行中用三个以上的减号来建立一个分隔线，同时需要在分隔线的上面空一行。如下：

---

### 表格

可以使用冒号来定义表格的对齐方式，如下：

| 姓名   | 年龄 |     工作 |
| :----- | :--: | -------: |
| 小可爱 |  18  | 吃可爱多 |
| 小小勇敢 |  20  | 爬棵勇敢树 |
| 小小小机智 |  22  | 看一本机智书 |


## 特殊语法

### 脚注

Here's a sentence with a footnote. [^1]
[^1]: This is the footnote.

### 代码块

如果在一个行内需要引用代码，只要用反引号引起来就好，如下：

Use the `printf()` function.

在需要高亮的代码块的前一行及后一行使用三个反引号，同时**第一行反引号后面表示代码块所使用的语言**，如下：

```java
// FileName: HelloWorld.java
public class HelloWorld {
  // Java 入口程序，程序从此入口
  public static void main(String[] args) {
    System.out.println("Hello,World!"); // 向控制台打印一条语句
  }
}
```

diff 不能同时和其他语言的高亮同时显示，使用效果如下:

```diff
+ 新增项
- 删除项
```

### 数学公式

行内公式使用方法：\\(ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}\\)

块公式使用方法如下：

$$H(D_2) = -\left(\frac{2}{4}\log_2 \frac{2}{4} + \frac{2}{4}\log_2 \frac{2}{4}\right) = 1$$


### 定义列表

First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.

### 任务列表

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

## HTML
### 注音标签

<ruby>喜大普奔<rt>hē hē hē hē</rt></ruby>

``` html
<ruby>喜大普奔<rt>hē hē hē hē</rt></ruby>
```

### details
<details>
  <summary>Async 安装方法</summary>

进入您的 Hexo 博客根目录，执行：

``` bash
npm i hexo-theme-async@latest
```
</details>