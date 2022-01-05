# 上拉加载 下拉刷新

``` vue
<template>
    <div class="load-more" ref="container" @scroll="debounce(scroll(), 200)">
        <div class="load-header">
            <span v-if="refresh">加载中...</span>
            <span v-else>释放刷新</span>
        </div>
        <slot></slot>
        <div class="load-footer">
            <span v-if="loading">加载中...</span>
            <span v-else>没有更多了</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "loadmore",

    props: {
        /*
        * 是否正在加载
        **/
        loading: {
            type: Boolean,
            default: true,
        },
        /**
         * 距离底部多远加载
         */
        distance: {
            type: Number,
            default: 200,
        }
    },

    data() {
        return {
            startY: 0,
            distanceY: 0,
            refresh: false
        }
    },

    mounted() {
        this.setMaxHeight();
        console.log(this.$el);
        this.$el.addEventListener('touchstart', this.touchStart, false);
        this.$el.addEventListener('touchmove', this.touchMove, false);
        this.$el.addEventListener('touchend', this.touchEnd, false);
    },

    methods: {
        setMaxHeight() {
            let offsetTop = this.$refs.container.offsetTop;
            let height = document.documentElement.clientHeight || document.body.clientHeight;
            this.$refs.container.style.maxHeight = (height - offsetTop) + 'px';
        },
        scroll() {
            if(!this.loading) return;
            const scrollHeight = this.$el.scrollHeight;
            const offsetHeight = this.$el.offsetHeight;
            const scrollTop = this.$el.scrollTop;
            if(scrollHeight <= offsetHeight + scrollTop + this.distance) {
                this.load();
            }
        },
        touchStart(e) {
            if (this.refresh) {
                e.preventDefault()
                return
            }
            this.startY = e.targetTouches[0].clientY;
            console.log(this.startY);
        },
        touchMove(e) {
            if(!this.startY){
                return
            }
            if(this.refresh){
                e.preventDefault();
                return;
            }
            if(this.$el.scrollTop === 0){
                this.distanceY = e.targetTouches[0].clientY - this.startY;
                if(this.distanceY > 0){
                    e.preventDefault();
                    if (this.distanceY < 100) {
                        this.$el.style.overflow = 'inherit';
                        this.$el.style.transform = `translateY(${this.distanceY}px)`;
                    }
                }
            }
        },
        touchEnd(e) {
            if (this.distanceY === 0) {
                return
            }
            if (this.refresh) {
                e.preventDefault();
                return
            }
            if (this.distanceY > 0) {
                this.refresh = true;
                this.$el.style.transform = `translateY(${160/75}rem)`;
                setTimeout(() => {
                    this.refresh = false;
                    this.$el.style.transform = 'translateY(0px)';
                    this.$el.style.overflow = 'auto';
                }, 1000);
            }
        },
        load() {
            this.$emit('loadMore');
        },
        debounce(func, delay) {
            let timer;
            return function (...args) {
                if(timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, delay);
            }
        }
    },

    beforeDestroy() {
        this.$el.removeEventListener('touchstart', this.touchStart, false);
        this.$el.removeEventListener('touchmove', this.touchMove, false);
        this.$el.removeEventListener('touchend', this.touchEnd, false);
    }
}
</script>

<style lang="less" scoped>
    .load-header {
        margin-top: -80px;
        width: 100%;
        height: 80px;
        text-align: center;
        font-size: 30px;
        line-height: 80px;
    }
    .load-more {
        transition: all .3s;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        // overflow-scrolling: touch;
    }
    .load-footer {
        font-size: 30px;
        padding: 25px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>
```
