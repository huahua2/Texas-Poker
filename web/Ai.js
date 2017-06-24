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
class Record {
    // ['aaa', 'bbb', 'ccc']
    constructor(userNameArray){
        let obj = {};
        this.scarys = [];
        for(let i=0; i<userNameArray; i++){
            obj.userName = userNameArray[i]
            obj.scaryCount = 0;
            this.scarys.push(obj)
        }

    }
    recordScary(usrName){
        for(let i=0; i<this.scarys.length; i++){
            if(usrName == this.scarys[i].userName){
                this.scarys[i].scaryCount = (this.scarys[i].scaryCount + 1);
            }
        }
    }
}
var record = new Record(['aaa', 'bbb', 'ccc'])
class Ai {
    constructor(array){
        this.diPai = []
        this.fanPai = []
        this.zhuanPai = []
        this.hePai = []
        this.chuPai = []
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
    //底牌转化Ai
    stardTrueToAiArray(array){
        let aiArray = []
        for(let i=0; i<array.length; i++){
            let obj = {}
            let _value = array[i] % 13
            obj.value = (_value == 0) ? 13: _value;
            obj.huase = parseInt((array[i]-1) / 13) + 1;
            aiArray.push(obj)
        }
        //console.log(aiArray)
        return aiArray;
    }

    // Ai 转化成 标准版
    aiArraytureToStard(array){
        let _array = []
        for(let i=0; i<array.length; i++){
            let _value = array[i].value;
            let _huase = array[i].huase;
            let tureValue = _value + (_huase-1)*13
            _array.push(tureValue)
        }
        //console.log(_array)
        return _array;
    }

    //数组减去 数组 array1 中去掉 array2 的值
    subtractArray(array1 , array2){
        let newArray = array1
        for(let i=0; i<array1.length; i++){
            for(let j =0; j<array2.length; j++){
                if(array1[i] == array2[j]){
                    newArray.splice(i,1)
                }
            }
        }
        return newArray;
    }
    //工具函数 end
    
    //数据函数 begain

    //初始化数据 ( 底牌数据 )
    initDiPai(array){
        this.diPai = this.stardTrueToAiArray(array)
    }
    //初始化数据 ( 翻牌数据 )
    initFanPai(array){
        this.fanPai = this.stardTrueToAiArray(array)
    }
    //初始化数据 ( 转牌数据 )
    initZhuanPai(array){
        this.zhuanPai = this.stardTrueToAiArray(array)
    }
    //初始化数据 ( 河牌数据 )
    initHePai(array){
        this.hePai = this.stardTrueToAiArray(array)
    }
    //初始化出牌 (出牌数据 )
    initChuPai(){
        this.chuPai = this.getChuPai()
    }
    getDiPai(){
        return [5, 6]
    }
    getFanPai(){
        return [19, 8, 9]
    }
    getZhuanPai(){
        return [18]
    }
    getHePai(){
        return [7]
    }
    getUserName(){
        return 'aaa'
    }
    getChuPai(){
        //TODO
        return [1,2,3]
    }
    //数据函数 end

    //是否组成 同花顺 2,3,4,5,6
    isTonghuashun(array){
        array = array.sort(this.paiSort)
        let new_array = array
        if(new_array.length<5) return false;

        let isShunzi = this.isShunzi(array)
        let isTonghua = this.isTonghua(array)
        if(isShunzi && isTonghua){
            return true;
        }else{
            return false;
        }
    }

    //是否组成 顺子  2,3,4,5,6
    isShunzi(array){
        array = array.sort(this.paiSort)
        let new_array = array
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
    isTonghua(array){
        array = array.sort(this.paiSort)
        let isTonghua = true;
        let new_array = array
        for(let i=0; i<new_array.length-1; i++){
            if (new_array[i].huase != new_array[i+1].huase){
                isTonghua = false;
            }
        }
        return isTonghua;
    }

    //是否组成 4条  2,2,2,2,6
    isSitiao(array){
        if(array.length < 4) return false;
        array = array.sort(this.paiSort)
        let new_array = array
        for(let i=0;i<new_array.length-3;i++){
            if (new_array[i].value==new_array[i+1].value && new_array[i+1].value==new_array[i+2].value && new_array[i+2].value==new_array[i+3].value){
                return true;
            }
        }
        return false;
    }

    //是否组成 三条一对 2,2,2,8,8
    isSantiaoYidui(array){
        if(array.length < 5) return false;

        array = array.sort(this.paiSort)
        let isSitiao = this.isSitiao(array)
        if(!isSitiao){
            return false;
        }
        let new_array = array
        let _array = this.changeArray(new_array)
        let condition = 0;
        for(let i=0; i<_array.length; i++){
            if(_array[i].count == 2 || _array[i].count == 3){
                condition++;
            }
        }
        if(condition==2 && this.isSantiao(array)){
            return true;
        }
        return false;
    }

    //是否组成 两对 2,2,10,8,8
    isLiangdui(array){
        array = array.sort(this.paiSort)
        let isSitiao = this.isSitiao(array)
        let isSantiao = this.isSantiao(array);
        if(isSitiao || isSantiao || array.length<5){
            return false;
        }
        let new_array = array
        let _array = this.changeArray(new_array)
        let condition = 0;
        for(let i=0; i<_array.length; i++){
            if(_array[i].count == 2){
                condition++;
            }
        }
        if(condition==2 && this.isDuizi(array)){
            return true;
        }
        return false;
    }

    //是否组成 三条 2,2,2,8,9
    isSantiao(array){
        array = array.sort(this.paiSort)
        let isSitiao = this.isSitiao(array);
        if(isSitiao || array.length<3) return false;

        let new_array = array
        for(let i=0;i<new_array.length-2;i++){
            if (new_array[i].value==new_array[i+1].value && new_array[i+1].value==new_array[i+2].value){
                return true;
            }
        }
        return false;
    }

    //是否组成 对子  2,2 ,3,5,6
    isDuizi(array){
        array = array.sort(this.paiSort)
        let new_array = array
        let isSitiao = this.isSitiao(array);
        let isSantiao = this.isSantiao(array);
        if(isSitiao || isSantiao || array.length<2) return false;
        for(let i=0;i<new_array.length-1;i++){
            if (new_array[i].value==new_array[i+1].value){
                return true;
            }
        }
        return false;
    }

    //是否是两同花顺子   10 11
    isLiangTonghuaShunzi(array){
        array = array.sort(this.paiSort)
        let isTonghua = true;
        let isLiangShunzi = true;
        let newArray = array
        if(array.length<2) return false;
        // 两同花
        if (array[0].huase != array[1].huase){
            isTonghua = false;
        }
        // 两顺子  5, 9  是顺子    5，6，6，8，9
        if( (array[0].value + 4) > array[1].value){
            isLiangShunzi = false;
        }
        if(isTonghua && isLiangShunzi){
            return true;
        }else{
            return false;
        }
    }

    //是否是两同花   4 1  11 1
    isLiangTonghua(array){
        array = array.sort(this.paiSort)
        let isTonghua = true;
        if(array.length<2) return false;
        // 两同花
        if (array[0].huase != array[1].huase){
            isTonghua = false;
        }
        return isTonghua;
    }

    //是否是两顺子   5  9
    isLiangShunzi(array){
        array = array.sort(this.paiSort)
        let isLiangShunzi = true;
        if(array.length<2) return false;
        // 两顺子  5, 9  是顺子    5，6，6，8，9
        if( (array[0].value + 4) > array[1].value){
            isLiangShunzi = false;
        }
        return isLiangShunzi;
    }

    //是否组成 大对子(>=10的)  10,10 ,3,5,6
    duiziValue(array){
        array = array.sort(this.paiSort)
        let new_array = array
        if(this.array.length<2) return false;
        for(let i=0;i<new_array.length-1;i++){
            if (new_array[i].value == new_array[i+1].value){
                return new_array[i].value;
            }
        }
        return 2;
    }

    //得到5个组合牌的大小级别 9个组合 + -1
    getPaiLevel(array){
        let level = -1;
        if(this.isTonghuashun(array)){
            level = 200
        }else if(this.isSitiao(array)){
            level = 190
        }else if(this.isSantiaoYidui(array)){
            level = 180
        }else if(this.isTonghua(array)){
            level = 170
        }else if(this.isShunzi(array)){
            level = 160
        }else if(this.isSantiao(array)){
            level = 150
        }else if(this.isSantiaoYidui(array)){
            level = 140
        }else if(this.isLiangdui(array)){
            level = 130
        }else if(this.isDuizi(array)){
            level = 120
        }else if(this.isLingpai(array)){
            level = this.getMaxLingpai(array)
        }
        return level;
    }
    //比较最大的牌
    getMaxPaiZuHe(array){
        let level = []
        for(let i=0; i<array.length; i++){
            level[i] = this.getPaiLevel(array[i]);
        }
        //取出最小的 level

        let maxLevel = -1;
        for(let j=0; j<level.length; j++){
            if(level[j] >= maxLevel){
                maxLevel = level[j]
            }
        }
        let max_index = level.indexOf(maxLevel)
        let new_array = array.splice(max_index, 1);
        return new_array[0]
    }
    //转牌跟河牌时最大的牌  4选3  5选3
    getMaxPai(array1, array2){
        if(array2.length == 4){
            let max1 = array1.concat(array2[1],array2[2],array2[3])
            let max2 = array1.concat(array2[0],array2[2],array2[3])
            let max3 = array1.concat(array2[0],array2[1],array2[3])
            let max4 = array1.concat(array2[0],array2[1],array2[2])
            let _array = [max1, max2, max3, max4]
            let _max = this.getMaxPaiZuHe(_array)
            return _max;
        }else if(array2.length == 5){
            let max1 = array1.concat(array2[2],array2[3],array2[4])
            let max2 = array1.concat(array2[1],array2[3],array2[4])
            let max3 = array1.concat(array2[1],array2[2],array2[4])
            let max4 = array1.concat(array2[1],array2[2],array2[3])

            let max5 = array1.concat(array2[0],array2[3],array2[4])
            let max6 = array1.concat(array2[0],array2[2],array2[4])
            let max7 = array1.concat(array2[0],array2[2],array2[3])

            let max8 = array1.concat(array2[0],array2[1],array2[4])
            let max9 = array1.concat(array2[0],array2[1],array2[3])

            let max10 = array1.concat(array2[0],array2[1],array2[2])

            let _array = [max1, max2, max3, max4, max5, max6, max7, max8, max9, max10]
            let _max = this.getMaxPaiZuHe(_array)
            return _max;
        }
    }

    //零牌中最大的 数字
    getMaxLingpai(array){
        let max = 0;
        for(let i=0; i<array.length; i++){
            if(array[i].value > max){
                max = array[i]
            }
        }
        return max.value;
    }
    //是否组成 零牌  2,8 ,3,5,6
    isLingpai(array){
        let new_array = array
        let isShunzi = this.isShunzi(array)
        let isTonghua = this.isTonghua(array)
        if(isShunzi || isTonghua) return false;
        let isLingpai = true;
        for(let i=0; i<new_array.length-1; i++){
            if(new_array[i].value == new_array[i+1].value){
                isLingpai = false;
            }
        }
        return isLingpai;
    }

    /*
        type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
        mostMoney  阀值   比如 3000，就弃牌
      */
    getBetMoneyByTtype(type, mostMoney, otherBetMoney, restMoney){
        if(type == 1){
            if(otherBetMoney >= mostMoney){
                return 0
            }
            //别人一开始就下了很大的注，  比如 8000，那可能是大对子，也可能是吓人的，
            if(otherBetMoney >= 3000 ){
                //标记此人 异常一次，(吓人 type= 1)
                var userName = this.getUserName();
                record.recordScary(userName);
                return 0
            }
            if(otherBetMoney >= restMoney){  // 不够钱了
                return 'allin'
            }
            if( (restMoney + 100) <= otherBetMoney ){ // 剩 很少的钱了，
                return 'allin'
            }
            if( (otherBetMoney + 500) > restMoney ){ // 加500，
                return (otherBetMoney + 500);
            }else{
                return (otherBetMoney + 100);
            }
        }
    }

    /* 下注
        type : 1看了底牌，  2 看了翻牌  三个，  3 看了转牌 一个，  4看了河牌 一个
        策略 celue : 1,正常(谨慎)玩法，  2激进玩法， 3 保守玩法  （正常玩法 对 正常玩法有效，  激进玩法对保守无法有效，  保守对激进玩法有效）
        外面下注多少 otherBetMoney    1000,
        自己还有多少 restMoney          9800,
     */
    howMuchBet(type, celue, otherBetMoney, restMoney){
        //看了底牌
        if(type ==1 ){ //看了底牌  二个
            let diPai = this.diPai
            //分析底牌大小

            //是否是对子  //情况很少
            if(this.isDuizi(diPai)){
                //对子大小 ,
                if(this.duiziValue>10){
                    if(otherBetMoney <= (restMoney/2) ){ //外面下注小于自己的一半
                        return parseInt( restMoney/2 )
                    }else{
                        return 'allin'
                    }
                }else{ // 小对子
                    // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                    // mostMoney  阀值   比如 3000，就弃牌
                    return this.getBetMoneyByTtype(1, 5000, otherBetMoney, restMoney)
                }
            }
            else if(this.isLiangTonghuaShunzi(diPai)){  // 两个顺子加同花  概率也很小 ,就看翻牌的了
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                this.getBetMoneyByTtype(1, 3000, otherBetMoney, restMoney)
            }
            else if(this.isLiangShunzi(diPai)){  // 两个顺子  概率也很小 ,就看翻牌的了
                // type = 1  谨慎
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 1000，就弃牌
                return this.getBetMoneyByTtype(1, 2000, otherBetMoney, restMoney)
            }
            else if(this.isLiangTonghua(diPai)){  // 两个同花  概率也很小 ,就看翻牌的了
                // type = 1  谨慎
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 1000，就弃牌
                return this.getBetMoneyByTtype(1, 1000, otherBetMoney, restMoney)
            }else{
                return 0;
            }
        }else if(type == 2){ //看了翻牌 三个
            let fanPai = this.fanPai;
            let diPai = this.diPai;
            let wuPai = fanPai.concat(diPai)
            wuPai = wuPai.sort(this.paiSort)

            if(this.isTonghuashun(wuPai)){ //5牌 是同花顺
                return 'allin'
            }else if(this.isSitiao(wuPai)){ //5牌 是4带1
                return 'allin'
            }else if(this.isSantiaoYidui(wuPai)){ //5牌 是3带2
                return 'allin'
            }else if(this.isTonghua(wuPai)){ //5牌 是同花
                return 'allin'
            }else if(this.isShunzi(wuPai)){ //5牌 是顺子
                return 'allin'
            }else if(this.isSantiao(wuPai)){ //5牌 是3条
                return 'allin'
            }else if(this.isLiangdui(wuPai)){ //5牌 是2对
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                return this.getBetMoneyByTtype(1, 4000, otherBetMoney, restMoney)
            }else if(this.isDuizi(wuPai)){ //5牌 是1对
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                return this.getBetMoneyByTtype(1, 2000, otherBetMoney, restMoney)
            }else{ //5牌 是
                return 0
            }
        }else if(type == 3){ //看了转牌 一个
            let zhuanPai = this.zhuanPai;
            let fanPai = this.fanPai;
            let diPai = this.diPai;
            let siPai = fanPai.concat(zhuanPai)
            let wuPai = this.getMaxPai(diPai,siPai)

            if(this.isTonghuashun(wuPai)){ //5牌 是同花顺
                return 'allin'
            }else if(this.isSitiao(wuPai)){ //5牌 是4带1
                return 'allin'
            }else if(this.isSantiaoYidui(wuPai)){ //5牌 是3带2
                return 'allin'
            }else if(this.isTonghua(wuPai)){ //5牌 是同花
                return 'allin'
            }else if(this.isShunzi(wuPai)){ //5牌 是顺子
                return 'allin'
            }else if(this.isSantiao(wuPai)){ //5牌 是3条
                return 'allin'
            }else if(this.isLiangdui(wuPai)){ //5牌 是2对
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                return this.getBetMoneyByTtype(1, 3000, otherBetMoney, restMoney)
            }else if(this.isSantiao(wuPai)){ //5牌 是1对
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                return this.getBetMoneyByTtype(1, 2000, otherBetMoney, restMoney)
            }else{ //5牌 是零牌
                return 0
            }

        }else if(type == 4){ //看了河牌 一个
            let fanPai = this.fanPai;
            let diPai = this.diPai;
            let zhuanPai = this.zhuanPai;
            let hePai = this.hePai;

            let wuPai = fanPai.concat(zhuanPai, hePai)
            wuPai = this.getMaxPai(diPai, wuPai)

            //转化出牌

            let subtractDipai = this.aiArraytureToStard(this.diPai)
            this.chuPai = this.subtractArray( this.aiArraytureToStard(wuPai), subtractDipai)

            if(this.isTonghuashun(wuPai)){ //5牌 是同花顺
                return 'allin'
            }else if(this.isSitiao(wuPai)){ //5牌 是4带1
                return 'allin'
            }else if(this.isSantiaoYidui(wuPai)){ //5牌 是3带2
                return 'allin'
            }else if(this.isTonghua(wuPai)){ //5牌 是同花
                return 'allin'
            }else if(this.isShunzi(wuPai)){ //5牌 是顺子
                return 'allin'
            }else if(this.isSantiao(wuPai)){ //5牌 是3条
                return 'allin'
            }else if(this.isLiangdui(wuPai)){ //5牌 是2对
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                return this.getBetMoneyByTtype(1, 2000, otherBetMoney, restMoney)
            }else if(this.isSantiao(wuPai)){ //5牌 是1对
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                return this.getBetMoneyByTtype(1, 1000, otherBetMoney, restMoney)
            }else{ //5牌 是3条
                return 0
            }
        }
    }


    //对方可能拿到最大的牌

}

