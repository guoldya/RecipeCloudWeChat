<template>

  <div class="page-navbar">
    <!-- <Header post-title="会员成长"></Header> -->
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">成长值体系</mt-tab-item>
      <mt-tab-item id="2">康币体系</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="textcont">
          <h3 style="text-align:left;">
            1.什么是成长值？
          </h3>
          <p>
            成长值决定会员等级, 成长值越高会员等级越高, 享受到的会员权益越大。会员通过在本优品汇上完成登录、购物、评论、晒单等行为所获得相应的成长值。
          </p>
          <h3 style="margin-bottom:15px;text-align:left;">
            2.如何获得成长值
          </h3>
          <table class=table3_10>
            <tr>
              <th>来源</th>
              <th>成长值奖励</th>
              <th>详细说明</th>
            </tr>
            <tr>
              <td>实名认证</td>
              <td>+100</td>
              <td>只能领取一次</td>
            </tr>
            <tr>
              <td>绑定手机</td>
              <td>+100</td>
              <td>只能领取一次</td>
            </tr>
            <tr>
              <td>购物</td>
              <td>实际支付金额*100</td>
              <td>付款成功过后发放</td>
            </tr>
            <tr>
              <td>每日签到</td>
              <td>+1+2+3+4+5+6+7 连续7天外+20</td>
              <td>签到就发放</td>
            </tr>
            <tr>
              <td>每日发帖
              </td>
              <td>+5</td>
              <td>每日最多25成长值</td>
            </tr>
            <tr>
              <td>帖子被赞</td>
              <td>+1</td>
              <td>每日最多10成长值</td>
            </tr>
            <tr>
              <td>点赞帖子</td>
              <td>+1</td>
              <td>每日最多10成长值</td>
            </tr>
            <tr>
              <td>邀请好友</td>
              <td>+20</td>
              <td>邀请注册成功才可以</td>
            </tr>
          </table>
        </div>

      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="textcont">
          <h3>
            1.什么是成长值？
          </h3>
          <p>
            康币是全之道向有效会员返还的虚拟购物币，在全之道购物时可以按比例抵扣货款。优币可直接用于支付全之道订单，在消费时1康币可抵1元现金使用，用户可用康币支付每笔订单金额的50%。
          </p>
          <h3>
            2.如何获得康币
          </h3>
          <p style="font-size:13px;color:#999;margin-bottom:10px:display:block;text-indent:0">
            升级奖励：见下表
          </p>
          <div class=table4div>
            <table class=table4_10>
              <tr>
                <th>等级</th>
                <th>成长值</th>
                <th>奖励</th>
              </tr>
              <tr>
                <td>1</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>2</td>
                <td>320</td>
                <td>1</td>
              </tr>
              <tr>
                <td>3</td>
                <td>464</td>
                <td>1</td>
              </tr>
              <tr>
                <td>4</td>
                <td>616</td>
                <td>1</td>
              </tr>
              <tr>
                <td>5</td>
                <td>778</td>
                <td>2</td>
              </tr>
              <tr>
                <td>6</td>
                <td>952</td>
                <td>2</td>
              </tr>
              <tr>
                <td>7</td>
                <td>1142</td>
                <td>2</td>
              </tr>
              <tr>
                <td>8</td>
                <td>1348</td>
                <td>2</td>
              </tr>
              <tr>
                <td>9</td>
                <td>1576</td>
                <td>2</td>
              </tr>
              <tr>
                <td>10</td>
                <td>1829</td>
                <td>2</td>
              </tr>
              <tr>
                <td>11</td>
                <td>2113</td>
                <td>3</td>
              </tr>
              <tr>
                <td>12</td>
                <td>2432</td>
                <td>3</td>
              </tr>
              <tr>
                <td>13</td>
                <td>2795</td>
                <td>3</td>
              </tr>
              <tr>
                <td>14</td>
                <td>3210</td>
                <td>4</td>
              </tr>
              <tr>
                <td>15</td>
                <td>3686</td>
                <td>4</td>
              </tr>
              <tr>
                <td>16</td>
                <td>4237</td>
                <td>5</td>
              </tr>
              <tr>
                <td>17</td>
                <td>4877</td>
                <td>6</td>
              </tr>
              <tr>
                <td>18</td>
                <td>5623</td>
                <td>6</td>
              </tr>
              <tr>
                <td>19</td>
                <td>6497</td>
                <td>7</td>
              </tr>
              <tr>
                <td>20</td>
                <td>7523</td>
                <td>9</td>
              </tr>
              <tr>
                <td>21</td>
                <td>8732</td>
                <td>10</td>
              </tr>
              <tr>
                <td>22</td>
                <td>10160</td>
                <td>12</td>
              </tr>
              <tr>
                <td>23</td>
                <td>11849</td>
                <td>14</td>
              </tr>
              <tr>
                <td>24</td>
                <td>13852</td>
                <td>17</td>
              </tr>
              <tr>
                <td>25</td>
                <td>16230</td>
                <td>20</td>
              </tr>
              <tr>
                <td>26</td>
                <td>19058</td>
                <td>24</td>
              </tr>
              <tr>
                <td>27</td>
                <td>22423</td>
                <td>28</td>
              </tr>
              <tr>
                <td>28</td>
                <td>26433</td>
                <td>34</td>
              </tr>
              <tr>
                <td>29</td>
                <td>31213</td>
                <td>40</td>
              </tr>
              <tr>
                <td>30</td>
                <td>36917</td>
                <td>48</td>
              </tr>
              <tr>
                <td>31</td>
                <td>43725</td>
                <td>57</td>
              </tr>
              <tr>
                <td>32</td>
                <td>51857</td>
                <td>68</td>
              </tr>
              <tr>
                <td>33</td>
                <td>61573</td>
                <td>81</td>
              </tr>
              <tr>
                <td>34</td>
                <td>61573</td>
                <td>97</td>
              </tr>
              <tr>
                <td>35</td>
                <td>87068</td>
                <td>116</td>
              </tr>
              <tr>
                <td>36</td>
                <td>103668</td>
                <td>139</td>
              </tr>
              <tr>
                <td>37</td>
                <td>123523</td>
                <td>166</td>
              </tr>
              <tr>
                <td>38</td>
                <td>147274</td>
                <td>199</td>
              </tr>
              <tr>
                <td>39</td>
                <td>175690</td>
                <td>238</td>
              </tr>
              <tr>
                <td>40</td>
                <td>209689</td>
                <td>284</td>
              </tr>
              <tr>
                <td>41</td>
                <td>250375</td>
                <td>340</td>
              </tr>
              <tr>
                <td>42</td>
                <td>299064</td>
                <td>407</td>
              </tr>
              <tr>
                <td>43</td>
                <td>357336</td>
                <td>487</td>
              </tr>
              <tr>
                <td>44</td>
                <td>427080</td>
                <td>583</td>
              </tr>
              <tr>
                <td>45</td>
                <td>510560</td>
                <td>697</td>
              </tr>
              <tr>
                <td>46</td>
                <td>610484</td>
                <td>835</td>
              </tr>
              <tr>
                <td>47</td>
                <td>730094</td>
                <td>999</td>
              </tr>
              <tr>
                <td>48</td>
                <td>873274</td>
                <td>1196</td>
              </tr>
              <tr>
                <td>49</td>
                <td>1044672</td>
                <td>1432</td>
              </tr>
              <tr>
                <td>50</td>
                <td>1249853</td>
                <td>1714</td>
              </tr>
              <tr>
                <td>51</td>
                <td>1495479</td>
                <td>2052</td>
              </tr>
              <tr>
                <td>52</td>
                <td>1789527</td>
                <td>2456</td>
              </tr>
              <tr>
                <td>53</td>
                <td>2141547</td>
                <td>2940</td>
              </tr>
              <tr>
                <td>54</td>
                <td>2562972</td>
                <td>3520</td>
              </tr>
              <tr>
                <td>55</td>
                <td>3067490</td>
                <td>4214</td>
              </tr>
              <tr>
                <td>56</td>
                <td>3671487</td>
                <td>5045</td>
              </tr>
              <tr>
                <td>57</td>
                <td>4394583</td>
                <td>6040</td>
              </tr>
              <tr>
                <td>58</td>
                <td>5260267</td>
                <td>7213</td>
              </tr>
              <tr>
                <td>59</td>
                <td>6296658</td>
                <td>8657</td>
              </tr>
              <tr>
                <td>60</td>
                <td>7537425</td>
                <td>10364</td>
              </tr>
            </table>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: 'page-navbar',

  data() {
    return {
      selected: '1',

    };
  },
  mounted() {
    document.title = '会员成长体系';
  }
}
</script>

<style>
.textcont {
  margin: 15px 12px 10px;
}

.textcont p {
  margin-bottom: 10px;
  color: #777;
  line-height: 23px;
  /* text-indent: 2em; */
  font-size: 14px;
  letter-spacing: 0.5px;
}
.mint-tab-item-label {
  font-size: 14px;
}
.mint-navbar {
  padding-bottom: 10px;
}
.page-lazyload {
  margin-top: 0;
}
.mint-navbar {
  width: 76%;
  margin: 0 12%;
}
h3 {
  margin-bottom: 5px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #2c2c2c;
  font-size: 15px;
  line-height: 1.1;
}
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 3px solid #12b4ba;
  color: #12b4ba;
  margin-bottom: -3px;
}
.table3_10 table {
  text-align: center;
  margin: 0 auto;
}

.table3_10 tr {
}
.table3_10,
.table3_10 th,
.table3_10 td {
  font-size: 13px;
  text-align: center;
  padding: 10px 18px;
  border: 1px solid  var(--primary--line);
  border-collapse: collapse;
}
.table3_10 th,
.table3_10 td:first-child {
  padding: 10px;
}

/* /** */

.table4div {
  width: 100%;
  margin-top: 10px;
}

.table4_10 table {
  text-align: center;
  margin: 0 auto;
  width: 94%;
}

.table4_10 tr {
}

.table4_10,
.table4_10 th,
.table4_10 td {
  font-size: 13px;
  text-align: center;
  padding: 10px 28px;
  border: 1px solid  var(--primary--line);
  border-collapse: collapse;
}

.table4_10 th,
.table4_10 td:first-child {
  width: 30%;
  text-align: center;
  font-weight: 700;
}
</style>
