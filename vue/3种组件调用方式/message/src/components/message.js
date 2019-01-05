import Vue from 'vue';
import Message from './message.vue';

const MessageCreator = Vue.extend(Message);
function $message(message){
    const instance = new MessageCreator({
        data: {
            message
        }
    });

    const vm = instance.$mount();
    const dom = vm.$el;
    document.body.appendChild(dom);
}
export default {
    install(Vue){
        Vue.prototype.$message = $message;
    }
}
