// 1. 有宽度 有高度
// 居中
convert -size 200x100 xc:none -fill 'red' -pointsize 50 -font 'Fonts/PingFangSC-Semibold.ttf' -gravity center -draw 'text 0,0 "哈哈"'  a.png

// 文字要向上微调文字大小的五分之一，才能贴着顶部，避免行高的影响
// 上左
convert -size 200x100 xc:none -fill 'red' -pointsize 50 -font 'Fonts/PingFangSC-Semibold.ttf' -gravity northWest -draw 'text 0,-10 "哈哈"'  a.png
// 上中 
convert -size 200x100 xc:none -fill 'red' -pointsize 50 -font 'Fonts/PingFangSC-Semibold.ttf' -gravity north -draw 'text 0,-10 "哈哈"'  a.png
// 上右
convert -size 200x100 xc:none -fill 'red' -pointsize 50 -font 'Fonts/PingFangSC-Semibold.ttf' -gravity northEast -draw 'text 0,-10 "哈哈"'  a.png
// 下左
convert -size 200x100 xc:none -fill 'red' -pointsize 50 -font 'Fonts/PingFangSC-Semibold.ttf' -gravity southWest -draw 'text 0,-10 "哈哈"'  a.png
// 下右
convert -size 200x100 xc:none -fill 'red' -pointsize 50 -font 'Fonts/PingFangSC-Semibold.ttf' -gravity southEast -draw 'text 0,-10 "哈哈"'  a.png
// 下中
convert -size 200x100 xc:none -fill 'red' -pointsize 50 -font 'Fonts/PingFangSC-Semibold.ttf' -gravity south -draw 'text 0,-10 "哈哈"'  a.png

// 没宽度就靠左侧
// 没有高度就靠上面



convert -size 200x100 xc:none -fill 'red' -pointsize 50 -font 'Fonts/PingFangSC-Semibold.ttf' -gravity north -draw 'text 0,-10 "哈哈"'  Semibold.png
convert -size 500x500 xc:none -fill 'red' -pointsize 50 -font 'Fonts/PingFangSC-Light.ttf' -gravity north -draw 'text 0,-10 "立即查看"' -font 'Fonts/PingFangSC-Regular.ttf' -draw 'text 0,50 "立即查看"' -font 'Fonts/PingFangSC-Medium.ttf' -draw 'text 0,100 "立即查看"' -font 'Fonts/PingFangSC-Semibold.ttf' -draw 'text 0,150 "立即查看"' -font 'Fonts/PingFangSC-Bold.ttf' -draw 'text 0,200 "立即查看"'  RegularThin.png
convert -size 500x500 xc:none -fill 'red' -pointsize 60 -font 'Fonts/fzlt-bold.ttf' -gravity center -draw 'text 0,-10 "运动户外"' -font 'Fonts/fzlt-thin.ttf' -pointsize 40  -draw 'text 0,50 "立即查看"'  RegularThin.png