/**
 * Created by kingsoft on 2017/6/22.
 *
 * // 花色 huase  1 , 2, 3, 4
 var array = [
 {
 value: 9,
 huase: 1
 },
 {
 value: 8,
 huase: 1
 },
 {
 value: 7,
 huase: 1
 },
 {
 value: 6,
 huase: 1
 },
 {
 value: 10,
 huase: 1
 },
 ]

 */
class Ai {
    constructor(array){
        this.array = array.sort(this.paiSort);;
    }
    // 工具函数 begain
    paiSort(a, b){
        return a.value - b.value
    }
    indexOfArray(obj, array){
        array = array || []
        for(let i=0; i<array.length; i++){
            if(obj.value == array[i].value){
                return i;
            }
        }
    }
    isObjInArray(obj, array){
        let isInArray = false;
        array = array || []
        for(let i=0; i<array.length; i++){
            if(obj.value == array[i].value){
                isInArray = true;
            }
        }
        return isInArray;
    }
    changeArray(array){
        let newArray = []
        for(let i=0; i<array.length; i++){
            if(this.isObjInArray(array[i], newArray)){
                let index = this.indexOfArray(array[i], newArray)
                let newObj = newArray[index]
                newArray[index].count = newArray[index].count+1
            }else{
                let newObj = {}
                newObj.count = 1;
                newObj.value = array[i].value;
                newArray.push(newObj)
            }
        }
        return newArray;
    }
    //工具函数 end

    //是否组成 同花顺 2,3,4,5,6
    isTonghuashun(){
        let new_array = this.array
        if(new_array.length<5) return false;

        let isShunzi = this.isShunzi()
        let isTonghua = this.isTonghua()
        if(isShunzi && isTonghua){
            return true;
        }else{
            return false;
        }
    }

    //是否组成 顺子  2,3,4,5,6
    isShunzi(){
        let new_array = this.array
        let isShunzi = true;
        if(new_array.length<5){
            isShunzi = false;
            return isShunzi;
        }
        for(let i=0; i<new_array.length-1; i++){
            if (new_array[i].value != new_array[i+1].value-1){
                isShunzi = false;
            }
        }
        return isShunzi;
    }

    //是否组成 同花  2,2,2,2,2
    isTonghua(){
        let isTonghua = true;
        let new_array = this.array
        for(let i=0; i<new_array.length-1; i++){
            if (new_array[i].huase != new_array[i+1].huase){
                isTonghua = false;
            }
        }
        return isTonghua;
    }

    //是否组成 4条  2,2,2,2,6
    isSitiao(){
        let new_array = this.array
        for(let i=0;i<new_array.length-3;i++){
            if (new_array[i].value==new_array[i+1].value && new_array[i+1].value==new_array[i+2].value && new_array[i+2].value==new_array[i+3].value){
                return true;
            }
        }
        return false;
    }

    //是否组成 三条一对 2,2,2,8,8
    isSantiaoYidui(){
        let isSitiao = this.isSitiao()
        if(isSitiao || this.array.length<5){
            return false;
        }
        let new_array = this.array
        let _array = this.changeArray(new_array)
        let condition = 0;
        for(let i=0; i<_array.length; i++){
            if(_array[i].count == 2 || _array[i].count == 3){
                condition++;
            }
        }
        if(condition==2 && this.isSantiao()){
            return true;
        }
        return false;
    }

    //是否组成 两对 2,2,10,8,8
    isLiangdui(){
        let isSitiao = this.isSitiao()
        let isSantiao = this.isSantiao();
        if(isSitiao || isSantiao || this.array.length<5){
            return false;
        }
        let new_array = this.array
        let _array = this.changeArray(new_array)
        let condition = 0;
        for(let i=0; i<_array.length; i++){
            if(_array[i].count == 2){
                condition++;
            }
        }
        if(condition==2 && this.isDuizi()){
            return true;
        }
        return false;
    }

    //是否组成 三条 2,2,2,8,9
    isSantiao(){
        let isSitiao = this.isSitiao();
        if(isSitiao || this.array.length<5) return false;

        let new_array = this.array.sort(this.paiSort);
        for(let i=0;i<new_array.length-2;i++){
            if (new_array[i].value==new_array[i+1].value && new_array[i+1].value==new_array[i+2].value){
                return true;
            }
        }
        return false;
    }

    //是否组成 对子  2,2 ,3,5,6
    isDuizi(){
        let new_array = this.array
        let isSitiao = this.isSitiao();
        let isSantiao = this.isSantiao();
        if(isSitiao || isSantiao || this.array.length<5) return false;
        for(let i=0;i<new_array.length-1;i++){
            if (new_array[i].value==new_array[i+1].value){
                return true;
            }
        }
        return false;
    }

    //是否组成 零牌  2,8 ,3,5,6
    isLingpai(){
        let new_array = this.array
        let isShunzi = this.isShunzi()
        let isTonghua = this.isTonghua()
        if(isShunzi || isTonghua) return false;
        let isLingpai = true;
        for(let i=0; i<new_array.length-1; i++){
            if(new_array[i].value == new_array[i+1].value){
                isLingpai = false;
            }
        }
        return isLingpai;
    }

    //

}

