实现思路：

添加标签底层盒子，再直接暴力添加10个气泡标签

<div class="kuang">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
    </div>

添加底层盒子样式，宽高等

.kuang{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -10;
            background-image: linear-gradient(180deg,rgb(78, 168, 241),rgb(37, 91, 241));

    }

添加气泡的样式：

.bubble{
            position: absolute;
            border-radius: 50%;
            border: 2px solid #fff;
            box-shadow: inset 0 0 8px  #fff;
            animation: flutter 10s infinite;
            opacity: 0;
        }

定义动画

 @keyframes flutter {
            0%{
                transform: translateX(0);
                bottom: -100px;
                opacity: 1;
            }
            50%{
                transform: translateX(100px);
                opacity: 0.5;
            }

    100%{
                transform: translateX(0px);
                bottom: 100%;
                opacity: 0;

    }
        }

为每个气泡定义宽高，定位的位置等

 .bubble:nth-child(1){
            left: -10%;
            width: 50px;
            height: 50px;
            animation-duration: 9s;
            animation-delay: 0.1s;
        }
