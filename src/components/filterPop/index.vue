<template>
    <div class="filter-pop">
      <transition name="fade">
        <div class="md-popup-mask" @click="testshow=false" v-show="testshow"></div>
      </transition>
      <transition name="fade1">
        <div class="md-popup1"  v-show="testshow">
          <div class="md-popup-box md-slide-up" >
            <div class="md-action-sheet-content">
              <!--筛选框-->
              <div class="g-filter-ssr--content">
                <div class="md-popup-title-bar">
                  <div class="title-bar-left md-popup-cancel" @click="testshow=false">
                    <i class="md-icon icon-font md-icon-close close lg"></i>
                  </div>
                  <div class="title-bar-title">
                    <p class="title">筛选</p>
                  </div>
                </div>
                <section class="components-screenbox">
                  <ul>
                    <li class="components-screenbox--item">
                      <h3>
                        <label>服务类型</label>
                        <div>
                        </div>
                      </h3>
                      <div class="components-screenbox--other">
                        <div>
                          <span v-for="(item, index) in consultList" :key="index" @click="select(item, index)" :class="[{ 'chosen-condition': item.checked }, 'tag']">{{item.text}}</span>
                        </div>
                      </div>
                    </li>
                    <li class="components-screenbox--item">
                      <h3>
                        <label>医生职称</label>
                        <div>
                        </div>
                      </h3>
                      <div class="components-screenbox--other">
                        <div>
                          <span v-for="(item2,index2) in selectList" :key="index2" :class="[{ 'chosen-condition': item2.checked }, 'tag']" @click="select2(item2,index2)">{{item2.text}}</span>
                        </div>
                      </div>
                    </li>
                    <li class="components-screenbox--item">
                      <h3>
                        <label>价格区间</label>
                        <div>
                        </div>
                      </h3>
                      <div class="components-screenbox--other">
                        <div>
                          <span class="tag chosen-condition">25</span>
                          <span class="tag">20~50</span>
                          <span class="tag">20~50</span>
                          <span class="tag">50~100</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="components-screenbox--btn-group">
                    <a class="components-screenbox-reset" @click="reset">重置</a>
                    <a class="components-screenbox-confirm" @click="getSelect">确定</a>
                  </div>
                </section>
              </div>
              <!--  -->
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>
