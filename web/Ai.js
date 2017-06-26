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
        this.allInCount = 0;
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
        array = array.sort(this.paiSort)
        this.diPai = this.stardTrueToAiArray(array)
    }
    //初始化数据 ( 翻牌数据 )
    initFanPai(array){
        array = array.sort(this.paiSort)
        this.fanPai = this.stardTrueToAiArray(array)
    }
    //初始化数据 ( 转牌数据 )
    initZhuanPai(array){
        array = array.sort(this.paiSort)
        this.zhuanPai = this.stardTrueToAiArray(array)
    }
    //初始化数据 ( 河牌数据 )
    initHePai(array){
        array = array.sort(this.paiSort)
        this.hePai = this.stardTrueToAiArray(array)
    }
    //初始化出牌 (出牌数据 )
    initChuPai(){
        let fanPai = this.fanPai;
        let diPai = this.diPai;
        let zhuanPai = this.zhuanPai;
        let hePai = this.hePai;

        let wuPai = fanPai.concat(zhuanPai, hePai)
        wuPai = this.getMaxPai(diPai, wuPai)

        //转化出牌

        let subtractDipai = this.aiArraytureToStard(this.diPai)
        this.chuPai = this.subtractArray( this.aiArraytureToStard(wuPai), subtractDipai)

        // if(this.chuPai.length>3){
        //     this.chuPai = this.subtractArray( this.aiArraytureToStard(this.chuPai), subtractDipai)
        // }

    }
    getDiPai(){
        return [15, 20]
    }
    getFanPai(){
        return [2, 9, 27]
    }
    getZhuanPai(){
        return [30]
    }
    getHePai(){
        return [38]
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
        let isSantiao = this.isSantiao(array)
        if(!isSantiao){
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

    //cha yi ge
    isShuiziOrTonghua(array){
        array = array.sort(this.paiSort)
        let isTonghuaChayi = false;
        let isShunziChayi = false;
        let huase_count1 =0;
        let huase_count2 =0
        let huase_count3 =0;
        let huase_count4 =0;
        for(let i=0; i<array.length; i++){
            if(array[i].huase == 1){
                huase_count1++
            }else if(array[i].huase == 2){
                huase_count2++
            }else if(array[i].huase == 3){
                huase_count3++
            }else if(array[i].huase == 4){
                huase_count4++
            }
        }
        if(huase_count1==4 || huase_count2==4 || huase_count3==4 || huase_count4==4 ){
            isTonghuaChayi = true;
        }

        let _array1 = [array[1], array[2], array[3], array[4]]
        let _array2 = [array[0], array[2], array[3], array[4]]
        let _array3 = [array[0], array[1], array[3], array[4]]
        let _array4 = [array[0], array[1], array[2], array[4]]
        let _array = [_array1, _array2, _array3, _array4]
        for(let j=0; j<_array.length; j++){
            if(_array[j][0].value + 4  >= _array[j][3].value){
                isShunziChayi = true;
            }
        }
        if(isShunziChayi || isTonghuaChayi){
            return true;
        }else{
            return false;
        }
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
        if( (array[0].value + 4) < array[1].value){
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

    // 是自己的一对 >= 10
    isDaDui(array1, array2){
        array1 = array1.sort(this.paiSort)
        array2 = array2.sort(this.paiSort)
        let duizi_index = 0;
        for(let i=0; i<array1.length; i++){
            for(let j=0; j<array2.length; j++){
                if(array1[i].value == array2[j].value){
                    duizi_index = i;
                }
            }
        }
        if((array1[duizi_index].value > 10) || (array1[duizi_index].value == 1)){
            return true;
        }else{
            return false;
        }

    }

    //是否是两顺子   5  9
    isLiangShunzi(array){
        array = array.sort(this.paiSort)
        let isLiangShunzi = true;
        if(array.length<2) return false;
        // 两顺子  5, 9  是顺子    5，6，6，8，9
        if( (array[0].value + 4) < array[1].value){
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
        array = array.sort(this.paiSort)
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
        array = array.sort(this.paiSort)
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
        //array1 = array1.sort(this.paiSort)
        //array2 = array2.sort(this.paiSort)
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
        array = array.sort(this.paiSort)
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
        array = array.sort(this.paiSort)
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

    //底牌是零牌, 是否 > 10
    isDiPaiDaUu10LingPai(array){
        array = array.sort(this.paiSort)
        if(array[array.length-1].value > 10 || (array[array.length-1].value == 1)) {
            return true;
        }else{
            return false;
        }
    }

    /*
        type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
        mostMoney  阀值   比如 3000，就弃牌
      */
    getBetMoneyByTtype(type, mostMoney, otherBetMoney, restMoney){
        if(type == 1){ //最保守 加 100
            //超过设定值
            if(otherBetMoney >= mostMoney){
                return 0
            }
            if( (otherBetMoney+100) >= restMoney ){  // 不够钱了
                return 'allin'
            }else{
                return (otherBetMoney + 100);
            }
        }else if(type == 2){ //有点激进
            //超过设定值
            if(otherBetMoney >= mostMoney){
                return 0
            }
            if( (otherBetMoney+100) >= restMoney ){  // 不够钱了
                return 'allin'
            }
            if((otherBetMoney + 900) < restMoney){  //剩余的钱够加900
                return (otherBetMoney + 900);
            }else{
                return (otherBetMoney + 100);
            }
        }else if(type == 3){ // 很激进
            //超过设定值
            if(otherBetMoney >= mostMoney){
                return 0
            }
            if( (otherBetMoney+100) >= restMoney ){  // 不够钱了
                return 'allin'
            }
            if( (otherBetMoney + 1900) < restMoney ){ //剩余的钱够加1900
                return (otherBetMoney + 1900);
            }else{
                return (otherBetMoney + 100);
            }
        }else if(type == 4){ // 最激进
            //超过设定值
            if(otherBetMoney >= mostMoney){
                return 0
            }
            if( (otherBetMoney+100) >= restMoney ){  // 不够钱了
                return 'allin'
            }
            if( (otherBetMoney + 2900) < restMoney ){ //剩余的钱够加1900
                return (otherBetMoney + 2900);
            }else{
                return (otherBetMoney + 100);
            }
        }else if(type == 5){ // 最最激进
            //超过设定值
            if(otherBetMoney >= mostMoney){
                return 0
            }
            if( (otherBetMoney+100) >= restMoney ){  // 不够钱了
                return 'allin'
            }
            if( (otherBetMoney + 5900) < restMoney ){ //剩余的钱够加1900
                return (otherBetMoney + 5900);
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
        if(this.diPai && this.diPai.length>0){
            type = 1;
        }
        if(this.fanPai && this.fanPai.length>0){
            type =2;
        }
        if(this.zhuanPai && this.zhuanPai.length>0){
            type = 3;
        }
        if(this.hePai && this.hePai.length>0){
            type =4
        }
        console.log('type type')
        console.log(type)
        if(type ==1 ){ //看了底牌  二个
            let diPai = this.diPai
            //分析底牌大小

            //是否是对子  //情况很少
            if(this.isDuizi(diPai)){
                //对子大小 ,
                if(this.duiziValue(diPai)>10 || this.duiziValue(diPai) == 1 ){
                    if(otherBetMoney <= (restMoney/2) ){ //外面下注小于自己的一半
                        //return parseInt( restMoney/2 )
                        return this.getBetMoneyByTtype(2, 800000, otherBetMoney, restMoney)
                    }else{
                        return this.getBetMoneyByTtype(2, 800000, otherBetMoney, restMoney)
                        //return 'allin'
                    }
                }else{ // 小对子
                    // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                    // mostMoney  阀值   比如 3000，就弃牌
                    return this.getBetMoneyByTtype(2, 5100, otherBetMoney, restMoney)
                }
            }
            else if(this.isLiangTonghuaShunzi(diPai)){  // 两个顺子加同花  概率也很小 ,就看翻牌的了
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                //return 'allin'
                //零牌 > 10
                if(this.isDiPaiDaUu10LingPai(diPai)){
                    return this.getBetMoneyByTtype(1, 1000, otherBetMoney, restMoney)
                }else{
                    return this.getBetMoneyByTtype(1, 500, otherBetMoney, restMoney)
                }

            }
            else if(this.isLiangShunzi(diPai)){  // 两个顺子  概率也很小 ,就看翻牌的了
                // type = 1  谨慎
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 1000，就弃牌
                //return 'allin'
                //零牌 > 10
                if(this.isDiPaiDaUu10LingPai(diPai)){
                    return this.getBetMoneyByTtype(1, 900, otherBetMoney, restMoney)
                }else{
                    return this.getBetMoneyByTtype(1, 300, otherBetMoney, restMoney)
                }
            }
            else if(this.isLiangTonghua(diPai)){  // 两个同花  概率也很小 ,就看翻牌的了
                // type = 1  谨慎
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 1000，就弃牌
                //return 'allin'
                //零牌 > 10
                if(this.isDiPaiDaUu10LingPai(diPai)){
                    return this.getBetMoneyByTtype(1, 700, otherBetMoney, restMoney)
                }else{
                    return this.getBetMoneyByTtype(1, 200, otherBetMoney, restMoney)
                }
            }else{
                // this.allInCount
                //return 'allin'
                //零牌 > 10
                if(this.isDiPaiDaUu10LingPai(diPai)){    //12  4
                    return this.getBetMoneyByTtype(1, 200, otherBetMoney, restMoney)
                }else{// 3 8
                    return 0;
                }
            }
        }else if(type == 2){ //看了翻牌 三个
            let fanPai = this.fanPai;
            let diPai = this.diPai;
            let wuPai = fanPai.concat(diPai)
            wuPai = wuPai.sort(this.paiSort)

            if(this.isTonghuashun(wuPai)){ //5牌 是同花顺
                //return 'allin'
                return this.getBetMoneyByTtype(3, 300000, otherBetMoney, restMoney)
            }else if(this.isSitiao(wuPai)){ //5牌 是4带1
                //return 'allin'
                return this.getBetMoneyByTtype(3, 200000, otherBetMoney, restMoney)
            }else if(this.isSantiaoYidui(wuPai)){ //5牌 是3带2
                //return 'allin'
                return this.getBetMoneyByTtype(3, 200000, otherBetMoney, restMoney)
            }else if(this.isTonghua(wuPai)){ //5牌 是同花
                //return 'allin'
                return this.getBetMoneyByTtype(3, 200000, otherBetMoney, restMoney)
            }else if(this.isShunzi(wuPai)){ //5牌 是顺子
                //return 'allin'
                return this.getBetMoneyByTtype(3, 200000, otherBetMoney, restMoney)
            }else if(this.isSantiao(wuPai)){ //5牌 是3条
                return this.getBetMoneyByTtype(3, 200000, otherBetMoney, restMoney)
                //return 'allin'
            }else if(this.isLiangdui(wuPai)){ //5牌 是2对
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                var _fanPai = fanPai.sort(this.paiSort);
                var _diPai = diPai.sort(this.paiSort);
                if(this.isDuizi(_fanPai)){ // only yi dui
                    if(this.isDaDui(_diPai, _fanPai)){  // 大对子
                        return this.getBetMoneyByTtype(2, 5100, otherBetMoney, restMoney)
                    }else{
                        return this.getBetMoneyByTtype(1, 1000, otherBetMoney, restMoney)
                    }
                }else{ //我们2对
                    return this.getBetMoneyByTtype(3, 200000, otherBetMoney, restMoney)
                }

            }else if(this.isDuizi(wuPai)){ //5牌 是1对
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                //return this.getBetMoneyByTtype(1, 1000, otherBetMoney, restMoney)
                var _fanPai = fanPai.sort(this.paiSort);
                var _diPai = diPai.sort(this.paiSort);
                if(this.isDaDui(_diPai, _fanPai)){ // 底牌加 翻牌 组成 大对子
                    return this.getBetMoneyByTtype(2, 5100, otherBetMoney, restMoney)
                }else{
                    return this.getBetMoneyByTtype(1, 1000, otherBetMoney, restMoney)
                }

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
                //return 'allin'
                return this.getBetMoneyByTtype(4, 800000, otherBetMoney, restMoney)
            }else if(this.isSitiao(wuPai)){ //5牌 是4带1
                //return 'allin'
                return this.getBetMoneyByTtype(4, 800000, otherBetMoney, restMoney)
            }else if(this.isSantiaoYidui(wuPai)){ //5牌 是3带2
                //return 'allin'
                return this.getBetMoneyByTtype(4, 800000, otherBetMoney, restMoney)
            }else if(this.isTonghua(wuPai)){ //5牌 是同花
                //return 'allin'
                return this.getBetMoneyByTtype(4, 800000, otherBetMoney, restMoney)
            }else if(this.isShunzi(wuPai)){ //5牌 是顺子
                //return 'allin'
                return this.getBetMoneyByTtype(4, 800000, otherBetMoney, restMoney)
            }else if(this.isSantiao(wuPai)){ //5牌 是3条
                //return 'allin'
                return this.getBetMoneyByTtype(4, 30000, otherBetMoney, restMoney)
            }else if(this.isLiangdui(wuPai)){ //5牌 是2对
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                var _fanPai = fanPai.sort(this.paiSort);
                var _diPai = diPai.sort(this.paiSort);
                let siPai = fanPai.concat(zhuanPai)
                    siPai = siPai.sort(this.paiSort);

                if(this.isDuizi(siPai)){ // only yi dui
                    if(this.isDaDui(_diPai, _fanPai)){  // 大对子
                        return this.getBetMoneyByTtype(1, 6000, otherBetMoney, restMoney)
                    }else{
                        return this.getBetMoneyByTtype(1, 2100, otherBetMoney, restMoney)
                    }
                }else{
                    return this.getBetMoneyByTtype(1, 20000, otherBetMoney, restMoney)
                }
            }else if(this.isDuizi(wuPai)){ //5牌 是1对
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                if(this.isDaDui(diPai, siPai)){
                    return this.getBetMoneyByTtype(2, 5100, otherBetMoney, restMoney)
                }else{
                    return this.getBetMoneyByTtype(1, 2100, otherBetMoney, restMoney)
                }
            }else if(this.isShuiziOrTonghua(wuPai)){ //5牌 差一个 shuizi or tonghua
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                return this.getBetMoneyByTtype(1, 1200, otherBetMoney, restMoney)
            }else{ //5牌 是零牌
                return 0
            }
            //
        }else if(type == 4){ //看了河牌 一个
            let fanPai = this.fanPai;
            let diPai = this.diPai;
            let zhuanPai = this.zhuanPai;
            let hePai = this.hePai;

            let wuPai = fanPai.concat(zhuanPai, hePai)
            let wuPai_waimian = fanPai.concat(zhuanPai, hePai)
            wuPai = this.getMaxPai(diPai, wuPai_waimian)

            //转化出牌

            let subtractDipai = this.aiArraytureToStard(this.diPai)
            this.chuPai = this.subtractArray( this.aiArraytureToStard(wuPai), subtractDipai)

            if(this.isTonghuashun(wuPai)){ //5牌 是同花顺
                //return 'allin'
                return this.getBetMoneyByTtype(5, 800000, otherBetMoney, restMoney)
            }else if(this.isSitiao(wuPai)){ //5牌 是4带1
                //return 'allin'
                return this.getBetMoneyByTtype(5, 800000, otherBetMoney, restMoney)
            }else if(this.isSantiaoYidui(wuPai)){ //5牌 是3带2
                //return 'allin'
                return this.getBetMoneyByTtype(5, 800000, otherBetMoney, restMoney)
            }else if(this.isTonghua(wuPai)){ //5牌 是同花
                //return 'allin'
                return this.getBetMoneyByTtype(5, 800000, otherBetMoney, restMoney)
            }else if(this.isShunzi(wuPai)){ //5牌 是顺子
                //return 'allin'
                return this.getBetMoneyByTtype(5, 800000, otherBetMoney, restMoney)
            }else if(this.isSantiao(wuPai)){ //5牌 是3条
                //return 'allin'
                return this.getBetMoneyByTtype(2, 40000, otherBetMoney, restMoney)
            }else if(this.isLiangdui(wuPai)){ //5牌 是2对
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                //return this.getBetMoneyByTtype(1, 2000, otherBetMoney, restMoney)

                var _diPai = diPai.sort(this.paiSort);
                var _fanPai = fanPai.sort(this.paiSort);
                var _zhuanPai = zhuanPai.sort(this.paiSort);
                var _hePai = hePai.sort(this.paiSort);

                var _wuPai_other = _fanPai.concat(_zhuanPai, _hePai)
                var _wuPai = _wuPai_other.sort(this.paiSort)
                _wuPai = this.getMaxPai(diPai, _wuPai)
                console.log('999999999999999999999')
                console.log(_wuPai)
                //let siPai = fanPai.concat(zhuanPai)
                //siPai = siPai.sort(this.paiSort);

                if(this.isDuizi(wuPai_waimian)){ // 外面有一对
                    if(this.isDaDui(_diPai, _wuPai)){
                        return this.getBetMoneyByTtype(1, 5500, otherBetMoney, restMoney)
                    }else{
                        return this.getBetMoneyByTtype(1, 2200, otherBetMoney, restMoney)
                    }
                }else{
                    return this.getBetMoneyByTtype(2, 10000, otherBetMoney, restMoney)
                }

            }else if(this.isDuizi(wuPai)){ //5牌 是1对
                // type = 1 正常(谨慎)玩法, 2激进玩法， 3 保守玩法
                // mostMoney  阀值   比如 2000，就弃牌
                //return this.getBetMoneyByTtype(1, 1000, otherBetMoney, restMoney)
                var _diPai = diPai.sort(this.paiSort);
                var _fanPai = fanPai.sort(this.paiSort);
                var _zhuanPai = zhuanPai.sort(this.paiSort);
                var _hePai = hePai.sort(this.paiSort);

                var _wuPai_other = _fanPai.concat(_zhuanPai, _hePai)
                var _wuPai = _wuPai_other.sort(this.paiSort)
                _wuPai = this.getMaxPai(diPai, _wuPai)
                console.log('一对')
                console.log(_wuPai)
                //let siPai = fanPai.concat(zhuanPai)
                //siPai = siPai.sort(this.paiSort);

                if(this.isDaDui(_diPai, _wuPai)){ //自己有一大对子, 外面没有对子
                    return this.getBetMoneyByTtype(1, 5600, otherBetMoney, restMoney)
                }else{ // 外面没有对子
                    return this.getBetMoneyByTtype(1, 2100, otherBetMoney, restMoney)
                }

            }else{ //5牌 是3条
                return 0
            }
        }
    }


    //对方可能拿到最大的牌

}

