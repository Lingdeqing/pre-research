# 创建画布
rm a.png

magick convert -size 174x93 xc:none a.png


# 绘制第一个节点 - 图片
# 图片背景盒子 画上画布
magick convert a.png -fill "rgba(0,0,0,0)"  -draw 'path "M 6 0 H 168 Q 174 0 174 6 V 87 Q 174 93 168 93 H 6 Q 0 93 0 87 V 6 Q 0 0 6 0 Z"'  a.png
# 裁圆角 注意此处 fill 不能为白色或者不设置，不知道为啥 画到临时画布
magick convert -size 174x93 xc:none -fill green -draw 'path "M 6 0 H 168 Q 174 0 174 6 V 87 Q 174 93 168 93 H 6 Q 0 93 0 87 V 6 Q 0 0 6 0 Z"' \( -resize 174x93 temp/bg.png -geometry 174x93+0+0  \) -compose SrcIn -composite t.png
# 裁过圆角的图片本身 画上画布
magick convert -fill green -draw 'image SrcOver 0,0 174,93 t.png' a.png a.png


# 绘制第二个节点 - 文字
# 文字背景 画上画布
# 无
# 文字本身 画上画布
magick convert -fill '#E15D5D' -pointsize 15 -font 'fonts/PingFangSC-Semibold.ttf' -draw 'text 9,33 "运动户外"' a.png a.png

# 绘制第三个节点 - 文字
# 文字背景 画上画布
# 无
# 文字本身 画上画布
magick convert -fill '#E15D5D' -pointsize 11 -font 'fonts/PingFangSC-Semibold.ttf' -draw 'text 9,50 "满减满折任意选"' a.png a.png


# 绘制第四个节点 - 文字
# 文字背景 画到临时画布
magick convert -size 60x18 xc:none -fill '#E15D5D' -draw 'path "M 9 0 H 51 Q 60 0 60 9 V 9 Q 60 18 51 18 H 9 Q 0 18 0 9 V 9 Q 0 0 9 0 Z"' t3.png
# 文字绘制文字背景上
magick convert -fill '#ffffff' -pointsize 10 -font 'fonts/PingFangSC-Semibold.ttf' -gravity center -draw 'text 0,0 "查看详情"' t3.png t3.png
# 全部 画上画布
magick convert -fill green -draw 'image SrcOver 9,57 60,18 t3.png' a.png a.png

# 绘制第五个节点 - 图片
# 裁圆角 注意此处 fill 不能为白色或者不设置，不知道为啥
magick convert -size 87x87 xc:none -fill green -draw 'path "M 0 0 H 87 V 87 H 0 Z"' \( -resize 87x87 temp/goods.png -geometry 87x87+0+0  \) -compose SrcIn -composite t2.png
# 图片盒子 画上画布
magick convert a.png -fill "rgba(0,0,0,0)"  -draw 'path "M 0 0 H 87 V 87 H 0 Z"'  a.png
# 裁过圆角的图片本身 画上画布
magick convert -fill green -draw 'image SrcOver 87,3 87,87 t2.png' a.png a.png



