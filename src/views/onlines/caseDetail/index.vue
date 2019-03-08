<!-- 病历详情 -->
<template>
  <div class="case-detail">
    <Header post-title="西南医院:门诊病例"></Header>
    <div class="case-info">
      <ul>
        <li>
          <span><label>姓名 :&nbsp;&nbsp;</label>张丽</span>
          <span><label>性别 :&nbsp;&nbsp;</label>女</span>
          <span><label>年龄 :&nbsp;&nbsp;</label>30岁</span>
        </li>
        <li>
          <span><label>门诊号 :&nbsp;&nbsp;</label>18082000001</span>
          <span><label>科室 :&nbsp;&nbsp;</label>呼吸内科</span>
        </li>
        <li>
          <span><label>时间 :&nbsp;&nbsp;</label>2018-08-20 08:30</span>
        </li>
          <li>
          <span><label>主诉 :&nbsp;&nbsp;</label>病人于两周前咳嗽，吐痰</span>
        </li>
          <li>
          <span><label>现病史 :&nbsp;&nbsp;</label></span>
        </li>
          <li>
          <span><label>既往病史 :&nbsp;&nbsp;</label>无</span>
        </li>
        <li>
          <span><label>查体:&nbsp;&nbsp;</label>精神状态佳</span>
        </li>
          <li>
          <span><label>初步诊断:&nbsp;&nbsp;</label>上呼吸道感染</span>
        </li>
          <li>
          <span><label>处置:&nbsp;&nbsp;</label>血常规（全血），肝功能全套（静脉血），
      肾功能全套（静脉血），CT检查头颅（平扫+增
      强扫描）</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
$color: #4daed7;
$border: 1px solid #f1f3f1;
.case-detail {
  padding-top: 1rem;
  .case-info {
    padding: 20px 40px;
    li {
      display: flex;
      line-height: 56px;
      span {
        flex: 1;
        label {
          color: $color;
        }
      }
    }
  }
}
</style>
