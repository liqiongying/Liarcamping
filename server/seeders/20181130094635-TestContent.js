'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Contents', [
          {
              user_id: 1,
              title: '在昆明火车站旁边的中国移动营业厅充值话费被骗',
              cheater_name:'刘一江',
              cheater_contact:'vx:liujiang',
              summary:'那天已经是晚上6点多了，终于还以为到了一下车才发现是到了毕节',
              description:'大家好我是一名大学生，在2016年暑假回家时坐火车到贵阳，那天已经是晚上6点多了，本来想去金阳客运站买回家的票的 ，但是当天的发车时间已经错过来了，所以不得不住下来，当从火车站出来时就有很多人围过来说到哪里，我们卖票，直接送到你要到的地方，推辞了几位后又有几位来说到哪里哪里吗？本来到镇雄的车费只要140的然后他们收160还要交20的高速费，总共180，接着就是等等等，等到了9点左右时开始带我们去上车了，一个只做13人的那种车硬是塞了30多人进去，车里很闷很，司机还在前面抽烟，整个车很多人晕车，整个车充满了各种味道，大家互相挤在一起动都动不了，孩子哭泣声混成一片' +
              '终于还以为到了一下车才发现是到了毕节，他们找一帮人来叫我我们下车，找人就把我们带走了，大概是晚上1点了，人后那些人就叫我们去住宾馆他们指定的宾馆每人需要交40元，第二天早上才同意找车送我们到镇雄，这时很多被骗的人不乐意了就开始找他们里理论，他们说你们尽管报警，警察来了也帮他们，' +
              '毕节的警察都是黑恶势力的，警察不会帮我们被骗的百姓，就这样地三波骗子又出现了，他们假装当好人，然后说叫我们给50送到镇雄，最后上车后又没把我们送到说的地方，半路把我们轰下车来，没办法我们只有自己打车回到镇雄，到家时已经是第二天早上了。\n' +
              '所以希望大大家不要再坐那些人的车了，你照顾他们做生意他们把你不当人来对待。希望大家不要再次被骗。欢迎大家扩散消息让骗子无处可藏。这是个人的亲身经历希望能帮到各位避开再次被骗.',
              loss_money:'100',
              proof_src:'123.png'
          },{
              user_id: 2,
              title: '骗财骗色',
              cheater_name:'伍子逊',
              cheater_contact:'Vincentwu881104',
              summary:'骗财骗色。2015.9月在微信附近人加的。原本想着就这样算了，感情上付出了，算我自己倒霉，不想去恨去追究，但关于金钱上后来想想还是爆光出来，以免更多的女孩受骗。以各种借口借钱，又以各种理由',
              description:'因为都是微信、支付宝转帐，所以没有银行卡。当时转的支付宝号不是他本人的，是另一个女人的名字，这个女人是不是他的老婆我也到现在也没搞清楚，' +
              '这个女人的身份证信息我也有。如有需要，我再发给您。前几天无意中在一个公众号看到他，我不甘心，为什么一个骗子还能当教练还能逍遥快活？难道这个社会就是一个包庇骗子的天下吗？' +
              '之前一气之下删了手机号，后来才想起来有用。',
              loss_money:'1000',
              proof_src:'2.png'
          },{
              user_id: 2,
              title: '我...骗了！',
              cheater_name:'李子',
              cheater_contact:'1329567260',
              summary:'这人我买他的崩2账号,骗了我1400 ',
              description:'这人我买他的崩2账号,骗了我1400,让我先钱不肯走平台.然后我搜了下百度没记录就先钱了  然后还给我拉黑 反过来说我骗子 这里上传不了图片 大家百度他Q 看别的 帖子 有图',
              loss_money:'1400',
              proof_src:'12.png'
          },{
              user_id: 2,
              title: '我被35436骗了！',
              cheater_name:'李林',
              cheater_contact:'vx:liling',
              summary:'124345票',
              description:' 我于2018年9月22日在天津市河西区尖山路与天津华庭装饰工程有限公司签订装修合同，事情起因是买房后天津华庭装修公司通过非法手段获取到本人及本人家属联系方式，多次邀请去该公司看装修，并宣称免费\n' +
              '                  提供报价。前几次一直拒绝，但对方加我微信后多次邀请有各种承诺，本人抱着多了解的心态在2018年9月22号前往天津华庭装饰公司。没想到去了之后跳入了对方为我打造的陷阱。\n',
              loss_money:'1000',
              proof_src:'132.png'
          }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('Contents', null, {});

  }
};
