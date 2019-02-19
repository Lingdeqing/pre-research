<template>
    <div class="pagination default">
        <div class="jump">跳转到<input type="text" ref="input" :value="currentPage1" @keydown="setCurrentPage" size="mini"/>页</div>
        <ul class="pages">
            <li :class="{prev: true, disabled: currentPage1 == 1}" @click="prev">往前</li>
            <template v-for="(page) in pages">
                <li v-if="page.no" :key="page.no" @click="setPage(page.no)" :class="{current: page.no == currentPage1}">{{page.no}}</li>
                <li v-else :key="page.key" class="more el-icon el-icon-more"></li>
            </template>
            <li :class="{next: true, disabled: currentPage1 == maxPage}" @click="next">往后</li>
        </ul>
        <div class="total">展示<span class="m5">{{startNo}}</span>到<span class="m5">{{endNo}}</span>条<span class="m5">/</span>共<span class="m5">{{total}}</span>条</div>
        <div class="pageSize">单页展示<el-dropdown trigger="click" @command="setPageSize">
            <span class="select">{{pageSize1}}<span class="icon"></span></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in pageSizes" :key="item" :command="item">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>条
        </div>
    </div>
</template>

<style lang="less" scoped>
.pagination{
    &.default{
        font-size:10px;
        padding: 0 10px;
        height: 54px;
        line-height: 54px;
        color:#666;
        .m5{margin: 0 5px;}
        .total{
            float: left;
            color:#666;
        }
        .pageSize{
            float: left;
            margin-left: 10px;
            .select{
                cursor: pointer;
                display: inline-block;
                border:1px solid #e8ecf0;
                margin: 0 5px;
                border-radius:2px;
                padding: 0 3px;
                height:17px;
                line-height: 17px;
                font-size:10px;
                color: #666;
                .icon{
                    display: inline-block;
                    position: relative;
                    margin-left: 5px;
                    width: 8px;
                    height: 15px;
                    vertical-align: top;
                    &::before, &::after{
                        position: absolute;
                        left: 0;
                        content: "";
                        border: 3px solid transparent;
                    }
                    &::before{
                        top: 5px;
                        border-top: 0;
                        border-bottom-color: #999;
                    }
                    &::after{
                        top: 9px;
                        border-bottom: 0;
                        border-top-color: #999;
                    }
                }
            }
        }
        .pages{
            float: right;
            margin: 0;
            padding: 13px 10px 0 0;
            li{
                cursor: pointer;
                float: left;
                margin:0;
                padding: 0;
                list-style: none;
                width:22px;
                height:26px;
                line-height: 26px;
                border:1px solid #e8ecf0;
                text-align: center;
                & + li{
                    margin-left: -1px;
                }
                &:hover{
                    color: #2cabe3;
                }
                &.current{
                    position: relative;
                    color: #fff;
                    background:#2cabe3;
                    border-color: #2cabe3;
                }
            }
            .prev, .next{
                color:#8d9ea7;
                width:46px;
                height:26px;
                &.disabled{
                    cursor: not-allowed;
                    color: #aaa;
                }
            }
        }
        .jump{
            float: right;
            input{
                margin: 0 5px;
                padding: 0;
                width: 28px;
                height: 26px;
                border:1px solid #e8ecf0;
                padding: 0;
                color: #666;
                font-size: 10px;
                text-align: center;
                transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                &:focus{
                    border-color: #409EFF;
                    outline: none;
                }
            }
        }
        
    }
}
</style>

<script>

/**
 * props
 *      total
 *      current-page.sync
 *      page-size.sync
 */
export default {
    props: {
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        },
        currentPage: {
            type: Number,
            default: 0
        },
        pageSizes: {
            type: Array,
            default(){
                return [
                    10,
                    20,
                    30,
                    40,
                    50,
                    100
                ]
            }
        }
    },
    data(){
        return {
            pageSize1: '',
            currentPage1: '',
        }

    },
    computed: {
        startNo(){
            return (this.currentPage1 - 1) * this.pageSize + 1;
        },
        endNo(){
            return Math.min(this.total, this.currentPage1 * this.pageSize);
        },
        pages(){
            const blockNum = 7;
            const max = Math.ceil(this.total / this.pageSize)
            if(max <= blockNum){
                return Array(max).fill(1).map((item, index) => {
                    return {
                        no: index + 1
                    }
                });
            } else {
                const res = [];
                if(this.currentPage1 < 3){  // 1,2,3,4,5, ... , m
                    for(let no = 1; no <= 5; no ++){
                        res.push({
                            no
                        })
                    }
                    res.push({
                        key: 'more-1'
                    }, {
                        no: max
                    });
                } else if(this.currentPage1 > this.maxPage - 2){    // 1, ..., m-4, m-3, m-2, m-1, m
                    res.push({
                        no: 1
                    }, {
                        key: 'more-1'
                    });
                    for(let no = max - 4; no <= max; no ++){
                        res.push({
                            no
                        })
                    }

                } else {    // 1, ... , c-1, c, c+1, ... , m
                    res.push({
                        no: 1
                    }, {
                        key: 'more-1'
                    });
                    for(let no = this.currentPage1 - 1; no <= this.currentPage1 + 1; no ++){
                        res.push({
                            no
                        })
                    }
                    res.push( {
                        key: 'more-2'
                    }, {
                        no: max
                    });
                }
                return res;
            }
        },
        maxPage(){
            return Math.ceil(this.total / this.pageSize1);
        }
    },
    watch: {
        pageSize: {
            immediate: true,
            handler(){
                if(this.pageSize1 != this.pageSize){
                    this.pageSize1 = this.pageSize;
                }
            }
        },
        currentPage: {
            immediate: true,
            handler(){
                this.setPage(this.currentPage + 1);
            }
        },
        pageSize1(){
            this.currentPage1 = Math.floor(this.startNo / this.pageSize1) + 1;
            this.$emit('update:pageSize', this.pageSize1);
        }
    },
    methods: {
        setPageSize(pageSize){
            this.pageSize1 = pageSize;
        },
        setPage(currentPage){
            if(currentPage == this.currentPage1) return;

            const min = 1, max = this.maxPage;
            if(currentPage < min) currentPage = min;
            if(currentPage > max) currentPage = max;

            this.currentPage1 = currentPage;
            
            this.$emit('update:currentPage', this.currentPage1 - 1);
        },
        setCurrentPage(e){
            // Allow: backspace, delete, tab, escape, enter and .
            if ([46, 8, 9, 27, 110, 190].includes(e.keyCode) ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                    // let it happen, don't do anything
                    return;
            }

            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
            
            // 回车更新
            if(e.keyCode == 13){
                this.setPage(e.target.value * 1);
                e.target.value = this.currentPage1;
            }
        },
        prev(){
            if(this.currentPage1 == 1) return;
            this.setPage(this.currentPage1 - 1);
        },
        next(){
            if(this.currentPage1 == this.maxPage) return;
            this.setPage(this.currentPage1 + 1);
        }
    }
}
</script>

