
const baseFontSize = 36;
module.exports = {
    install: function(less, pluginManager, functions) {
        functions.add('p2r', function(name, ...values) {
            let result = [];
            function tranform(nodes){
                if(nodes){
                    nodes.forEach((node) => {
                        const {value} = node;
                        if(Array.isArray(value)){
                            tranform(value);
                        } else {
                            let res = value;
                            if(value === 'rgba'){
                                res += `(${node.rgb.join(',')},${node.alpha || 1})`
                            } else if(!isNaN(value)){
                                if(node.unit){
                                    if(node.unit.backupUnit == 'px'){
                                        res = `${(value/baseFontSize)}rem`;
                                    } else {
                                        res += node.unit.backupUnit;
                                    }
                                }
                            }
                            result.push(res);
                        }
                    })
                }
            }

            tranform(values);
            return `${name.value}: ${result.join(' ')};`;
        });
    }
};