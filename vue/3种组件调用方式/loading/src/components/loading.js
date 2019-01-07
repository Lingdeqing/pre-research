import Vue from 'vue';
import Loading from './loading.vue'

const LoadingCreator = Vue.extend(Loading);

function toggleLoading(el, binding){
    el.instance.visible = !!binding.value;
   
    Vue.nextTick(() => {
        if(!el.domInserted){
            el.domInserted = true;
            if(binding.modifiers.fullscreen){
                document.body.appendChild(el.loading);
            } else {
                el.appendChild(el.loading);
            }
        }
        if(binding.value){
            if(binding.modifiers.fullscreen){
                el.originalPosition =  window.getComputedStyle(document.body).position;
                document.body.style.position = 'relative';
            } else {
                el.originalPosition = window.getComputedStyle(el).position;
                el.style.position = 'relative';
            }
        } else {
            if(binding.modifiers.fullscreen){
                document.body.style.position = el.originalPosition;
            } else {
                el.style.position = el.originalPosition;
            }
        }
    })
}


export default{
    install(Vue){
        Vue.directive('loading', {
            bind(el, binding){
                const loading = new LoadingCreator({
                    el: document.createElement('div'),
                    data: {
                        text: el.getAttribute('loading-text'),
                        fullscreen: !!binding.modifiers.fullscreen
                    }
                });
                el.instance = loading;
                el.loading = loading.$el;
                el.instance.visible = !!binding.value;
                el.domInserted = false;

                toggleLoading(el, binding);
            },
            update(el, binding){
                el.instance.setText(el.getAttribute('loading-text'));
                if(binding.oldValue !== binding.value){
                    toggleLoading(el, binding)
                }
            },
            unbind(el, binding){
                if(el.domInserted){
                    if(binding.modifiers.fullscreen){
                        document.body.removeChild(el.loading);
                    } else {
                        el.loading &&
                        el.loading.parentNode &&
                        el.loading.parentNode.removeChild(el.loading);
                    }
                }
            }
        })
    }
}