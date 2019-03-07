<!-- 报告单详情 -->
<template>
  <div class="inspection-detail">
    <Header post-title="西南医院:普通检查报告单"></Header>
    <div class="inspection-info">
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
      </ul>
    </div>
    <table class="inspection-table">
      <thead>
        <th>项目</th>
        <th>结果值</th>
        <th>单位</th>
        <th>参考值</th>
      </thead>
      <tr>
        <td>白细胞计数</td>
        <td class="result">4.3<img src="../images/down.png" alt="">
        </td>
        <td>10…9/L</td>
        <td>4-12</td>
      </tr>
      <tr>
        <td>白细胞计数</td>
        <td class="result">4.3<img src="../images/up.png" alt=""></td>
        <td>10…9/L</td>
        <td>4-12</td>
      </tr>
           <tr>
        <td>白细胞计数</td>
        <td class="result">4.3</td>
        <td>10…9/L</td>
        <td>4-12</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@color: #4daed7;
@border: 1px solid #f1f3f1;
.inspection-detail {
  padding-top: 1rem;
  .inspection-info {
    padding: 20px 40px;
    border-bottom: @border;
    li {
      display: flex;
      line-height: 56px;
      span {
        flex: 1;
        label {
          color: @color;
        }
      }
    }
  }
  .inspection-table {
    width: 100%;
    box-sizing: border-box;
    border-collapse: collapse;
    border-bottom: @border;
    
    thead {
      color:@color;
      th {
        padding: 14px 0;
        border-bottom: @border;
      }
    }
    th,
    td {
      display: inline-block;
      width: 22%;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding:6px 16px;
      &:nth-child(1) {
        width:34%;
      }

    }
    .result {
      text-align: left;
      img {
        width:40px;
        vertical-align: bottom;
      }
    }
    tr:nth-of-type(2n){
      background: @color;
      color:#fff;
    }
  }
}
</style>
