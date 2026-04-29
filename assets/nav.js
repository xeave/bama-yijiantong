const navRoot = document.querySelector("#nav-sections");

if (navRoot) {
  const navGroups = [
    {
      title: "杭州挂号与医院",
      description: "优先使用杭州市卫健委预约挂号指南或医院官网，部分入口会跳转浙里办或院内预约系统。",
      items: [
        {
          name: "杭州市卫健委预约挂号指南",
          url: "https://wsjkw.hangzhou.gov.cn/col/col1229005330/",
          desc: "查看杭州官方挂号方式说明，含浙里办预约和电话预约等渠道。",
          tag: "官方指南",
        },
        {
          name: "杭州市第一人民医院预约挂号",
          url: "https://www.hz-hospital.com/member/service/reserve",
          desc: "市一官网预约页面，含实名预约、退号规则和分时段就诊说明。",
          tag: "市属三甲",
        },
        {
          name: "浙大一院官网",
          url: "https://www.zy91.com/",
          desc: "官网含预约挂号、门诊信息、报告查询和医保信息。",
          tag: "三甲",
        },
        {
          name: "邵逸夫医院官网",
          url: "https://www.srrsh.com/",
          desc: "官网含预约挂号、专家排班、报告查询和医保医费服务。",
          tag: "三甲",
        },
        {
          name: "浙江省中医院官网",
          url: "https://www.zjhtcm1931.cn/",
          desc: "杭州本地三甲中医院官网，含预约挂号、门诊安排和医保服务。",
          tag: "三甲",
        },
      ],
    },
    {
      title: "杭州医保社保办事",
      description: "优先放杭州本地官方办事入口，方便查询医保、社保、市民卡和线上办理服务。",
      items: [
        {
          name: "杭州市医疗保障局",
          url: "https://www.hangzhou.gov.cn/col/col1620911/index.html",
          desc: "医保局政府门户页面，可查询政策与办事信息，业务咨询电话 12393。",
          tag: "官方",
        },
        {
          name: "杭州人社局",
          url: "http://hrss.hangzhou.gov.cn/",
          desc: "养老、失业、工伤、就业等人社办事与政策查询入口。",
          tag: "官方",
        },
        {
          name: "杭州市民卡官网",
          url: "https://www.96225.com/service/index.action?result=indexJsp",
          desc: "办理市民卡、社保卡和市民码相关服务，服务热线 96225。",
          tag: "官方",
        },
        {
          name: "浙江政务服务网",
          url: "https://www.zjzwfw.gov.cn/",
          desc: "浙江统一网上办事平台，许多杭州本地事项可在线办理。",
          tag: "官方",
        },
        {
          name: "国家社会保险公共服务平台",
          url: "https://si.12333.gov.cn/",
          desc: "养老保险转移、参保证明等全国统一社保服务入口。",
          tag: "官方",
        },
      ],
    },
    {
      title: "杭州政务与生活",
      description: "补齐杭州本地常用政务和出行入口，减少长辈反复搜索链接的次数。",
      items: [
        {
          name: "中国杭州",
          url: "https://www.hangzhou.gov.cn/",
          desc: "杭州市政府门户，查本地公告、办事入口和民生信息。",
          tag: "官方",
        },
        {
          name: "老年人办事服务专区",
          url: "https://gjzwfw.www.gov.cn/col/col1558/",
          desc: "集中查看退休、养老、津贴和健康相关办事入口。",
          tag: "便民",
        },
        {
          name: "杭州公交集团",
          url: "https://www.hzbus.com.cn/",
          desc: "查询杭州公交资讯、线路和公共出行相关信息。",
          tag: "出行",
        },
        {
          name: "中国铁路 12306",
          url: "https://www.12306.cn/",
          desc: "购买火车票、查询车次和办理退改签。",
          tag: "官方",
        },
        {
          name: "中国天气网",
          url: "https://www.weather.com.cn/",
          desc: "查询杭州和全国天气预报、灾害预警与生活指数。",
          tag: "天气",
        },
      ],
    },
  ];

  navRoot.innerHTML = navGroups
    .map(
      (group) => `
        <section class="link-group">
          <div class="link-group-head">
            <div>
              <h3 class="link-group-title">${group.title}</h3>
              <p class="section-note">${group.description}</p>
            </div>
          </div>
          <div class="link-list">
            ${group.items
              .map(
                (item) => `
                  <a class="link-card" href="${item.url}" target="_blank" rel="noopener noreferrer">
                    <div>
                      <p class="link-name">${item.name}</p>
                      <p class="link-desc">${item.desc}</p>
                    </div>
                    <span class="link-tag">${item.tag}</span>
                  </a>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}
